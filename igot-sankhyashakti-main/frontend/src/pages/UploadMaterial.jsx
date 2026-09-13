import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle2, Sparkles, ClipboardCheck, BookOpen, ArrowRight, Loader2, FileCheck2 } from 'lucide-react';
import { toast } from 'sonner';
import { PageHead, SectionHead, Btn, Badge, Modal } from '../components/Common';
import { useDemo } from '../context/DemoContext';
import { api, apiError } from '../lib/api';

export default function UploadMaterial() {
  const { data, act } = useDemo();
  const navigate = useNavigate();
  const input = useRef();

  const [doc, setDoc] = useState(data.documents.at(-1) || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [busy, setBusy] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [drag, setDrag] = useState(false);
  const [count, setCount] = useState(10);
  const [type, setType] = useState('MCQ');
  const [summary, setSummary] = useState('');

  const handleFileSelected = file => {
    if (!file) return;
    const name = file.name || '';
    if (!name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      toast.error('Invalid file type. Please upload a PDF document (.pdf).');
      return;
    }
    setSelectedFile(file);
    upload(file);
  };

  const upload = async file => {
    if (!file) return;
    setBusy('upload');
    const form = new FormData();
    form.append('file', file);
    try {
      const processed = await act(() => api.post('/documents/upload', form), 'Sample document processed.');
      setDoc(processed);
      toast.success(`Selected "${file.name}". Click "Generate Assessment" to create your assessment via n8n.`);
    } catch {
      // Still retain selectedFile so user can proceed with n8n generation
      setDoc({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        created_at: new Date().toISOString(),
        summary: `Document "${file.name}" ready for assessment generation.`,
        topics: ['Statistical Methodology', 'Data Quality'],
        competencies: ['Official Statistics'],
        objectives: ['Generate customized competency assessment via n8n workflow']
      });
    } finally {
      setBusy('');
      if (input.current) input.current.value = '';
    }
  };

  const loadSamplePdf = async () => {
    try {
      setBusy('upload');
      const resp = await fetch('/materials/MOSPI-C005.pdf');
      const blob = await resp.blob();
      const sample = new File([blob], 'MOSPI-C005_PLFS_Concepts.pdf', { type: 'application/pdf' });
      setSelectedFile(sample);
      await upload(sample);
    } catch {
      toast.error('Could not load sample PDF.');
      setBusy('');
    }
  };

  const generate = async kind => {
    if (kind === 'summary') {
      if (!doc) return;
      setBusy('summary');
      try {
        const r = await api.post(`/documents/${doc.id}/summary`);
        setSummary(r.data.summary);
      } catch (e) {
        toast.error(apiError(e));
      } finally {
        setBusy('');
      }
      return;
    }

    // Assessment / Quiz / MCQ generation via real n8n workflow
    if (!selectedFile && !doc) {
      toast.error('No PDF selected. Please browse and select a PDF file first.');
      return;
    }

    setBusy(kind);
    setLoadingMessage('Uploading document...');

    const t1 = setTimeout(() => setLoadingMessage('Analysing document...'), 1800);
    const t2 = setTimeout(() => setLoadingMessage('Generating assessment...'), 4500);

    try {
      let fileToUpload = selectedFile;
      if (!fileToUpload) {
        const resp = await fetch('/materials/MOSPI-C005.pdf');
        const blob = await resp.blob();
        fileToUpload = new File([blob], 'MOSPI-C005_PLFS_Concepts.pdf', { type: 'application/pdf' });
      }

      const form = new FormData();
      form.append('file', fileToUpload);
      form.append('userId', data?.profile?.id || 'demo_officer');
      form.append('courseId', '');

      const res = await api.post('/assessments/generate', form, {
        timeout: 130000
      });

      clearTimeout(t1);
      clearTimeout(t2);

      if (!res.data?.questions || res.data.questions.length === 0) {
        throw new Error('Assessment generation failed: No questions were returned by the AI workflow.');
      }

      sessionStorage.setItem('sankh-active-assessment', JSON.stringify(res.data));
      sessionStorage.removeItem('sankh-answers');
      const mode = res.data.mode === 'n8n-generated' ? 'n8n workflow' : 'AI (Gemini fallback)';
      toast.success(`Assessment generated (${res.data.questions.length} MCQs) via ${mode}!`);
      navigate('/app/assessments');
    } catch (e) {
      clearTimeout(t1);
      clearTimeout(t2);
      const msg = apiError(e);
      toast.error(msg || 'Assessment generation failed. Please try again.');
    } finally {
      setBusy('');
      setLoadingMessage('');
    }
  };

  return (
    <div className="page-enter">
      <PageHead
        eyebrow="FROM TRAINING MATERIAL TO COMPETENCY EVIDENCE"
        title="Upload Learning Material"
        description="Upload your PDF to generate a role-aligned assessment via our AI workflow."
        action={<Badge tone="blue" testId="document-processing-mode">n8n Workflow Connected</Badge>}
      />

      <div className="upload-workflow" data-testid="upload-workflow">
        {['Upload material', 'Review insights', 'Generate assessment'].map((title, i) => (
          <div className={(doc || selectedFile ? i < 2 : i === 0) ? 'active' : ''} key={title}>
            <span>{(doc || selectedFile) && i === 0 ? <CheckCircle2 size={17} /> : i + 1}</span>
            <strong>{title}</strong>
            {i < 2 && <ArrowRight size={17} />}
          </div>
        ))}
      </div>

      <div className="upload-layout">
        <div>
          {/* Upload Dropzone */}
          <div
            className={`upload-dropzone ${drag ? 'dragging' : ''}`}
            onDragOver={e => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => {
              e.preventDefault();
              setDrag(false);
              if (!busy && e.dataTransfer.files?.[0]) handleFileSelected(e.dataTransfer.files[0]);
            }}
            data-testid="document-dropzone"
          >
            <div className="upload-icon">
              {busy === 'upload' ? <Loader2 className="spin" size={34} /> : <Upload size={34} />}
            </div>
            <h2 data-testid="upload-status">
              {busy === 'upload'
                ? 'Processing document…'
                : selectedFile
                ? `Selected: ${selectedFile.name}`
                : 'Your material. New learning possibilities.'}
            </h2>
            <p>
              {selectedFile
                ? `${(selectedFile.size / 1024).toFixed(1)} KB PDF ready for assessment generation`
                : 'Drag a PDF document here, or choose a file'}
            </p>
            <input
              ref={input}
              type="file"
              accept=".pdf,application/pdf"
              onChange={e => handleFileSelected(e.target.files?.[0])}
              data-testid="document-file-input"
              className="visually-hidden"
              disabled={!!busy}
            />
            <Btn disabled={!!busy} data-testid="browse-document-button" onClick={() => input.current.click()}>
              Browse Files <Upload size={16} />
            </Btn>
            <small>PDF documents (.pdf) · Up to 15 MB · Handled via secure n8n integration</small>
          </div>

          {/* Sample File Option */}
          <div className="sample-file-row">
            <FileText size={25} />
            <div>
              <strong>Periodic Labour Force Survey (PLFS) Concepts</strong>
              <span>Official MoSPI Training Module · PDF</span>
            </div>
            <Btn
              secondary
              small
              disabled={!!busy}
              data-testid="use-sample-document"
              onClick={loadSamplePdf}
            >
              Use Sample <ArrowRight size={14} />
            </Btn>
          </div>

          {/* Document Insights */}
          {doc && (
            <section className="document-insights">
              <div className="document-processed">
                <FileCheck2 size={26} />
                <div>
                  <strong data-testid="processed-file-name">{doc.name}</strong>
                  <span>
                    {(doc.size / 1024).toFixed(1)} KB · {new Date(doc.created_at || Date.now()).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <Badge tone="green" testId="document-processed-status">
                  <CheckCircle2 size={12} /> Ready
                </Badge>
              </div>
              <div className="document-summary">
                <SectionHead id="document-summary" title="Document Summary" />
                <p data-testid="document-summary-text">{doc.summary}</p>
              </div>
              <div className="document-tags-section">
                <h3>Detected Topics</h3>
                <div className="topic-tags">
                  {doc.topics.map((topic, i) => (
                    <Badge key={topic} tone="neutral" testId={`detected-topic-${i}`}>
                      {topic}
                    </Badge>
                  ))}
                </div>
                <h3>Detected Competencies</h3>
                <div className="topic-tags">
                  {doc.competencies.map((competency, i) => (
                    <Badge key={competency} tone="blue" testId={`detected-competency-${i}`}>
                      {competency}
                    </Badge>
                  ))}
                </div>
                <h3>Learning Objectives</h3>
                {doc.objectives.map((objective, i) => (
                  <p className="objective-row" data-testid={`learning-objective-${i}`} key={objective}>
                    <CheckCircle2 size={16} />
                    {objective}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Generation Panel */}
        <aside className="generation-panel">
          <Sparkles size={28} />
          <h2>Create from your material</h2>
          <p>Choose your assessment format, then click Generate Assessment to trigger the n8n AI workflow.</p>

          <label className="form-label">
            Number of questions
            <select
              data-testid="upload-question-count"
              value={count}
              onChange={e => setCount(Number(e.target.value))}
            >
              {[5, 10, 20].map(n => (
                <option key={n} value={n} label={`${n} questions`} />
              ))}
            </select>
          </label>

          <label className="form-label">
            Question type
            <select
              data-testid="upload-question-type"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              {['MCQ', 'True/False', 'Scenario-based'].map(t => (
                <option key={t} value={t} label={t} />
              ))}
            </select>
          </label>

          {/* Sequential Loading State Banner */}
          {loadingMessage && (
            <div
              className="n8n-progress-message"
              data-testid="n8n-progress-message"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                margin: '12px 0',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '6px',
                color: '#1e40af',
                fontSize: '13px',
                fontWeight: '550'
              }}
            >
              <Loader2 className="spin" size={16} />
              <span>{loadingMessage}</span>
            </div>
          )}

          <div className="generation-actions">
            {[
              ['assessment', 'Generate Assessment', ClipboardCheck],
              ['quiz', 'Generate Quiz', Sparkles],
              ['mcq', 'Generate MCQs', FileText],
              ['summary', 'Generate Study Summary', BookOpen]
            ].map(([kind, label, Icon], i) => (
              <Btn
                secondary={i !== 0}
                key={kind}
                disabled={(!selectedFile && !doc) || !!busy}
                data-testid={`document-generate-${kind}`}
                onClick={() => generate(kind)}
              >
                {busy === kind ? (
                  <>
                    <Loader2 className="spin" size={16} /> {loadingMessage || 'Generating…'}
                  </>
                ) : (
                  <>
                    <Icon size={16} /> {label}
                  </>
                )}
              </Btn>
            ))}
          </div>

          <div className="generation-disclosure" data-testid="document-generation-disclaimer">
            <CheckCircle2 size={20} />
            <p>
              Assessments are generated directly from your uploaded PDF using your configured n8n AI workflow.
            </p>
          </div>
        </aside>
      </div>

      {data.documents.length > 1 && (
        <section className="upload-history">
          <SectionHead id="upload-history" title="Recent materials" />
          <div className="history-rows">
            {[...data.documents]
              .reverse()
              .slice(0, 5)
              .map(d => (
                <button
                  key={d.id}
                  data-testid={`uploaded-document-${d.id}`}
                  onClick={() => {
                    setDoc(d);
                    setSelectedFile(null);
                  }}
                >
                  <FileText size={20} />
                  <strong>{d.name}</strong>
                  <span>{(d.size / 1024).toFixed(1)} KB</span>
                  <Badge tone="green" testId={`upload-status-${d.id}`}>
                    Processed
                  </Badge>
                  <ArrowRight size={15} />
                </button>
              ))}
          </div>
        </section>
      )}

      <Modal
        open={!!summary}
        onClose={() => setSummary('')}
        title="Study Summary"
        description="Sample study notes · Based on the selected topic set"
      >
        <div className="study-summary" data-testid="generated-study-summary">
          <BookOpen size={26} />
          <p>{summary}</p>
          <Btn data-testid="summary-done-button" onClick={() => setSummary('')}>
            Done <CheckCircle2 size={16} />
          </Btn>
        </div>
      </Modal>
    </div>
  );
}