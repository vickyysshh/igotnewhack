import {useState,useRef,useEffect} from 'react';
import {Sparkles,ArrowUp,Plus,Target,BookOpen,TrendingUp,ShieldCheck,Loader2,ArrowRight,CheckCircle2,ClipboardCheck} from 'lucide-react';
import {useDemo} from '../context/DemoContext';
import {PageHead,Badge,Btn} from '../components/Common';
import {api,apiError} from '../lib/api';
import {toast} from 'sonner';
import {Link} from 'react-router-dom';

const prompts=[
  '🚀 Start Adaptive Competency Assessment',
  'What should I learn next?',
  'Why was this course recommended?',
  'Show me my biggest skill gaps.',
  'How can I improve my Data Quality competency?',
  'Explain my competency score.'
];

export default function Assistant(){
  const {data,refresh,assessed}=useDemo();
  
  if (!assessed) {
    return <VAWizard refresh={refresh} />;
  }

  return <VAChat data={data} refresh={refresh} />;
}

function VAWizard({refresh}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    api.get('/va/questions').then(r => {
      setQuestions(r.data);
      setLoading(false);
    }).catch(e => {
      toast.error(apiError(e));
      setLoading(false);
    });
  }, []);

  const handleSelect = (q, val) => {
    if (q.type === 'multi_select') {
      const cur = answers[q.id] || [];
      if (cur.includes(val)) {
        setAnswers({...answers, [q.id]: cur.filter(x => x !== val)});
      } else {
        setAnswers({...answers, [q.id]: [...cur, val]});
      }
    } else {
      setAnswers({...answers, [q.id]: val});
    }
  };

  const next = async () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      setBusy(true);
      try {
        await api.post('/va/submit', {answers});
        await refresh();
        setDone(true);
      } catch(e) {
        toast.error(apiError(e));
      } finally {
        setBusy(false);
      }
    }
  };

  if (loading) return <div className="page-enter assistant-page"><Loader2 className="spin" size={24}/></div>;

  if (done) {
    return (
      <div className="page-enter assistant-page" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'60vh',textAlign:'center'}}>
        <div style={{color:'var(--brand)',marginBottom:'1rem'}}><CheckCircle2 size={64}/></div>
        <h1 style={{fontSize:'2rem',marginBottom:'1rem'}}>Assessment Complete!</h1>
        <p style={{fontSize:'1.1rem',color:'var(--muted)',maxWidth:'500px',marginBottom:'2rem'}}>Your responses have been evaluated and your dynamic competency map is now ready.</p>
        <Btn to="/app/dashboard">View My Dashboard <ArrowRight size={16}/></Btn>
      </div>
    );
  }

  const q = questions[step];
  if (!q) return null;

  return (
    <div className="page-enter assistant-page">
      <PageHead
        title="Initial Competency Assessment"
        description="Let's build your competency profile."
      />
      <div style={{maxWidth:'600px',margin:'2rem auto',background:'#fff',padding:'2rem',borderRadius:'12px',boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
        <div style={{marginBottom:'1.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',color:'var(--muted)',fontSize:'0.9rem',fontWeight:500}}>
          <span>Question {step + 1} of {questions.length}</span>
          <span>{q.competency}</span>
        </div>
        
        <h2 style={{fontSize:'1.3rem',lineHeight:'1.5',marginBottom:'1.5rem'}}>{q.text}</h2>
        
        <div style={{display:'flex',flexDirection:'column',gap:'0.75rem',marginBottom:'2rem'}}>
          {q.options.map(opt => {
            const isSelected = q.type === 'multi_select' ? (answers[q.id]||[]).includes(opt) : answers[q.id] === opt;
            return (
              <button 
                key={opt}
                onClick={() => handleSelect(q, opt)}
                style={{
                  padding:'1rem',textAlign:'left',borderRadius:'8px',
                  border: isSelected ? '2px solid var(--brand)' : '1px solid #e2e8f0',
                  background: isSelected ? 'rgba(0,102,204,0.05)' : '#fff',
                  cursor:'pointer',fontSize:'1rem',transition:'all 0.1s'
                }}
              >
                {opt}
              </button>
            )
          })}
        </div>

        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <Btn 
            onClick={next} 
            disabled={busy || !answers[q.id] || (q.type==='multi_select' && answers[q.id].length===0)}
          >
            {busy ? 'Saving...' : step === questions.length - 1 ? 'Submit Assessment' : 'Next Question'} <ArrowRight size={16}/>
          </Btn>
        </div>
      </div>
    </div>
  );
}

function VAChat({data, refresh}) {
  const [messages,setMessages]=useState(()=>{
    try{return JSON.parse(sessionStorage.getItem('sankh-chat'))||[];}catch{return [];}
  });
  const [input,setInput]=useState('');
  const [busy,setBusy]=useState(false);
  const [adaptiveSession,setAdaptiveSession]=useState(()=>{
    try{return JSON.parse(sessionStorage.getItem('sankh-adaptive-session'))||null;}catch{return null;}
  });
  const end=useRef();

  useEffect(()=>{
    sessionStorage.setItem('sankh-chat',JSON.stringify(messages));
    end.current?.scrollIntoView({behavior:'smooth',block:'nearest'});
  },[messages]);

  useEffect(()=>{
    if(adaptiveSession){
      sessionStorage.setItem('sankh-adaptive-session',JSON.stringify(adaptiveSession));
    } else {
      sessionStorage.removeItem('sankh-adaptive-session');
    }
  },[adaptiveSession]);

  const startAdaptive=async(targetComp=null)=>{
    setBusy(true);
    try{
      const r=await api.post('/assessment/adaptive/start',{competency:targetComp});
      const sess=r.data;
      setAdaptiveSession(sess);
      const text=`🎯 **Adaptive Competency Assessment Initiated**\n\n**Evaluating Competency:** ${sess.competency} (Competency ${sess.current_step} of ${sess.total_competencies})\n\n**Question:**\n${sess.question}\n\n*Please type your answer below explaining your practical methodology and experience.*`;
      setMessages(m=>[...m,{role:'assistant',text,meta:{isAdaptive:true,competency:sess.competency,question:sess.question}}]);
    }catch(e){
      toast.error(apiError(e));
    }finally{
      setBusy(false);
    }
  };

  const send=async(text=input)=>{
    const content=(text||'').trim();
    if(!content||busy)return;
    setInput('');

    if(content==='🚀 Start Adaptive Competency Assessment'){
      await startAdaptive();
      return;
    }

    setMessages(m=>[...m,{role:'user',text:content}]);
    setBusy(true);

    try{
      if(adaptiveSession&&!adaptiveSession.is_complete){
        const r=await api.post('/assessment/adaptive/interact',{
          adaptive_session_id: adaptiveSession.adaptive_session_id,
          competency: adaptiveSession.competency,
          question: adaptiveSession.question,
          answer: content
        });
        const result=r.data;
        await refresh();

        let responseText=`✅ **Evidence Evaluated:** ${result.competency}\n• **Demonstrated Level:** Level ${result.demonstrated_level} (${result.level_label})\n• **Calculated Score:** ${result.score}% (Deterministic Level × 20)\n• **Evidence Summary:** ${result.evidence_summary}\n\n`;

        if(!result.is_complete&&result.next_competency&&result.next_question){
          responseText+=`➡️ **Next Competency:** ${result.next_competency} (${result.progress.answered + 1} of ${result.progress.total})\n\n**Question:**\n${result.next_question}\n\n*Type your response to continue the assessment.*`;
          setAdaptiveSession({
            ...adaptiveSession,
            competency: result.next_competency,
            question: result.next_question,
            is_complete: false
          });
        } else {
          responseText+=`🎉 **Adaptive Assessment Complete!**\nAll target competencies have been evaluated. Your Competency Map, Skill Gaps, and Course Recommendations have been updated in MongoDB.\n\nYou can view your updated profile in **Competency Map** or ask me questions about your learning path.`;
          setAdaptiveSession(null);
        }

        setMessages(m=>[...m,{role:'assistant',text:responseText}]);
      } else {
        const r=await api.post('/assistant',{message:content});
        setMessages(m=>[...m,{role:'assistant',text:r.data.answer}]);
      }
    }catch(e){
      toast.error(apiError(e));
      setMessages(m=>[...m,{role:'error',text:'I couldn’t process that response just now. Please try again.'}]);
    }finally{
      setBusy(false);
    }
  };

  const resetChat=()=>{
    setMessages([]);
    setAdaptiveSession(null);
    sessionStorage.removeItem('sankh-chat');
    sessionStorage.removeItem('sankh-adaptive-session');
  };

  return (
    <div className="page-enter assistant-page">
      <PageHead
        title="Virtual Assistant & Assessment Agent"
        description="Your AI-powered adaptive competency assessment companion and learning advisor."
        action={
          <div style={{display:'flex',gap:'0.5rem'}}>
            <Btn secondary small data-testid="start-adaptive-btn" onClick={()=>startAdaptive()}>
              <ClipboardCheck size={15}/> Start Adaptive Assessment
            </Btn>
            <Btn secondary small data-testid="new-chat-button" onClick={resetChat}>
              <Plus size={15}/> New conversation
            </Btn>
          </div>
        }
      />

      <div className="assistant-layout">
        <section className="chat-workspace">
          <div className="chat-scroll">
            {messages.length===0?(
              <div className="assistant-welcome">
                <div className="assistant-symbol"><Sparkles size={34}/></div>
                <span className="eyebrow">ADAPTIVE COMPETENCY INTELLIGENCE</span>
                <h2 data-testid="assistant-welcome">
                  Hello, {data?.profile?.name?.split(' ')[0]||'Officer'}.<br/>
                  Ready to assess or grow your competencies?
                </h2>
                <p>
                  I can conduct an <strong>Adaptive Competency Assessment</strong> for your role as {data?.profile?.designation||'Deputy Director'}, evaluate your evidence into deterministic scores, or answer questions about your skill gaps.
                </p>
                <div className="suggested-prompts">
                  {prompts.map((p,i)=>(
                    <button key={p} data-testid={`assistant-prompt-${i}`} onClick={()=>send(p)}>
                      {p}<ArrowRight size={15}/>
                    </button>
                  ))}
                </div>
              </div>
            ):(
              <div className="chat-messages" aria-live="polite">
                {messages.map((m,i)=>(
                  <div className={`chat-message ${m.role}`} key={i} data-testid={`chat-message-${i}`}>
                    <span className="chat-avatar">
                      {m.role==='user'?data?.profile?.name?.split(' ').map(n=>n[0]).slice(0,2).join(''):<Sparkles size={18}/>}
                    </span>
                    <div>
                      <strong>{m.role==='user'?'You':'Sankhyashakti AI Agent'}</strong>
                      <div style={{whiteSpace:'pre-wrap',lineHeight:'1.5'}}>{m.text}</div>
                    </div>
                  </div>
                ))}
                {busy&&(
                  <div className="assistant-thinking" data-testid="assistant-thinking">
                    <Loader2 className="spin" size={17}/>
                    {adaptiveSession?'Evaluating demonstrated competency evidence…':'Reviewing your competency profile…'}
                  </div>
                )}
                <div ref={end}/>
              </div>
            )}
          </div>

          <form className="chat-input-form" onSubmit={e=>{e.preventDefault();send();}}>
            <Sparkles size={18}/>
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              placeholder={adaptiveSession?`Answering for ${adaptiveSession.competency}…`:"Ask about competencies, gaps, or start assessment…"}
              aria-label="Message Sankhyashakti AI"
              data-testid="assistant-message-input"
              maxLength={3000}
            />
            <button
              disabled={busy||!input.trim()}
              aria-label="Send message"
              data-testid="assistant-send-button"
              type="submit"
            >
              {busy?<Loader2 size={19} className="spin"/>:<ArrowUp size={20}/>}
            </button>
          </form>
          <p className="chat-disclaimer" data-testid="assistant-disclaimer">
            {adaptiveSession?'Adaptive Assessment active · Answers are evaluated by Gemini and scores updated deterministically in MongoDB.':'Powered by Gemini 3.6 Flash · Grounded strictly in your MongoDB profile and competency data.'}
          </p>
        </section>

        <aside className="assistant-context">
          <div className="assistant-context-head">
            <Target size={19}/>
            <h3>Officer Context</h3>
            <Badge tone="green" testId="assistant-context-live">MongoDB Live</Badge>
          </div>

          <div className="context-profile">
            <strong>{data?.profile?.name}</strong>
            <span>{data?.profile?.designation}</span>
            <small>{data?.profile?.department}</small>
          </div>

          <div className="context-metric">
            <Target size={18}/>
            <span>Overall competency</span>
            <strong data-testid="ai-current-overall">{data?.overview?.overall}%</strong>
          </div>

          <div className="context-metric">
            <BookOpen size={18}/>
            <span>Courses completed</span>
            <strong>{data?.overview?.courses_completed}</strong>
          </div>

          <h4>TARGET COMPETENCIES & GAPS</h4>
          {[...(data?.competencies||[])]
            .sort((a,b)=>b.gap-a.gap)
            .slice(0,4)
            .map(c=>(
              <div className="context-gap" key={c.id} data-testid={`assistant-gap-${c.id}`}>
                <div>
                  <span>{c.name}</span>
                  <small style={{display:'block',color:'var(--muted,#666)',fontSize:'0.75rem'}}>
                    Level {c.current_level||c.level||2} → {c.required_level||4}
                  </small>
                </div>
                <strong style={{color:c.gap>=25?'#e65100':c.gap>=15?'#0277bd':'#2e7d32'}}>
                  {c.gap} pts
                </strong>
              </div>
            ))}

          <div className="context-trust" style={{marginTop:'1.5rem'}}>
            <ShieldCheck size={20}/>
            <p>
              Adaptive questioning evaluates practical evidence and deterministically updates scores in MongoDB ($Level \times 20$).
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}