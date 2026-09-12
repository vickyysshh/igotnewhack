import os
import uuid
import asyncio
from copy import deepcopy
from pathlib import Path
from datetime import datetime, timezone
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter, Depends, Header, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from models import DemoState, LoginInput, ProfileInput, GenerateInput, SubmitInput, ChatInput, ModuleInput, APIRecord
from demo_data import initial_state, DEPARTMENTS
from services import iGOTService, NSSTAService, AIService, DocumentProcessingService, NotificationService, enrich_competencies, overview

load_dotenv(Path(__file__).parent / '.env')


class MemoryCollection:
    def __init__(self):
        self.records = {}

    async def create_index(self, *args, **kwargs):
        return None

    async def find_one(self, query, projection=None):
        record = self.records.get(query.get('id'))
        if record is None and 'session_id' in query:
            record = next((item for item in self.records.values() if item.get('session_id') == query['session_id'] and item.get('id') == query.get('id')), None)
        if record is None:
            return None
        result = deepcopy(record)
        if projection and projection.get('_id') == 0:
            result.pop('_id', None)
        return result

    async def update_one(self, query, update, upsert=False):
        record_id = query.get('id')
        current = self.records.get(record_id)
        if current is None and not upsert:
            return None
        if current is None:
            current = deepcopy(update.get('$setOnInsert', {}))
        current.update(deepcopy(update.get('$set', {})))
        if record_id:
            self.records[record_id] = current
        return None

    async def insert_one(self, record):
        self.records[record['id']] = deepcopy(record)
        return None


class MemoryDatabase:
    def __init__(self):
        self.demo_sessions = MemoryCollection()
        self.assessments = MemoryCollection()


mongo_client = None
if os.getenv('MONGO_URL'):
    mongo_client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = mongo_client[os.getenv('DB_NAME', 'sankhyashakti')]
else:
    db = MemoryDatabase()
locks = {}

@asynccontextmanager
async def lifespan(app):
    await db.demo_sessions.create_index('id', unique=True)
    await db.assessments.create_index('id', unique=True)
    yield
    if mongo_client:
        mongo_client.close()

app = FastAPI(title='iGOT Sankhyashakti — Demonstration API', lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(','), allow_credentials=False, allow_methods=['*'], allow_headers=['*'])
router = APIRouter(prefix='/api')

async def session(x_demo_session: str = Header(...)):
    try: uuid.UUID(x_demo_session)
    except ValueError: raise HTTPException(400, 'Invalid demo session')
    state = await db.demo_sessions.find_one({'id': x_demo_session}, {'_id': 0})
    if not state:
        state = initial_state(x_demo_session)
        await db.demo_sessions.update_one({'id': x_demo_session}, {'$setOnInsert': state}, upsert=True)
    return DemoState(**state).model_dump()

async def save(state):
    await db.demo_sessions.update_one({'id': state['id']}, {'$set': state})

async def admin(state=Depends(session)):
    if state['role'] not in ['admin', 'super-admin']: raise HTTPException(403, 'Switch to an administrator demo role to access workforce analytics.')
    return state

@router.get('/')
async def root(): return {'name':'iGOT Sankhyashakti', 'environment':'demonstration', 'integrations':'simulated'}

@router.get('/state')
async def state_endpoint(state=Depends(session)):
    # Session data is validated and MongoDB _id is excluded by the repository dependency.
    return {**state, 'competencies': enrich_competencies(state), 'overview': overview(state), 'recommendations': iGOTService().getRecommendations(state), 'courses': iGOTService().getCourses(state), 'training_programmes': NSSTAService().getRecommendedProgrammes(state), 'notifications': NotificationService().getNotifications(state)}

@router.post('/auth/demo')
async def login(payload: LoginInput, state=Depends(session)):
    state['role'] = payload.role
    await save(state)
    return {'role':payload.role, 'mode':'demo', 'message':'Demo role selected. This is not production authentication.'}

@router.get('/profile')
async def profile(state=Depends(session)): return state['profile']

@router.patch('/profile')
async def update_profile(payload:ProfileInput, state=Depends(session)):
    state['profile'].update(payload.model_dump())
    state['profile']['role'] = payload.designation
    state['profile']['summary'] = AIService().generateRoleSummary(state['profile'])
    await save(state)
    return state['profile']

@router.get('/competencies')
async def comps(state=Depends(session)): return enrich_competencies(state)

@router.get('/competency-gaps')
async def gaps(state=Depends(session)): return sorted(enrich_competencies(state), key=lambda c:c['gap'], reverse=True)

@router.get('/recommendations')
async def recommendations(state=Depends(session)): return iGOTService().getRecommendations(state)

@router.get('/courses')
async def courses(q:str='', state=Depends(session)): return iGOTService().searchCourses(state,q)

@router.get('/courses/{course_id}')
async def course(course_id:str, state=Depends(session)):
    result=iGOTService().getCourseDetails(state,course_id)
    if not result: raise HTTPException(404,'Course not found')
    return result

@router.post('/courses/{course_id}/enroll')
async def enroll(course_id:str, state=Depends(session)):
    if not iGOTService().getCourseDetails(state,course_id): raise HTTPException(404,'Course not found')
    if course_id not in state['learning']: state['learning'][course_id]={'completed':[], 'status':'In Progress'}
    await save(state)
    return state['learning'][course_id]

@router.post('/courses/{course_id}/complete-module')
async def complete_module(course_id:str,payload:ModuleInput,state=Depends(session)):
    if not iGOTService().getCourseDetails(state,course_id): raise HTTPException(404,'Course not found')
    learning=state['learning'].setdefault(course_id,{'completed':[], 'status':'In Progress'})
    if payload.module not in learning['completed']: learning['completed'].append(payload.module)
    learning['status']='Completed' if len(learning['completed'])==4 else 'In Progress'
    await save(state)
    return learning

@router.post('/programmes/{program_id}/register')
async def register(program_id:str,state=Depends(session)):
    if not NSSTAService().getProgrammeDetails(program_id): raise HTTPException(404,'Programme not found')
    if program_id not in state['programmes']: state['programmes'].append(program_id)
    await save(state)
    return {'registered':True, 'mode':'demo'}

@router.post('/assessment/generate')
@router.post('/quiz/generate')
async def generate(payload:GenerateInput,state=Depends(session)):
    valid_names={c['name'] for c in state['competencies']}
    if payload.competency not in valid_names: raise HTTPException(400,'Choose a competency from your profile.')
    if payload.document_id and not any(d['id']==payload.document_id for d in state['documents']): raise HTTPException(404,'Document not found in this session')
    questions=AIService().generateAssessmentQuestions(payload.competency,payload.count,payload.question_type)
    obj={'id':str(uuid.uuid4()),'session_id':state['id'], 'competency':payload.competency, 'count':payload.count,'question_type':payload.question_type,'questions':questions,'document_id':payload.document_id,'submitted':False,'created_at':datetime.now(timezone.utc).isoformat()}
    await db.assessments.insert_one(obj.copy())
    return {'id':obj['id'],'competency':obj['competency'],'count':obj['count'],'questions':[{k:v for k,v in q.items() if k not in ['correct','explanation']} for q in questions], 'mode':'simulated'}

@router.post('/assessment/submit')
async def submit(payload:SubmitInput,state=Depends(session)):
    async with locks.setdefault(state['id'],asyncio.Lock()):
        state = await db.demo_sessions.find_one({'id':state['id']},{'_id':0})
        assessment=await db.assessments.find_one({'id':payload.assessment_id,'session_id':state['id']},{'_id':0})
        if not assessment: raise HTTPException(404,'Assessment not found')
        previous=next((r for r in state['results'] if r['assessment_id']==payload.assessment_id),None)
        if previous: return previous
        qs=assessment['questions']
        if any(k not in {q['id'] for q in qs} for k in payload.answers): raise HTTPException(400,'Unknown question in answers')
        if any(q['id'] in payload.answers and not 0<=payload.answers[q['id']]<len(q['options']) for q in qs): raise HTTPException(400,'Invalid answer option')
        correct=sum(payload.answers.get(q['id'])==q['correct'] for q in qs)
        accuracy=round(correct/len(qs)*100)
        comp=next(c for c in state['competencies'] if c['name']==assessment['competency'])
        before=comp['current']
        after=min(100,before+max(0,round((accuracy-before)*0.52)))
        comp.update(current=after,confidence=95,last_assessed=datetime.now(timezone.utc).date().isoformat())
        result={'id':str(uuid.uuid4()),'assessment_id':payload.assessment_id,'competency':comp['name'],'score':correct,'total':len(qs),'accuracy':accuracy,'previous':before,'current':after,'improvement':after-before,'previous_gap':max(0,comp['required']-before),'new_gap':max(0,comp['required']-after),'date':datetime.now(timezone.utc).isoformat(),'breakdown':[{'name':comp['name'],'score':accuracy}],'review':[{**q,'selected':payload.answers.get(q['id'])} for q in qs]}
        state['results'].append(result)
        ov=overview(state)
        state['history'].append({'month':f"Assessment {len(state['results'])}", 'competency':ov['overall'],'hours':ov['hours'],'score':accuracy,'gap':max(0,31-round(sum(r['improvement'] for r in state['results'])/5)),'courses':ov['courses_completed']})
        await save(state)
        await db.assessments.update_one({'id':assessment['id']},{'$set':{'submitted':True}})
        return result

@router.get('/progress')
async def progress(state=Depends(session)): return {'history':state['history'],'results':state['results'],'overview':overview(state)}

@router.post('/documents/upload',response_model=APIRecord)
async def upload(file:UploadFile=File(...),state=Depends(session)):
    ext=Path(file.filename or '').suffix.lower()
    if ext not in ['.pdf','.doc','.docx','.ppt','.pptx','.txt']: raise HTTPException(400,'Supported formats: PDF, DOC, DOCX, PPT, PPTX and TXT.')
    data=await file.read(10*1024*1024+1)
    await file.close()
    if not data: raise HTTPException(400,'The document is empty.')
    if len(data)>10*1024*1024: raise HTTPException(413,'Maximum document size is 10 MB.')
    doc={'id':str(uuid.uuid4()),**DocumentProcessingService().process(Path(file.filename).name,len(data)),'created_at':datetime.now(timezone.utc).isoformat()}
    state['documents'].append(doc)
    await save(state)
    return doc

@router.post('/documents/{document_id}/summary')
async def summary(document_id:str,state=Depends(session)):
    doc=next((d for d in state['documents'] if d['id']==document_id),None)
    if not doc: raise HTTPException(404,'Document not found')
    return {'summary':AIService().generateStudySummary(doc),'mode':'simulated'}

@router.post('/assistant')
async def assistant(payload:ChatInput,state=Depends(session)): return {'answer':AIService().answerAssistantQuery(payload.message,state),'mode':'simulated'}

@router.post('/notifications/read')
async def read_notifications(state=Depends(session)):
    state['notifications_read']=True
    await save(state)
    return {'read':True}

@router.get('/admin/analytics')
async def analytics(state=Depends(admin)):
    return {'officials':4820,'active_learners':3910,'average_competency':71,'critical_gaps':12,'programmes':48,'future_skills':8,'departments':DEPARTMENTS,'skill_gaps':[{'name':n,'officials':c} for n,c in [('AI / ML',1842),('Data Visualization',1215),('Cloud Computing',890),('GIS',720),('SQL',640)]],'effectiveness':[{'course':n,'participants':p,'before':b,'after':a,'improvement':a-b,'effectiveness':'High' if a-b>=20 else 'Moderate'} for n,p,b,a in [('AI Foundations',420,48,72),('SQL for Statistical Data Analysis',380,52,76),('Advanced Data Visualization',310,61,80),('GIS for Official Statistics',240,42,68),('Python for Statistical Analysis',360,51,74)]], 'mode':'simulated'}

@router.get('/admin/departments')
async def departments(state=Depends(admin)): return DEPARTMENTS

@router.get('/admin/future-skills')
async def future(state=Depends(admin)):
    return {'skills':[{'name':n,'readiness':r,'demand':d} for n,r,d in [('AI / ML',38,'Very High'),('Cloud Computing',42,'High'),('GIS',50,'High'),('Data Engineering',31,'Very High')]], 'projection':[{'year':str(y),'AI / ML':a,'Data Engineering':d,'Cloud':c,'GIS':g} for y,a,d,c,g in [(2026,38,31,42,50),(2027,51,46,53,58),(2028,66,63,67,69),(2029,84,81,78,76)]], 'mode':'simulated projections'}

app.include_router(router)