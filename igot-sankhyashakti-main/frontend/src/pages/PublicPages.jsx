import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChartNoAxesCombined, GraduationCap, LockKeyhole, Mail, ShieldCheck, Users, Network, Target, BookOpen, ClipboardCheck, TrendingUp, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Brand, Badge, Btn, Modal, ThemeToggle } from '../components/Common';
import { useDemo } from '../context/DemoContext';
import { roleHome } from '../components/Layout';
import { toast } from 'sonner';

export const GOV_IMAGE = 'https://images.unsplash.com/photo-1666272506564-f9a8a9f667ab?auto=format&fit=crop&w=2000&q=85';
const PublicHeader = () => <><div className="public-trustbar"><span>A vision for India's statistical workforce</span><span>Official learning environment</span></div><header className="public-header"><Link to="/"><Brand /></Link><nav><a href="/#how-it-works">The Platform</a><a href="/#ecosystem">Our Ecosystem</a><Btn to="/register" small>Register</Btn><Btn to="/login" small>Officer Login <ArrowUpRight size={15} /></Btn></nav></header></>;
const PublicFooter = () => { const [info, setInfo] = useState(''); return <><footer className="public-footer"><div><Brand compact /><p>Data shown on this platform is simulated.<br />Not an official Government of India website.</p></div><div className="footer-links">{['Privacy', 'Security', 'Accessibility', 'Help & Support'].map(item => <button key={item} onClick={() => setInfo(item)}>{item}</button>)}<span>© 2026 · Smart India Hackathon</span></div></footer><Modal open={!!info} onClose={() => setInfo('')} title={info}><p className="body-copy">This is a simulated environment with no live government or SSO connection.</p><Btn onClick={() => setInfo('')}>Understood</Btn></Modal></> };

export default function Landing() {
  return (
    <div className="public-page bg-white min-h-screen text-slate-800">
      <PublicHeader />

      {/* Hero Section */}
      <section className="landing-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(242,248,253,.97) 0%,rgba(242,248,253,.91) 36%,rgba(242,248,253,.20) 75%),url(${GOV_IMAGE})` }}>
        <div className="landing-hero-content">
          <Badge tone="blue">COMPETENCY INTELLIGENCE FOR A VIKSIT BHARAT</Badge>
          <div className="hero-product">iGOT Sankhyashakti</div>
          <h1>Empowering India's<br />Statistical Workforce<br /><span>with AI.</span></h1>
          <p>Personalized competency intelligence, learning recommendations and workforce analytics for the evolving Official Statistical System.</p>
          <div className="hero-actions">
            <Btn to="/login">Explore Platform <ArrowRight size={17} /></Btn>
            <a href="#how-it-works">Discover the approach <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>

      {/* Process / Competency Journey Flow Bar */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">
          <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            {/* 1. Your Role */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#eef4f9] text-[#2b6cb0]">
                <GraduationCap size={19} />
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">Your Role</span>
            </div>
            <ArrowRight size={15} className="text-slate-300 shrink-0 hidden md:block" />

            {/* 2. Competencies */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#eef4f9] text-[#2b6cb0]">
                <Network size={19} />
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">Competencies</span>
            </div>
            <ArrowRight size={15} className="text-slate-300 shrink-0 hidden md:block" />

            {/* 3. Skill Gaps */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#fff3e6] text-[#c38c44]">
                <Target size={19} />
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">Skill Gaps</span>
            </div>
            <ArrowRight size={15} className="text-slate-300 shrink-0 hidden md:block" />

            {/* 4. Learning */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#eef4f9] text-[#38709d]">
                <BookOpen size={19} />
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">Learning</span>
            </div>
            <ArrowRight size={15} className="text-slate-300 shrink-0 hidden md:block" />

            {/* 5. Assessment */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#eef4f9] text-[#38709d]">
                <ClipboardCheck size={19} />
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">Assessment</span>
            </div>
            <ArrowRight size={15} className="text-slate-300 shrink-0 hidden md:block" />

            {/* 6. Improvement */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#e9f3ed] text-[#3b8771]">
                <TrendingUp size={19} />
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">Improvement</span>
            </div>
          </div>
        </div>
      </div>

      {/* From Potential to Performance (Numbered Steps) */}
      <section id="how-it-works" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-3">
              FROM POTENTIAL TO PERFORMANCE
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#163959] tracking-tight mb-3">
              A clear path to a more capable workforce.
            </h2>
            <p className="text-sm text-slate-500">
              Powered by competency-based learning principles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {/* 01 */}
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-[#bdcbd7] font-normal border-b border-slate-200 pb-3 mb-4">
                01
              </span>
              <h3 className="text-sm font-bold text-[#163959] mb-2">
                Understand your role
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your responsibilities become a clear, role-aligned competency profile.
              </p>
            </div>

            {/* 02 */}
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-[#bdcbd7] font-normal border-b border-slate-200 pb-3 mb-4">
                02
              </span>
              <h3 className="text-sm font-bold text-[#163959] mb-2">
                Assess your competencies
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Build a current picture of your statistical, technical and behavioural skills.
              </p>
            </div>

            {/* 03 */}
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-[#bdcbd7] font-normal border-b border-slate-200 pb-3 mb-4">
                03
              </span>
              <h3 className="text-sm font-bold text-[#163959] mb-2">
                Discover the gaps
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Understand where you stand and why each priority matters.
              </p>
            </div>

            {/* 04 */}
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-[#bdcbd7] font-normal border-b border-slate-200 pb-3 mb-4">
                04
              </span>
              <h3 className="text-sm font-bold text-[#163959] mb-2">
                Learn with purpose
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Follow a personalized path to relevant iGOT and NSSTA programmes.
              </p>
            </div>

            {/* 05 */}
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-[#bdcbd7] font-normal border-b border-slate-200 pb-3 mb-4">
                05
              </span>
              <h3 className="text-sm font-bold text-[#163959] mb-2">
                Measure improvement
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Turn assessment evidence into visible, measurable competency growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* One Connected Ecosystem */}
      <section id="ecosystem" className="bg-[#f8fafc] border-t border-slate-200/80 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">
                ONE CONNECTED ECOSYSTEM
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#163959]">
                Individual growth. Collective capability.
              </h2>
            </div>
            <div className="sm:pt-1">
              <span className="inline-block text-xs text-slate-500 bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-sm font-medium">
                Three demo workspaces
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: For Officials */}
            <div className="bg-white rounded-lg border border-slate-200/90 p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="text-[#1d5c94] mb-5">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#163959] mb-2">
                  For Officials
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8">
                  Understand your competency profile and receive personalized learning recommendations.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#1d5c94] cursor-pointer group hover:text-blue-800">
                <span>Explore workspace</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: For Trainers */}
            <div className="bg-white rounded-lg border border-slate-200/90 p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="text-[#23836b] mb-5">
                  <Users size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#163959] mb-2">
                  For Trainers
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8">
                  Create assessments and understand learner competency performance.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#1d5c94] cursor-pointer group hover:text-blue-800">
                <span>Explore workspace</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: For Administrators */}
            <div className="bg-white rounded-lg border border-slate-200/90 p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="text-[#c5893f] mb-5">
                  <BarChart3 size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#163959] mb-2">
                  For Administrators
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8">
                  Get organization-wide workforce competency intelligence.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#1d5c94] cursor-pointer group hover:text-blue-800">
                <span>Explore workspace</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

export function Login() { const { login } = useDemo(); const navigate = useNavigate(); const [busy, setBusy] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [show, setShow] = useState(false); const signIn = async role => { setBusy(role); try { await login(role); navigate(roleHome(role)); } finally { setBusy(''); } }; const submit = async event => { event.preventDefault(); if (email.trim().toLowerCase() !== 'adarsh@gov.in' || password !== '111111') { toast.error('Use the provided credentials for this platform.'); return; } setBusy('employee'); try { await login('employee', { name: 'Adarsh', designation: 'Statistical Officer', department: 'Statistical Services' }); navigate('/app/dashboard'); } finally { setBusy(''); } }; return <div className="public-page login-page"><PublicHeader /><main className="login-scene" style={{ backgroundImage: `linear-gradient(90deg,rgba(232,244,253,.25),rgba(232,244,253,.65)),url(${GOV_IMAGE})` }}><section className="login-intro"><Badge tone="blue">SMART INDIA HACKATHON 2026</Badge><h1>Sankhyashakti</h1><h2>Building a skilful statistical workforce<br />for a <em>Viksit Bharat.</em></h2><blockquote>“Better Statistics.<br />Brighter Decisions.<br />Stronger India.”</blockquote></section><section className="login-card"><div className="login-card-title"><span className="login-lock"><LockKeyhole size={22} /></span><h2>Welcome to Sankhyashakti</h2><p>Sign in to continue your learning journey</p></div><form onSubmit={submit}><label htmlFor="email">Official Email / Employee ID</label><div className="input-icon"><Mail size={16} /><input id="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Enter your official email or employee ID" data-testid="login-email" required /></div><label htmlFor="password">Password</label><div className="input-icon"><LockKeyhole size={16} /><input id="password" type={show ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter your password" data-testid="login-password" required /><button type="button" onClick={() => setShow(!show)} aria-label="Show password">{show ? 'Hide' : 'Show'}</button></div><button className="forgot-link" type="button" onClick={() => toast.info('Password recovery is unavailable in demo mode.')}>Forgot password?</button><Btn type="submit" disabled={busy === 'employee'} data-testid="credential-signin">Sign In <ArrowRight size={16} /></Btn></form><div className="login-divider"><span>OR</span></div><Btn secondary onClick={() => toast.info('SSO is not connected in this prototype.')}><ShieldCheck size={17} /> Sign in with SSO <ArrowRight size={15} /></Btn><div className="demo-login-section"><div><strong>Explore the demo environment</strong><Badge tone="orange">DEMO</Badge></div><p>No credentials required. Choose your workspace.</p><div className="demo-login-buttons"><button disabled={!!busy} onClick={() => signIn('employee')}><GraduationCap size={19} /><span>Login as Employee</span><ArrowRight size={14} /></button><button disabled={!!busy} onClick={() => signIn('trainer')}><Users size={19} /><span>NSSTA Officer Login</span><ArrowRight size={14} /></button><button disabled={!!busy} onClick={() => signIn('admin')}><ChartNoAxesCombined size={19} /><span>Login as Admin</span><ArrowRight size={14} /></button></div></div></section></main><PublicFooter /></div> }
