import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Target,ChartNoAxesCombined,BookOpen,Clock,ClipboardCheck,TrendingUp,ArrowRight,Sparkles,CalendarDays,Check,Lock,Building2,ArrowUpRight} from 'lucide-react';
import {useDemo} from '../context/DemoContext';
import {PageHead,SectionHead,Stat,Btn,Badge,ProgressBar} from '../components/Common';
import {CompetencyChart,GapCard,GapDetail,CourseCard} from '../components/CompetencyUI';

export default function Dashboard(){
  const {data,assessed}=useDemo();
  const [selected,setSelected]=useState(null);
  const o=data.overview||{overall:0,critical_gaps:0,hours:0,courses_completed:0,assessment_score:0,improvement:0};
  const top=[...(data?.competencies||[])].sort((a,b)=>b.gap-a.gap).slice(0,4);
  // Graceful greeting for unregistered/guest users
  const firstName=(data.profile.name && data.profile.name!=='Guest')?data.profile.name.split(' ')[0]:'Officer';
  // Build learning journey from actual backend-generated learning_path
  const learningPath=data.learning_path||[];
  const journeySteps=learningPath.slice(0,3).map(s=>({
    title:s.title,
    status:data.learning?.[s.id]?.status||s.status||'Recommended',
    id:s.id
  }));
  // If no learning path yet, fallback to top 2 recommendations
  if(journeySteps.length===0){
    (data.recommendations||[]).slice(0,2).forEach(c=>{
      journeySteps.push({title:c.title,status:data.learning?.[c.id]?.status||'Recommended',id:c.id});
    });
  }
  // Always add a final assessment milestone
  journeySteps.push({title:'Comprehensive Competency Assessment',status:'Upcoming',id:'assessment'});

  return (
    <div className="page-enter">
      <PageHead title={`Good morning, ${firstName}`} description="Here is your competency and learning overview." action={<div className="date-display"><CalendarDays size={15}/>{new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div>}/>
      <div className="stats-grid six">
        <Stat id="overall" label="Overall Competency" value={assessed?o.overall:"—"} unit="%" change={assessed?"Role-aligned proficiency":"Not assessed"} icon={Target}/>
        <Stat id="skill-gap" label="Skill Gap" value={assessed?o.critical_gaps:"—"} unit="areas" change={assessed?"Priority attention required":"Not assessed"} icon={ChartNoAxesCombined} tone={assessed?"orange":"neutral"}/>
        <Stat id="courses" label="Courses Completed" value={assessed?o.courses_completed:"—"} change={assessed?"Completed this period":"No history"} icon={BookOpen}/>
        <Stat id="hours" label="Learning Hours" value={assessed?o.hours:"—"} unit="hrs" change={assessed?"Keep your momentum":"No history"} icon={Clock}/>
        <Stat id="assessment" label="Assessment Score" value={assessed?o.assessment_score:"—"} unit="%" change={assessed?"Latest assessment":"Not assessed"} icon={ClipboardCheck}/>
        <Stat id="improvement" label="Competency Improvement" value={assessed?`+${o.improvement}`:"—"} unit="%" change={assessed?"From your baseline":"Not assessed"} icon={TrendingUp} tone={assessed?"green":"neutral"}/>
      </div>

      {!assessed && (
        <div className="assessment-callout" style={{marginTop:'2rem'}}>
          <div className="assessment-callout-icon"><Sparkles size={26}/></div>
          <div>
            <div className="callout-eyebrow">YOUR NEXT STEP</div>
            <h2 data-testid="assessment-cta-title">Generate your competency map.</h2>
            <p>Complete a short interactive assessment with the Virtual Assistant to generate your dynamic skill map and learning path.</p>
          </div>
          <Btn to="/app/assistant" data-testid="start-va-button">Start Virtual Assistant <ArrowRight size={16}/></Btn>
        </div>
      )}

      {assessed && <>
        <div className="assessment-callout">
          <div className="assessment-callout-icon"><ClipboardCheck size={26}/></div>
          <div>
            <div className="callout-eyebrow">YOUR NEXT STEP</div>
            <h2 data-testid="assessment-cta-title">Every assessment is a step forward.</h2>
            <p>Update your competency profile and unlock more relevant learning recommendations.</p>
          </div>
          <Btn to="/app/assessments" data-testid="complete-assessment-button">Complete Competency Assessment <ArrowRight size={16}/></Btn>
        </div>

        <div className="dashboard-intelligence">
          <section className="dashboard-panel competency-panel">
            <SectionHead id="competency-overview" title="Your competency overview" description="Where you stand against your role requirements" to="/app/competencies" link="View map"/>
            <div className="chart-legend">
              <span><i className="legend-current"/>Current proficiency</span>
              <span><i className="legend-required"/>Role requirement</span>
            </div>
            <CompetencyChart categories={o.categories}/>
            <div className="insight-footnote"><Sparkles size={14}/><span><strong>Digital competencies</strong> have the greatest scope for growth.</span></div>
          </section>
          <section className="dashboard-panel">
            <SectionHead id="top-gaps" title="Your top skill gaps" description="Focus on the competencies that matter most" to="/app/gaps" link="View analysis"/>
            <div className="gap-grid">{top.map(c=><GapCard key={c.id||c.name} competency={c} onClick={()=>setSelected(c)}/>)}</div>
            <Link to="/app/gaps" className="full-gap-link" data-testid="view-full-gap-analysis">View Full Skill-Gap Analysis <ArrowRight size={14}/></Link>
          </section>
        </div>

        <section className="dashboard-recommendations">
          <SectionHead id="recommended" title="Recommended for your growth" description={`${data.recommendations?.length||0} recommendations based on your role, skill gaps and learning history`} to="/app/courses" link="Explore all courses"/>
          <div className="course-grid">{(data.recommendations||[]).slice(0,3).map((c,i)=><CourseCard course={c} key={c.id} index={i}/>)}</div>
        </section>

        <div className="dashboard-bottom-grid">
          <section className="dashboard-panel">
            <SectionHead id="learning-progress" title="Your learning journey" description="Small steps. Lasting capability." to="/app/learning" link="View learning path"/>
            <div className="mini-timeline">
              {journeySteps.map(({title,status,id},i)=>(
                <Link to={id==='assessment'?'/app/assessments':`/app/courses/${id}`} key={id||i} data-testid={`journey-step-${i}`}>
                  <span className={`timeline-dot ${status==='Completed'?'complete':''}`}>{status==='Completed'?<Check size={13}/>:i+1}</span>
                  <strong>{title}</strong>
                  <Badge tone={status==='Completed'?'green':status==='In Progress'?'blue':'neutral'} testId={`journey-status-${i}`}>{status}</Badge>
                </Link>
              ))}
            </div>
          </section>
          <section className="training-feature">
            <div className="training-eyebrow"><Building2 size={16}/> NSSTA / TPAC <Badge tone="neutral" testId="training-demo-label">Demo Integration</Badge></div>
            <h2 data-testid="training-programme-title">Learning beyond the classroom.</h2>
            <h3>Advanced Statistical Data Analysis Programme</h3>
            <p>Strengthen your analytical capabilities through a role-aligned, faculty-led training programme.</p>
            <div className="training-details">
              <span><CalendarDays size={14}/>19–23 October 2026</span>
              <span><Clock size={14}/>5 days</span>
            </div>
            <Btn secondary to="/app/courses?tab=programmes" data-testid="view-training-programmes">Explore Training Programmes <ArrowUpRight size={15}/></Btn>
          </section>
        </div>
        <GapDetail competency={selected} onClose={()=>setSelected(null)}/>
      </>}
    </div>
  );
}