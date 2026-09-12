import {useState} from 'react';
import {MapPin,BriefcaseBusiness,Pencil,Save} from 'lucide-react';
import {PageHead,Badge,Btn,SectionHead} from '../components/Common';
import {useDemo} from '../context/DemoContext';
import {api} from '../lib/api';

export default function ProfileSafe(){
 const {data,act}=useDemo();
 const profile=data?.profile||{};
 const name=String(profile.name||'User');
 const [editing,setEditing]=useState(false);
 const [form,setForm]=useState(profile);
 const [busy,setBusy]=useState(false);
 const fields=[['name','Full name'],['designation','Designation'],['department','Department'],['location','Location'],['education','Education'],['expertise','Areas of expertise'],['responsibilities','Current responsibilities']];
 const save=async event=>{event.preventDefault();setBusy(true);try{await act(()=>api.patch('/profile',form),'Your demo profile has been updated.');setEditing(false);}catch{}finally{setBusy(false);}};
 return <div className="page-enter">
  <PageHead eyebrow="YOUR PROFESSIONAL IDENTITY" title="My Profile" description="Your role and experience shape your competency journey." action={!editing&&<Btn secondary icon={Pencil} data-testid="edit-profile-button" onClick={()=>{setForm(profile);setEditing(true);}}>Edit Profile</Btn>}/>
  <div className="profile-identity"><span className="profile-large-avatar">{name.split(/\s+/).slice(0,2).map(part=>part[0]).join('')}</span><div><Badge tone="blue" testId="profile-demo-identity">OFFICER</Badge><h2 data-testid="profile-name">{name}</h2><p data-testid="profile-designation">{profile.designation||'Officer'} · {profile.department||'Labour Statistics'}</p><div><span><MapPin size={14}/>{profile.location||'New Delhi'}</span><span><BriefcaseBusiness size={14}/>{profile.experience||0} years of experience</span></div></div><div className="employee-id"><span>EMPLOYEE ID</span><strong data-testid="employee-id">{profile.id||'EMP-2026-0142'}</strong><Badge tone="green" testId="profile-active-badge">Active profile</Badge></div></div>
  <section className="profile-section"><SectionHead id="profile-details" title="Professional information"/>{editing?<form onSubmit={save} className="profile-form">{fields.map(([key,label])=><label key={key}>{label}<input value={form[key]||''} onChange={event=>setForm({...form,[key]:event.target.value})}/></label>)}<Btn type="submit" disabled={busy} icon={Save}>{busy?'Saving...':'Save changes'}</Btn></form>:<div className="profile-details-grid">{fields.map(([key,label])=><div key={key}><span>{label}</span><strong>{profile[key]||'Not provided'}</strong></div>)}</div>}</section>
 </div>;
}
