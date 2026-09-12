import {useState} from 'react';
import {FileText,Download,ChartColumn,Building2,TrendingUp,Sparkles,UserRound,CheckCircle2} from 'lucide-react';
import {toast} from 'sonner';
import {PageHead,Badge,Btn,SectionHead} from '../components/Common';
import {ExportDialog} from '../components/ExportDialog';
const reports=[['workforce','Workforce Competency Report','Organization-wide proficiency and department comparisons.',ChartColumn],['department','Department Skill Gap Report','Priority gaps and training needs by statistical department.',Building2],['training','Training Effectiveness Report','Participation, before-and-after scores and learning impact.',TrendingUp],['future','Future Skills Report','Readiness and projected demand for emerging competencies.',Sparkles],['employee','Employee Progress Report','Competency growth, learning hours and assessment evidence.',UserRound]];
export default function Reports(){
  const [selected,setSelected]=useState(null),[recent,setRecent]=useState([]);
  const exported=format=>{
    setRecent(rows=>[{title:selected[1],format,date:new Date().toLocaleTimeString('en-IN')},...rows].slice(0,5));
    toast.success(`${format} report download started.`);
  };
  return <div className="page-enter">
    <PageHead eyebrow="EVIDENCE FOR BETTER DECISIONS" title="Reports & Exports" description="Bring your competency intelligence into planning, review and action." action={<Badge tone="orange" testId="reports-data-mode">Simulated Data</Badge>}/>
    <div className="report-grid">{reports.map((report,index)=>{
      const Icon=report[3];
      return <article className="report-card" key={report[0]} data-testid={`report-${report[0]}`}>
        <span className="report-icon"><Icon size={26}/></span><span className="report-number">0{index+1}</span>
        <h2 data-testid={`report-title-${report[0]}`}>{report[1]}</h2><p>{report[2]}</p>
        <div className="report-formats"><span>PDF</span><span>CSV</span><span>XLSX</span></div>
        <Btn secondary data-testid={`open-report-${report[0]}`} onClick={()=>setSelected(report)}><Download size={15}/>Export Report <span className="button-spacer"/></Btn>
      </article>;
    })}</div>
    <section className="report-privacy"><CheckCircle2 size={23}/><div><h2>Simulated data. Real reporting workflows.</h2><p>Exports contain clearly labelled sample data. Employee reports reflect assessment updates from this browser session.</p></div></section>
    {recent.length>0&&<section><SectionHead id="recent-exports" title="Recently exported"/><div className="history-rows">{recent.map((report,index)=><div key={index} data-testid={`recent-export-${index}`}><FileText size={21}/><strong>{report.title}</strong><Badge tone="green" testId={`export-format-${index}`}>{report.format}</Badge><span>{report.date}</span><CheckCircle2 size={16}/></div>)}</div></section>}
    <ExportDialog report={selected} onClose={()=>setSelected(null)} onExport={exported}/>
  </div>;
}