import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import {api,apiError} from '../lib/api';
import {toast} from 'sonner';
const DemoContext=createContext(null);

// Normalize state — guarantee all required arrays/objects exist to prevent .map()/.filter() crashes.
const normalizeState=state=>{
 const profile=state?.profile||{};
 const defaultHistory=[
  {month:'Jan',competency:52,hours:4,score:60,gap:45,courses:1},
  {month:'Feb',competency:55,hours:6,score:65,gap:42,courses:1},
  {month:'Mar',competency:57,hours:5,score:68,gap:40,courses:2},
  {month:'Apr',competency:59,hours:7,score:70,gap:38,courses:1},
  {month:'May',competency:62,hours:8,score:72,gap:35,courses:2},
  {month:'Jun',competency:64,hours:6,score:75,gap:33,courses:1},
 ];
 return {
  ...state,
  profile: {
   id: profile.id||'',
   name: profile.name||'Guest',
   designation: profile.designation||'',
   department: profile.department||'',
   location: profile.location||'New Delhi',
   experience: profile.experience||0,
   education: profile.education||'',
   expertise: profile.expertise||'',
   responsibilities: profile.responsibilities||'',
   summary: profile.summary||'',
   ...profile
  },
  competencies: Array.isArray(state?.competencies) ? state.competencies : [],
  courses: Array.isArray(state?.courses) ? state.courses : [],
  results: Array.isArray(state?.results) ? state.results : [],
  recommendations: Array.isArray(state?.recommendations) ? state.recommendations : [],
  learning_path: Array.isArray(state?.learning_path) ? state.learning_path : [],
  training_programmes: Array.isArray(state?.training_programmes) ? state.training_programmes : [],
  notifications: Array.isArray(state?.notifications) ? state.notifications : [],
  documents: Array.isArray(state?.documents) ? state.documents : [],
  programmes: Array.isArray(state?.programmes) ? state.programmes : [],
  history: (Array.isArray(state?.history) && state.history.length > 0) ? state.history : defaultHistory,
  learning: (state?.learning && typeof state.learning === 'object') ? state.learning : {},
  overview: {
   overall: 0,
   critical_gaps: 0,
   hours: 0,
   courses_completed: 0,
   assessment_score: 0,
   improvement: 0,
   categories: [],
   ...(state?.overview||{})
  },
  notifications_read: state?.notifications_read||false,
  va_assessment_completed: state?.va_assessment_completed||false,
 };
};

const fallbackState=role=>({
 id:'local-demo-session',role,
 profile:{name:'Guest',designation:'',department:'',location:'New Delhi',experience:0,education:'',expertise:'',responsibilities:'',summary:''},
 competencies:[],
 learning:{},results:[],documents:[],programmes:[],notifications_read:false,history:[],
 va_assessment_completed:false,
 overview:{overall:0,critical_gaps:0,hours:0,courses_completed:0,categories:[]},
 recommendations:[],courses:[],training_programmes:[],notifications:[]
});

export const DemoProvider=({children})=>{
 const [data,setData]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const [role,setRole]=useState(localStorage.getItem('sankh-role')||'');
 const refresh=useCallback(async()=>{try{const r=await api.get('/state');const next=normalizeState(r.data);setData(next);setError('');return next;}catch(e){const local=normalizeState(fallbackState(role||'employee'));setData(local);setError('');return local;}finally{setLoading(false);}},[role]);
 useEffect(()=>{refresh().catch(()=>{});},[refresh]);
 const login=async (next,registration={})=>{
  setRole(next);
  localStorage.setItem('sankh-role',next);
  if(registration.name||registration.designation){
    localStorage.setItem('sankh-registration',JSON.stringify(registration));
  }
  try{
    if(registration.name){
      await api.post('/professionals/register',{
        name: registration.name,
        designation: registration.designation || 'Deputy Director',
        department: registration.department || 'Labour Statistics',
        domain: registration.domain || registration.department || 'Labour Statistics',
        experience: registration.experience || 8,
        email: registration.email || 'demo.officer@example.gov.in',
        workspace: next
      });
    } else {
      await api.post('/auth/demo',{role:next});
    }
    await refresh();
  }catch(e){
    setData(normalizeState(fallbackState(next)));
    setLoading(false);
    setError('');
  }
 };
 const logout=async()=>{
  try{await api.post('/auth/logout');}catch{}
  setRole('');
  localStorage.removeItem('sankh-role');
  localStorage.removeItem('sankh-registration');
 };
 const act=async(fn,message)=>{try{const result=await fn();await refresh();if(message)toast.success(message);return result.data;}catch(e){toast.error(apiError(e));throw e;}};
 return <DemoContext.Provider value={{data,loading,error,refresh,role,login,logout,act,assessed: data?.va_assessment_completed}}>{children}</DemoContext.Provider>;
};
export const useDemo=()=>useContext(DemoContext);