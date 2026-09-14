import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Brand, Btn, Badge } from '../components/Common';
import { useDemo } from '../context/DemoContext';
import { roleHome } from '../components/Layout';

const organisations = {
  'Ministry of Statistics & Programme Implementation': ['National Statistical Office (NSO)', 'National Statistical Systems Training Academy (NSSTA)', 'Data Informatics & Innovation Division', 'National Accounts Division', 'Social Statistics Division', 'Price Statistics Division', 'Economic Statistics Division', 'Field Operations Division', 'Subordinate Statistical Service', 'Other'],
  'Ministry of Agriculture & Farmers Welfare': ['Directorate of Economics & Statistics', 'Department of Agriculture & Farmers Welfare', 'Indian Council of Agricultural Research', 'Other'],
  'Ministry of Labour & Employment': ['Labour Bureau', 'Directorate General of Employment', 'Employees\u2019 State Insurance Corporation', 'Other'],
  'Ministry of Finance': ['Department of Economic Affairs', 'Department of Expenditure', 'Department of Revenue', 'Other'],
  'Ministry of Health & Family Welfare': ['Directorate General of Health Services', 'National Health Authority', 'Indian Council of Medical Research', 'Other'],
  'Ministry of Education': ['Department of School Education & Literacy', 'Department of Higher Education', 'National Council of Educational Research and Training', 'Other'],
  'Ministry of Commerce & Industry': ['Department of Commerce', 'Department for Promotion of Industry and Internal Trade', 'Other'],
  'Ministry of Rural Development': ['Department of Rural Development', 'Department of Land Resources', 'Other'],
  'Ministry of Home Affairs': ['Registrar General & Census Commissioner', 'National Disaster Management Authority', 'Other'],
  Other: ['Other']
};
const ministries = Object.keys(organisations);
const designations = ['Senior Statistical Officer', 'Junior Statistical Officer', 'Statistical Officer', 'Statistical Investigator Grade I', 'Statistical Investigator Grade II', 'Director', 'Joint Director', 'Deputy Director', 'Assistant Director', 'Other'];
const domains = ['National Accounts', 'Labour Statistics', 'Price Statistics', 'Agricultural Statistics', 'Industrial Statistics', 'Social Statistics', 'Economic Statistics', 'Survey Methodology', 'SDG Indicators', 'Data Quality & Standards', 'Data Dissemination', 'Data Science & Analytics', 'Other'];
const experience = ['0\u20132 years', '3\u20135 years', '6\u201310 years', '11\u201315 years', '16\u201320 years', '20+ years'];

const benefits = [
  {
    title: 'Role-based learning',
    desc: 'Courses fit your ministry and role',
    bg: '#dbeafe', color: '#1d4ed8',
    icon: (
      <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2L2 7l8 5 8-5-8-5z"/><path d="M2 12l8 5 8-5"/><path d="M2 17l8 5 8-5"/>
      </svg>
    )
  },
  {
    title: 'Skill gap insights',
    desc: 'Know what to learn next',
    bg: '#ede9fe', color: '#7c3aed',
    icon: (
      <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7"/><path d="M10 6v4l2.5 2.5"/>
      </svg>
    )
  },
  {
    title: 'Relevant resources',
    desc: 'Courses, tools and reading material',
    bg: '#fef9c3', color: '#ca8a04',
    icon: (
      <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="12" height="16" rx="1.5"/><path d="M7 6h6M7 9h6M7 12h4"/>
      </svg>
    )
  },
  {
    title: 'Stronger impact',
    desc: 'Build skills for a data-driven governance',
    bg: '#dcfce7', color: '#16a34a',
    icon: (
      <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18l4.5-7L10 14l4-9 4 13"/>
      </svg>
    )
  },
];

export default function Register() {
  const navigate = useNavigate();
  const { login } = useDemo();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ ministry: '', organisation: '', designation: '', domain: '', experience: '', name: '', email: '', password: '', workspace: 'employee' });
  const [busy, setBusy] = useState(false);
  const availableOrganisations = useMemo(() => form.ministry ? organisations[form.ministry] : [], [form.ministry]);
  const update = (key, value) => setForm(previous => ({ ...previous, [key]: value, ...(key === 'ministry' ? { organisation: '' } : {}) }));
  const submit = async event => { event.preventDefault(); if (step === 1) { setStep(2); return; } const safeWorkspace = form.workspace || 'employee'; const targetPath = roleHome(safeWorkspace); setBusy(true); try { await login(safeWorkspace, { name: form.name || 'New User', designation: form.designation || 'Statistical Officer', department: form.organisation || form.ministry || 'Official Statistical System', email: form.email, domain: form.domain, experience: form.experience }); navigate(targetPath, { replace: true }); } finally { setBusy(false); } };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>

      {/* ── TOP HEADER ── */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '64px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
        <Link to="/" data-testid="register-brand-link" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          {/* Emblem */}
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a5f, #1d5db5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(29,93,181,0.25)' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#1e3a5f', letterSpacing: '0.06em', lineHeight: 1.2 }}>iGOT SANKHYASHAKTI</div>
            <div style={{ fontSize: '9px', color: '#64748b', lineHeight: 1.4 }}>Ministry of Statistics &amp; Programme Implementation · Government of India</div>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Already have an account?</span>
          <Link to="/login" data-testid="register-login-link" style={{ textDecoration: 'none' }}>
            <button style={{ font: 'inherit', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#1d5db5', border: '1.5px solid #1d5db5', padding: '7px 16px', borderRadius: '7px', background: 'transparent', cursor: 'pointer', transition: 'background .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Login <ArrowRight size={12} />
            </button>
          </Link>
        </div>
      </header>

      {/* ── MAIN ── */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* ══ LEFT HERO PANEL ══ */}
        <aside style={{
          width: '44%', flexShrink: 0,
          background: 'linear-gradient(155deg, #0c1f3f 0%, #0f2d5e 30%, #1245a8 70%, #1a6fbe 100%)',
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '48px 48px 40px',
        }}>

          {/* Decorative blobs */}
          <div style={{ position: 'absolute', width: '340px', height: '340px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', top: '-80px', left: '-80px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', top: '120px', right: '-70px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', bottom: '-60px', left: '-30px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(249,115,22,0.08)', bottom: '30px', right: '-40px', pointerEvents: 'none' }} />
          {/* Subtle grid pattern */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

          {/* ─ TOP SECTION ─ */}
          <div style={{ position: 'relative', zIndex: 1 }}>

            {/* Pill label */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '99px', padding: '5px 14px', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(186,230,253,0.9)' }}>LEARN · UPSKILL · SERVE · GROW</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: '38px', fontWeight: 900, lineHeight: 1.15, color: '#ffffff', margin: '0 0 10px' }}>
              Build a<br />
              <span style={{ color: '#e2f0ff' }}>Stronger, Smarter</span><br />
              <span style={{
                background: 'linear-gradient(90deg, #fb923c 0%, #fef3c7 40%, #6ee7b7 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>Public India</span>
            </h1>

            {/* Tricolor bar */}
            <div style={{ display: 'flex', width: '64px', height: '3px', borderRadius: '99px', overflow: 'hidden', marginBottom: '20px', gap: '2px' }}>
              <div style={{ flex: 1, background: '#f97316' }} />
              <div style={{ flex: 1, background: '#ffffff' }} />
              <div style={{ flex: 1, background: '#22c55e' }} />
            </div>

            {/* Supporting copy */}
            <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'rgba(186,230,253,0.85)', maxWidth: '290px', margin: '0 0 36px' }}>
              Create your profile to get personalized learning paths, competency mapped courses and relevant assessments.
            </p>

            {/* ─ BENEFIT ITEMS ─ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {benefits.map(({ title, desc, bg, color, icon }, idx) => (
                <div key={title} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '14px 0',
                  borderBottom: idx < benefits.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}>
                  {/* Pastel circular icon */}
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: bg, color, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 2px 8px ${color}33`,
                  }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', lineHeight: 1.3 }}>{title}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(186,230,253,0.68)', marginTop: '2px', lineHeight: 1.4 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─ BOTTOM BRANDING ─ */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Glassmorphism stat card */}
            <div style={{
              background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px',
              padding: '16px 20px', marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '18px',
            }}>
              <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.12)', paddingRight: '18px' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>12K+</div>
                <div style={{ fontSize: '9px', color: 'rgba(186,230,253,0.65)', marginTop: '3px' }}>Officers enrolled</div>
              </div>
              <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.12)', paddingRight: '18px' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#6ee7b7', lineHeight: 1 }}>95%</div>
                <div style={{ fontSize: '9px', color: 'rgba(186,230,253,0.65)', marginTop: '3px' }}>Competency match</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#93c5fd', lineHeight: 1 }}>30+</div>
                <div style={{ fontSize: '9px', color: 'rgba(186,230,253,0.65)', marginTop: '3px' }}>Ministries covered</div>
              </div>
            </div>

            {/* Data for Viksit Bharat + footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(251,191,36,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="#fbbf24" strokeWidth="2">
                    <circle cx="10" cy="10" r="8"/><path d="M10 6v4l3 2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontStyle: 'italic', color: '#fcd34d', fontWeight: 700 }}>Data for</div>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>Viksit Bharat</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(148,163,184,0.5)' }}>
                <span>PEOPLE</span><span style={{ color: 'rgba(148,163,184,0.2)' }}>|</span>
                <span>DATA</span><span style={{ color: 'rgba(148,163,184,0.2)' }}>|</span>
                <span>PROGRESS</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ══ RIGHT PANEL ══ */}
        <main style={{ flex: 1, background: '#f0f4f8', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '44px 32px', overflowY: 'auto' }}>
          <div style={{ width: '100%', maxWidth: '520px' }}>

            {/* Step Progress Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: step >= 1 ? 'linear-gradient(135deg,#1245a8,#1d5db5)' : '#e2e8f0', color: step >= 1 ? '#fff' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, boxShadow: step >= 1 ? '0 3px 10px rgba(29,93,181,.3)' : 'none', transition: 'all .3s' }}>
                  {step > 1 ? <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 8l4 4 7-7"/></svg> : '1'}
                </div>
                <span style={{ fontSize: '10px', marginTop: '6px', fontWeight: 600, color: step >= 1 ? '#1d5db5' : '#94a3b8', whiteSpace: 'nowrap' }}>Professional details</span>
              </div>
              {/* Connector */}
              <div style={{ flex: 1, height: '2px', margin: '0 10px 18px', background: step >= 2 ? 'linear-gradient(90deg,#1245a8,#1d5db5)' : '#e2e8f0', borderRadius: '2px', transition: 'background .3s' }} />
              {/* Step 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: step >= 2 ? 'linear-gradient(135deg,#1245a8,#1d5db5)' : '#e2e8f0', color: step >= 2 ? '#fff' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, boxShadow: step >= 2 ? '0 3px 10px rgba(29,93,181,.3)' : 'none', transition: 'all .3s' }}>2</div>
                <span style={{ fontSize: '10px', marginTop: '6px', fontWeight: 600, color: step >= 2 ? '#1d5db5' : '#94a3b8', whiteSpace: 'nowrap' }}>Review &amp; complete</span>
              </div>
            </div>

            {/* Card */}
            <section className="register-card">
              <div className="register-card-heading">
                <div>
                  <div className="eyebrow">STEP {step} OF 2</div>
                  <h2>{step === 1 ? 'Professional registration' : 'Create your account'}</h2>
                  <p>{step === 1 ? 'Set your ministry and competency mapping details.' : 'Add your account details and choose a workspace.'}</p>
                </div>
              </div>
              <form onSubmit={submit} className="register-form">
                {step === 1 ? <>
                  <label className="form-wide">Ministry / Department<select required value={form.ministry} onChange={event => update('ministry', event.target.value)} data-testid="register-ministry"><option value="">Select ministry / department</option>{ministries.map(ministry => <option key={ministry} value={ministry}>{ministry}</option>)}</select></label>
                  <label className="form-wide">Organisation<select required disabled={!form.ministry} value={form.organisation} onChange={event => update('organisation', event.target.value)} data-testid="register-organisation"><option value="">{form.ministry ? 'Select an organisation' : 'Select a ministry first'}</option>{availableOrganisations.map(organisation => <option key={organisation} value={organisation}>{organisation}</option>)}</select></label>
                  <label>Designation<select required value={form.designation} onChange={event => update('designation', event.target.value)} data-testid="register-designation"><option value="">Select designation</option>{designations.map(designation => <option key={designation} value={designation}>{designation}</option>)}</select></label>
                  <label>Primary Statistical Domain<select required value={form.domain} onChange={event => update('domain', event.target.value)} data-testid="register-domain"><option value="">Select primary domain</option>{domains.map(domain => <option key={domain} value={domain}>{domain}</option>)}</select><span className="field-help">This determines your competency mapping.</span></label>
                  <label className="form-wide">Years of Experience<select required value={form.experience} onChange={event => update('experience', event.target.value)} data-testid="register-experience"><option value="">Select experience range</option>{experience.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
                  {/* Info box */}
                  <div className="form-wide" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(245,158,11,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="10" cy="10" r="8"/><path d="M10 14v-4m0-3h.01" strokeLinecap="round"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e3a5f', marginBottom: '3px' }}>Why is this important?</div>
                      <div style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.6 }}>Your inputs help us personalize your learning journey with the most relevant courses, resources and assessments.</div>
                    </div>
                  </div>
                </> : <>
                  <label className="form-wide">Full name<input required value={form.name} onChange={event => update('name', event.target.value)} placeholder="Enter your full name" data-testid="register-name" /></label>
                  <label>Email address<input required type="email" value={form.email} onChange={event => update('email', event.target.value)} placeholder="name@example.gov.in" data-testid="register-email" /></label>
                  <label>Password<input required minLength="6" type="password" value={form.password} onChange={event => update('password', event.target.value)} placeholder="Create a password" data-testid="register-password" /></label>
                  <label className="form-wide">Workspace<select required value={form.workspace} onChange={event => update('workspace', event.target.value)} data-testid="register-workspace"><option value="employee">Employee workspace</option><option value="trainer">Trainer workspace</option><option value="admin">Admin workspace</option></select></label>
                  {/* Summary */}
                  {(form.ministry || form.designation) && (
                    <div className="form-wide" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Registration summary</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {form.ministry && <div style={{ fontSize: '12px', color: '#334155' }}><span style={{ color: '#94a3b8' }}>Ministry: </span>{form.ministry}</div>}
                        {form.organisation && <div style={{ fontSize: '12px', color: '#334155' }}><span style={{ color: '#94a3b8' }}>Organisation: </span>{form.organisation}</div>}
                        {form.designation && <div style={{ fontSize: '12px', color: '#334155' }}><span style={{ color: '#94a3b8' }}>Designation: </span>{form.designation}</div>}
                        {form.domain && <div style={{ fontSize: '12px', color: '#334155' }}><span style={{ color: '#94a3b8' }}>Domain: </span>{form.domain}</div>}
                      </div>
                    </div>
                  )}
                </>}
                <div className="register-form-actions">
                  {step === 2 && <Btn type="button" secondary onClick={() => setStep(1)} data-testid="register-back">← Back</Btn>}
                  <Btn type="submit" disabled={busy} data-testid="register-submit">{busy ? 'Opening workspace...' : step === 1 ? 'Continue to step 2' : 'Register and open workspace'} <ArrowRight size={15} /></Btn>
                </div>
              </form>
            </section>

            {/* Trust footer */}
            <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '18px', lineHeight: 1.6 }}>
              By registering you agree to our <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>terms</span>. This is a simulated environment — no live government connections.
            </p>
          </div>
        </main>


      </div>
    </div>
  );
}
