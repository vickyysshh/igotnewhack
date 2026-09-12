import {useState,useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Upload,FileText,CheckCircle2,Sparkles,ClipboardCheck,BookOpen,ArrowRight,Loader2,FileCheck2} from 'lucide-react';
import {toast} from 'sonner';
import {PageHead,SectionHead,Btn,Badge,Modal} from '../components/Common';
import {useDemo} from '../context/DemoContext';
import {api,apiError} from '../lib/api';
const SAMPLE='Labour Survey Methodology — Training Notes\nDefine the target population and sampling frame. Use stratified random sampling to represent urban and rural households. Apply survey weights to account for selection probabilities. Validate missing values and non-response. Protect respondent confidentiality. Publish labour-force indicators with uncertainty and metadata.';

export default function UploadMaterial(){
  const {data,act}=useDemo(),navigate=useNavigate(),input=useRef();
  const [doc,setDoc]=useState(data.documents.at(-1)||null),[busy,setBusy]=useState(''),[drag,setDrag]=useState(false);
  const [count,setCount]=useState(10),[type,setType]=useState('MCQ'),[summary,setSummary]=useState('');
  const upload=async file=>{
    if(!file)return;setBusy('upload');const form=new FormData();form.append('file',file);
    try{setDoc(await act(()=>api.post('/documents/upload',form),'Sample document processed.'));}
    catch{}finally{setBusy('');if(input.current)input.current.value='';}
  };
  const generate=async kind=>{
    if(!doc)return;setBusy(kind);
    try{
      if(kind==='summary'){const r=await api.post(`/documents/${doc.id}/summary`);setSummary(r.data.summary);}
      else{const r=await api.post('/quiz/generate',{competency:'Survey Design',count,question_type:kind==='mcq'?'MCQ':type,document_id:doc.id});sessionStorage.setItem('sankh-active-assessment',JSON.stringify(r.data));sessionStorage.removeItem('sankh-answers');navigate('/app/assessments');}
    }catch(e){toast.error(apiError(e));}finally{setBusy('');}
  };
  return <div className="page-enter">
    <PageHead eyebrow="FROM TRAINING MATERIAL TO COMPETENCY EVIDENCE" title="Upload Learning Material" description="Explore document processing, competency extraction and assessment generation." action={<Badge tone="orange" testId="document-processing-mode">Simulated AI Processing</Badge>}/>
    <div className="upload-workflow" data-testid="upload-workflow">{['Upload material','Review insights','Generate assessment'].map((title,i)=><div className={(doc?i<2:i===0)?'active':''} key={title}><span>{doc&&i===0?<CheckCircle2 size={17}/>:i+1}</span><strong>{title}</strong>{i<2&&<ArrowRight size={17}/>}</div>)}</div>
    <div className="upload-layout"><div>
      <div className={`upload-dropzone ${drag?'dragging':''}`} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);if(!busy)upload(e.dataTransfer.files[0]);}} data-testid="document-dropzone">
        <div className="upload-icon">{busy==='upload'?<Loader2 className="spin" size={34}/>:<Upload size={34}/>}</div>
        <h2 data-testid="upload-status">{busy==='upload'?'Processing document…':'Your material. New learning possibilities.'}</h2><p>Drag a sample document here, or choose a file</p>
        <input ref={input} type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" onChange={e=>upload(e.target.files[0])} data-testid="document-file-input" className="visually-hidden" disabled={!!busy}/>
        <Btn disabled={!!busy} data-testid="browse-document-button" onClick={()=>input.current.click()}>Browse Files <Upload size={16}/></Btn>
        <small>PDF, DOC/DOCX, PPT/PPTX, TXT & video transcripts (.txt) · Up to 10 MB</small>
      </div>
      <div className="sample-file-row"><FileText size={25}/><div><strong>Labour Survey Methodology</strong><span>Sample training document · TXT</span></div><Btn secondary small disabled={!!busy} data-testid="use-sample-document" onClick={()=>upload(new File([SAMPLE],'Labour_Survey_Methodology.txt',{type:'text/plain'}))}>Use Sample <ArrowRight size={14}/></Btn></div>
      {doc&&<section className="document-insights">
        <div className="document-processed"><FileCheck2 size={26}/><div><strong data-testid="processed-file-name">{doc.name}</strong><span>{(doc.size/1024).toFixed(1)} KB · {new Date(doc.created_at).toLocaleDateString('en-IN')}</span></div><Badge tone="green" testId="document-processed-status"><CheckCircle2 size={12}/> Processed</Badge></div>
        <div className="document-summary"><SectionHead id="document-summary" title="Document Summary"/><p data-testid="document-summary-text">{doc.summary}</p></div>
        <div className="document-tags-section"><h3>Detected Topics</h3><div className="topic-tags">{doc.topics.map((topic,i)=><Badge key={topic} tone="neutral" testId={`detected-topic-${i}`}>{topic}</Badge>)}</div><h3>Detected Competencies</h3><div className="topic-tags">{doc.competencies.map((competency,i)=><Badge key={competency} tone="blue" testId={`detected-competency-${i}`}>{competency}</Badge>)}</div><h3>Learning Objectives</h3>{doc.objectives.map((objective,i)=><p className="objective-row" data-testid={`learning-objective-${i}`} key={objective}><CheckCircle2 size={16}/>{objective}</p>)}</div>
      </section>}
    </div><aside className="generation-panel"><Sparkles size={28}/><h2>Create from your material</h2><p>Review the illustrative extraction, then choose your assessment format.</p>
      <label className="form-label">Number of questions<select data-testid="upload-question-count" value={count} onChange={e=>setCount(Number(e.target.value))}>{[5,10,20].map(n=><option key={n} value={n} label={`${n} questions`}/>)}</select></label>
      <label className="form-label">Question type<select data-testid="upload-question-type" value={type} onChange={e=>setType(e.target.value)}>{['MCQ','True/False','Scenario-based'].map(t=><option key={t} value={t} label={t}/>)}</select></label>
      <div className="generation-actions">{[['assessment','Generate Assessment',ClipboardCheck],['quiz','Generate Quiz',Sparkles],['mcq','Generate MCQs',FileText],['summary','Generate Study Summary',BookOpen]].map(([kind,label,Icon],i)=><Btn secondary={i!==0} key={kind} disabled={!doc||!!busy} data-testid={`document-generate-${kind}`} onClick={()=>generate(kind)}>{busy===kind?<Loader2 className="spin" size={16}/>:<Icon size={16}/>} {busy===kind?'Generating…':label}</Btn>)}</div>
      <div className="generation-disclosure" data-testid="document-generation-disclaimer"><CheckCircle2 size={20}/><p>Document extraction and question generation are simulated. Only file metadata is retained; original files are not stored. Use non-sensitive sample content.</p></div>
    </aside></div>
    {data.documents.length>1&&<section className="upload-history"><SectionHead id="upload-history" title="Recent materials"/><div className="history-rows">{[...data.documents].reverse().slice(0,5).map(d=><button key={d.id} data-testid={`uploaded-document-${d.id}`} onClick={()=>setDoc(d)}><FileText size={20}/><strong>{d.name}</strong><span>{(d.size/1024).toFixed(1)} KB</span><Badge tone="green" testId={`upload-status-${d.id}`}>Processed</Badge><ArrowRight size={15}/></button>)}</div></section>}
    <Modal open={!!summary} onClose={()=>setSummary('')} title="Study Summary" description="Sample study notes · Based on the selected topic set"><div className="study-summary" data-testid="generated-study-summary"><BookOpen size={26}/><p>{summary}</p><Btn data-testid="summary-done-button" onClick={()=>setSummary('')}>Done <CheckCircle2 size={16}/></Btn></div></Modal>
  </div>;
}