import {useEffect,useState} from 'react';
import {FileText,Download,Loader2,Check} from 'lucide-react';
import {Modal,Btn} from './Common';
import {prepareReport} from '../lib/exportReports';
import {api,apiError} from '../lib/api';
import {departments} from '../lib/analytics';
import {useDemo} from '../context/DemoContext';

async function reportRows(id,history){
  if(id==='employee')return history.map(h=>({'Period':h.month,'Competency (%)':h.competency,'Learning Hours':h.hours,'Assessment Score (%)':h.score,'Courses Completed':h.courses,'Environment':'Simulated data'}));
  if(id==='future'){const {data}=await api.get('/admin/future-skills');return data.skills.map(s=>({'Competency':s.name,'Current Readiness (%)':s.readiness,'Future Demand':s.demand,'Environment':'Simulated projection'}));}
  if(id==='training'){const {data}=await api.get('/admin/analytics');return data.effectiveness.map(c=>({'Course':c.course,'Participants':c.participants,'Before (%)':c.before,'After (%)':c.after,'Improvement (pts)':c.improvement,'Effectiveness':c.effectiveness,'Environment':'Simulated data'}));}
  return departments.map(d=>({'Department':d.name,'Officials':d.employees,'Competency (%)':d.competency,'Critical Gap':d.gap,'Training Need':d.need,'Environment':'Simulated data'}));
}

export const ExportDialog=({report,onClose,onExport})=>{
  const {data}=useDemo();
  const [files,setFiles]=useState({}),[error,setError]=useState(''),[last,setLast]=useState('');
  useEffect(()=>{
    let active=true;const urls=[];
    if(!report)return;
    setFiles({});setError('');setLast('');
    reportRows(report[0],data.history).then(rows=>Promise.all(['PDF','CSV','Excel'].map(async format=>{
      const prepared=await prepareReport(report[1],rows,format);
      if(active){const url=URL.createObjectURL(prepared.blob);urls.push(url);setFiles(current=>({...current,[format]:{url,name:prepared.name}}));}
    }))).catch(e=>{if(active)setError(apiError(e));});
    return()=>{active=false;urls.forEach(url=>URL.revokeObjectURL(url));};
  },[report,data.history]);
  return <Modal open={!!report} onClose={onClose} title={report?.[1]} description="Choose a format for your report.">
    <div className="export-options">{['PDF','CSV','Excel'].map(format=>files[format]?
      <a key={format} href={files[format].url} download={files[format].name} data-testid={`export-${format.toLowerCase()}`} onClick={()=>{setLast(format);onExport(format);}}>
        <FileText size={27}/><strong>Export {format}</strong><span>{format==='PDF'?'Print-ready report':format==='CSV'?'Analysis-ready data':'Formatted workbook'}</span><Download size={17}/>
      </a>:<button key={format} disabled data-testid={`preparing-export-${format.toLowerCase()}`}><Loader2 className="spin" size={27}/><strong>Preparing {format}</strong><span>Preparing your report…</span></button>
    )}</div>
    {last&&<p role="status" className="export-success" data-testid="export-success"><Check size={16}/>{last} download started. You can export another format.</p>}
    {error&&<p role="alert" data-testid="export-error">{error}</p>}
    <p className="muted" data-testid="export-disclaimer">All exports are labelled with the current environment and sample data status.</p>
    <Btn secondary data-testid="export-done-button" onClick={onClose}>Done</Btn>
  </Modal>;
};