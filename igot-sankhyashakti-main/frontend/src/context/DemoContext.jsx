import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import {api,apiError} from '../lib/api';
import {toast} from 'sonner';
const DemoContext=createContext(null);
const normalizeState=state=>{const profile=state?.profile||{},registered=JSON.parse(localStorage.getItem('sankh-registration')||'null')||{};return {...state,profile:{id:'EMP-2026-0142',name:'User',designation:'Officer',department:'Labour Statistics',location:'New Delhi',experience:0,education:'',expertise:'',responsibilities:'',summary:'Local workspace.',...profile,...registered,name:registered.name||profile.name||'User',designation:registered.designation||profile.designation||'Officer'}};
};
const fallbackState=role=>({
 id:'local-demo-session',role,profile:{name:role==='employee'?'Ananya Sharma':role==='trainer'?'Dr. Rajesh Kumar':'Priya Menon',designation:role==='employee'?'Deputy Director':role==='trainer'?'Senior Faculty':'Workforce Administrator',department:'Labour Statistics',location:'New Delhi',experience:8,education:'M.Sc. Statistics',expertise:'Statistical analysis and data validation',responsibilities:'Lead statistical reporting and capability building.',summary:'Local workspace.'},
 competencies:[{id:'sql',name:'SQL',category:'Technical',current:55,required:80,gap:25,priority:'High',confidence:88,last_assessed:'2026-09-10'},{id:'python',name:'Python',category:'Technical',current:62,required:80,gap:18,priority:'Medium',confidence:92,last_assessed:'2026-09-10'},{id:'data-visualization',name:'Data Visualization',category:'Technical',current:65,required:80,gap:15,priority:'Medium',confidence:92,last_assessed:'2026-09-10'},{id:'ai-machine-learning',name:'AI / Machine Learning',category:'Digital',current:32,required:65,gap:33,priority:'High',confidence:88,last_assessed:'2026-09-10'},{id:'gis',name:'GIS',category:'Digital',current:40,required:60,gap:20,priority:'Medium',confidence:88,last_assessed:'2026-09-10'}],
 learning:{'sql-fundamentals':{completed:[0,1,2,3],status:'Completed'},'sql-analysis':{completed:[0],status:'In Progress'}},results:[],documents:[],programmes:[],notifications_read:false,history:[{month:'Jan',competency:52,hours:8,score:58,gap:45,courses:2},{month:'Feb',competency:58,hours:16,score:65,gap:40,courses:5},{month:'Mar',competency:64,hours:24,score:72,gap:36,courses:8},{month:'Apr',competency:69,hours:31,score:77,gap:33,courses:10},{month:'May',competency:74,hours:38.5,score:81,gap:31,courses:12}],overview:{overall:74,critical_gaps:6,hours:38.5,courses_completed:2,categories:[{name:'Statistical',current:74,required:82},{name:'Technical',current:64,required:80},{name:'Digital',current:46,required:66},{name:'Behavioural',current:82,required:90}]},recommendations:[],courses:[],training_programmes:[],notifications:[]
});
export const DemoProvider=({children})=>{
 const [data,setData]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const [role,setRole]=useState(localStorage.getItem('sankh-role')||'');
 const refresh=useCallback(async()=>{try{const r=await api.get('/state');const next=normalizeState(r.data);setData(next);setError('');return next;}catch(e){const local=normalizeState(fallbackState(role||'employee'));setData(local);setError('');return local;}finally{setLoading(false);}},[role]);
 useEffect(()=>{refresh().catch(()=>{});},[refresh]);
 const login=async (next,registration={})=>{setRole(next);localStorage.setItem('sankh-role',next);if(registration.name||registration.designation){localStorage.setItem('sankh-registration',JSON.stringify(registration));}try{await api.post('/auth/demo',{role:next});await refresh();}catch(e){setData(normalizeState(fallbackState(next)));setLoading(false);setError('');}};
 const logout=()=>{setRole('');localStorage.removeItem('sankh-role');};
 const act=async(fn,message)=>{try{const result=await fn();await refresh();if(message)toast.success(message);return result.data;}catch(e){toast.error(apiError(e));throw e;}};
 return <DemoContext.Provider value={{data,loading,error,refresh,role,login,logout,act}}>{children}</DemoContext.Provider>;
};
export const useDemo=()=>useContext(DemoContext);