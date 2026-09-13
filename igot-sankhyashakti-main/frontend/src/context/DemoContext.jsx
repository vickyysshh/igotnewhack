import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import {api,apiError} from '../lib/api';
import {toast} from 'sonner';
const DemoContext=createContext(null);

// Only supply safe defaults; do NOT inject dummy profile data into real sessions.
const normalizeState=state=>{
 const profile=state?.profile||{};
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
  }
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