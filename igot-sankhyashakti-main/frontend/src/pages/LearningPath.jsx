import {Link} from 'react-router-dom';
import {Check,Lock,Clock,ArrowRight,Sparkles,BookOpen,Target,Route} from 'lucide-react';
import {PageHead,Badge,Btn,SectionHead,ProgressBar} from '../components/Common';
import {useDemo} from '../context/DemoContext';

export default function LearningPath(){
  const {data,assessed}=useDemo();
  const rawCourses = data?.courses || [];
  // Use backend personalized learning path steps or map from recommended courses
  const steps = (data?.learning_path && data.learning_path.length > 0)
    ? data.learning_path
    : rawCourses.slice(0, 3).map((c, i) => ({
        step: i + 1,
        id: c.id,
        title: c.title,
        competency: c.competency,
        duration: c.duration,
        difficulty: c.difficulty,
        provider: c.provider,
        status: c.status || 'Recommended',
        reason: `Builds role proficiency in ${c.competency}.`
      }));

  const topGap = [...(data?.competencies || [])].sort((a,b) => b.gap - a.gap)[0] || {name:'Data Quality',current:40,required:80,gap:40};
  const allDone = steps.every(s => s.status === 'Completed');

  return (
    <div className="page-enter">
      <PageHead
        eyebrow="PERSONALIZED TO YOUR ROLE"
        title="Your Personalized Learning Path"
        description="A purposeful journey from your current capabilities to your next level."
        action={<Badge tone="blue" testId="learning-path-generated"><Sparkles size={13}/> Demo AI-assisted pathway</Badge>}
      />

      {!assessed ? (
        <div className="assessment-callout" style={{marginTop:'2rem'}}><div className="assessment-callout-icon"><Sparkles size={26}/></div><div><div className="callout-eyebrow">YOUR NEXT STEP</div><h2>Generate your learning path.</h2><p>Complete a short interactive assessment with the Virtual Assistant to generate your dynamic skill map and learning path.</p></div><Btn to="/app/assistant">Start Virtual Assistant <ArrowRight size={16}/></Btn></div>
      ) : (
      <div className="learning-layout">
        <div className="learning-journey">
          {steps.map((s, i) => {
            const comp = (data?.competencies || []).find(x => x.name === s.competency) || {current: 50, required: 80, gap: 30};
            const isCompleted = s.status === 'Completed';
            const isInProgress = s.status === 'In Progress';

            return (
              <article key={s.id || i} className={`learning-step ${isCompleted ? 'step-complete' : ''}`} data-testid={`learning-step-${i+1}`}>
                <div className="learning-step-marker">
                  {isCompleted ? <Check size={20}/> : String(i+1).padStart(2,'0')}
                </div>
                <div className="learning-step-content">
                  <div className="step-top">
                    <span>STEP {i+1}</span>
                    <Badge testId={`step-status-${i+1}`} tone={isCompleted ? 'green' : isInProgress ? 'blue' : 'neutral'}>
                      {s.status || 'Recommended'}
                    </Badge>
                  </div>
                  <h2>{s.title}</h2>
                  <div className="learning-step-meta">
                    <span><BookOpen size={14}/>{s.provider}</span>
                    <span><Clock size={14}/>{s.duration} hours</span>
                    <span>{s.difficulty}</span>
                  </div>
                  <div className="learning-competency">
                    <Target size={14}/>{s.competency}
                    <span>{comp.current}% current → {comp.required}% target</span>
                  </div>
                  <p className="step-reason" data-testid={`step-reason-${i+1}`}>
                    <Sparkles size={14}/>{s.reason}
                  </p>
                  <div className="step-bottom">
                    <span>Focus area: {s.competency}</span>
                    {s.id !== 'competency-verification' ? (
                      <Btn small secondary={isCompleted} to={`/app/courses/${s.id}`} data-testid={`learning-open-${s.id}`}>
                        {isCompleted ? 'Review course' : isInProgress ? 'Continue Learning' : 'View Course'}
                        <ArrowRight size={14}/>
                      </Btn>
                    ) : (
                      <Btn small to="/app/assessments" data-testid="learning-open-assessment">
                        Take Assessment <ArrowRight size={14}/>
                      </Btn>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          <article className="learning-step step-locked">
            <div className="learning-step-marker">{allDone ? <Check size={20}/> : <Lock size={18}/>}</div>
            <div className="learning-step-content">
              <div className="step-top">
                <span>FINAL MILESTONE</span>
                <Badge tone={allDone ? 'green' : 'neutral'} testId="final-assessment-status">
                  {allDone ? 'Available' : 'Role Milestone'}
                </Badge>
              </div>
              <h2>Official Statistics Competency Certification</h2>
              <p>
                Complete your assigned learning steps to close key gaps in {topGap.name} and certify higher capability levels.
              </p>
              <Btn to="/app/assessments" data-testid="final-assessment-button">
                Take Pathway Assessment <ArrowRight size={15}/>
              </Btn>
            </div>
          </article>
        </div>

        <aside className="learning-aside">
          <div className="ai-explanation">
            <span className="ai-explanation-icon"><Sparkles size={23}/></span>
            <Badge tone="blue" testId="explanation-demo-label">PERSONALIZED INSIGHT</Badge>
            <h2>Why am I seeing this pathway?</h2>
            <p data-testid="learning-ai-explanation">
              Your {topGap.name} competency is currently <strong>{topGap.current}%</strong> against a role requirement of <strong>{topGap.required}%</strong>.
              This pathway prioritizes your {topGap.gap}-point gap and aligns directly with your responsibilities as {data?.profile?.designation || 'Deputy Director'}.
            </p>
            <div className="ai-explanation-divider"/>
            <h3>Your pathway considers</h3>
            {[
              'Current role & responsibilities',
              'Assessed competency gaps',
              'Previous learning history',
              'Departmental priorities',
              'Future skill relevance'
            ].map(t => (
              <p className="explanation-check" key={t}><Check size={15}/>{t}</p>
            ))}
            <Link to="/app/assistant" data-testid="learning-ask-ai">Ask Sankhyashakti AI <ArrowRight size={15}/></Link>
          </div>

          <div className="path-summary">
            <Route size={23}/>
            <h3>At your pace. For your role.</h3>
            <span>{steps.filter(s => s.status === 'Completed').length} of {steps.length} steps completed</span>
            <ProgressBar value={(steps.filter(s => s.status === 'Completed').length / steps.length) * 100} id="path-total-progress"/>
            <p>
              Estimated learning<br/>
              <strong>{steps.reduce((a, s) => a + (s.duration || 4), 0)} hours</strong>
            </p>
          </div>
        </aside>
      </div>
      )}
    </div>
  );
}