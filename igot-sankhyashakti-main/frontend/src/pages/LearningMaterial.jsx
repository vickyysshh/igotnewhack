import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Printer, BookOpen, Info, ChevronRight, Download, ExternalLink, ArrowRight, Eye } from 'lucide-react';
import { getLearningMaterial } from '../constants/learningMaterials';
import { Badge, Btn, Empty } from '../components/Common';
import '../styles/learning-material.css';

/**
 * LearningMaterial
 * ----------------
 * Renders prototype learning material / PDF document for a specific iGOT course.
 * Accessed at /app/courses/:id/material
 *
 * PROTOTYPE DISCLAIMER: Content is compiled from curriculum standards
 * for role-aligned training demonstration.
 */
export default function LearningMaterial() {
  const { id } = useParams();
  const material = getLearningMaterial(id);
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' | 'notes'

  if (!material) {
    return (
      <Empty
        title="Learning material not available"
        text="This course does not have prototype learning material attached yet."
      />
    );
  }

  const pdfUrl = material.pdfUrl || `/materials/${id}.pdf`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="lm-page page-enter">
      {/* Back navigation */}
      <Link className="back-link lm-back" to={`/app/courses/${id}`} data-testid="back-to-course">
        <ArrowLeft size={16} /> Back to Course
      </Link>

      {/* Header */}
      <div className="lm-header">
        <div className="lm-header-left">
          <div className="lm-icon-wrap">
            <FileText size={26} strokeWidth={1.4} />
          </div>
          <div>
            <div className="lm-eyebrow">OFFICIAL PROTOTYPE LEARNING MATERIAL</div>
            <h1 className="lm-title" data-testid="lm-title">{material.title}</h1>
            <div className="lm-meta">
              <span>{material.domain}</span>
              <span className="lm-sep">·</span>
              <span>{material.level}</span>
              <span className="lm-sep">·</span>
              <span>{material.duration}</span>
              <span className="lm-sep">·</span>
              <span>{material.provider}</span>
            </div>
          </div>
        </div>
        <div className="lm-header-right">
          <Badge tone="orange" testId="lm-prototype-badge">
            <Info size={12} /> Prototype Material
          </Badge>
          <div className="lm-header-actions">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lm-header-btn"
              data-testid="lm-open-pdf-btn"
              title="Open PDF in new tab"
            >
              <ExternalLink size={14} /> Open PDF
            </a>
            <a
              href={pdfUrl}
              download={`${id}_learning_material.pdf`}
              className="lm-header-btn"
              data-testid="lm-download-pdf-btn"
              title="Download PDF document"
            >
              <Download size={14} /> Download
            </a>
            <button
              className="lm-header-btn"
              onClick={handlePrint}
              data-testid="lm-print-btn"
              title="Print document"
            >
              <Printer size={14} /> Print
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="lm-disclaimer" data-testid="lm-disclaimer">
        <Info size={14} />
        <span>
          This is <strong>prototype learning material</strong> compiled from curriculum standards for demonstration purposes.
          Official document: <strong>{id}.pdf</strong> · {material.version || 'Prototype v1.0'}
        </span>
      </div>

      {/* View Switcher Tabs */}
      <div className="lm-tabs" data-testid="lm-tabs">
        <button
          className={`lm-tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
          onClick={() => setActiveTab('pdf')}
          data-testid="tab-pdf-viewer"
        >
          <FileText size={15} /> PDF Document Viewer
        </button>
        <button
          className={`lm-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
          data-testid="tab-structured-notes"
        >
          <BookOpen size={15} /> Structured Study Notes & Outline
        </button>
      </div>

      {/* Tab 1: PDF Viewer */}
      {activeTab === 'pdf' && (
        <div className="lm-viewer-card" data-testid="lm-pdf-viewer-card">
          <div className="lm-viewer-topbar">
            <div className="lm-viewer-info">
              <FileText size={15} />
              <span>Document: <strong>{id}.pdf</strong> ({material.title})</span>
            </div>
            <div className="lm-viewer-links">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lm-link-action"
                data-testid="lm-viewer-fullscreen"
              >
                <ExternalLink size={13} /> Fullscreen
              </a>
              <a
                href={pdfUrl}
                download={`${id}_learning_material.pdf`}
                className="lm-link-action"
                data-testid="lm-viewer-download"
              >
                <Download size={13} /> Save PDF
              </a>
            </div>
          </div>
          <div className="lm-iframe-wrapper">
            <iframe
              src={`${pdfUrl}#view=FitH`}
              title={`PDF Learning Material for ${material.title}`}
              className="lm-pdf-iframe"
              data-testid="lm-pdf-iframe"
              width="100%"
              height="780px"
            />
          </div>
          <div className="lm-viewer-fallback">
            <small>
              Can’t see the PDF?{' '}
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                Click here to view directly in your browser
              </a>{' '}
              or switch to the <strong>Structured Study Notes</strong> tab above.
            </small>
          </div>
        </div>
      )}

      {/* Tab 2: Structured Notes */}
      {activeTab === 'notes' && (
        <>
          {/* Table of Contents */}
          <div className="lm-toc" data-testid="lm-toc">
            <div className="lm-toc-title">
              <BookOpen size={14} /> Table of Contents
            </div>
            <ol className="lm-toc-list">
              {material.sections.map((section, i) => (
                <li key={i}>
                  <a href={`#lm-section-${i}`} className="lm-toc-link">
                    <ChevronRight size={12} />
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Content Sections */}
          <div className="lm-body" data-testid="lm-body">
            {material.sections.map((section, i) => (
              <section key={i} id={`lm-section-${i}`} className="lm-section">
                <h2 className="lm-section-heading">{section.heading}</h2>

                {/* Plain content block */}
                {section.content && (
                  <div
                    className="lm-content-block"
                    dangerouslySetInnerHTML={{ __html: formatContent(section.content) }}
                    data-testid={`lm-section-content-${i}`}
                  />
                )}

                {/* Subsections */}
                {section.subsections && (
                  <div className="lm-subsections">
                    {section.subsections.map((sub, j) => (
                      <div key={j} className="lm-subsection">
                        <h3 className="lm-subsection-title">{sub.title}</h3>
                        <div
                          className="lm-content-block"
                          dangerouslySetInnerHTML={{ __html: formatContent(sub.body) }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </>
      )}

      {/* Footer nav */}
      <div className="lm-footer-nav">
        <Btn secondary to={`/app/courses/${id}`} data-testid="lm-back-btn">
          <ArrowLeft size={15} /> Back to Course
        </Btn>
        <Btn to={`/app/assessments?competency=${encodeURIComponent(material.domain)}`} data-testid="lm-take-assessment">
          Take Competency Assessment <ArrowRight size={15} />
        </Btn>
      </div>
    </div>
  );
}

/**
 * Minimal safe formatter: converts Markdown-like syntax to HTML.
 * Only handles bold (**), newlines, and Markdown-style tables.
 * No external dependencies.
 */
function formatContent(text) {
  if (!text) return '';

  if (text.includes('|') && text.split('\n').some(l => l.trim().startsWith('|'))) {
    return formatMixed(text);
  }

  return textToHtml(text);
}

function textToHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) return `<li>${trimmed.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</li>`;
      if (trimmed === '') return '<br/>';
      return `<p>${trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`;
    })
    .join('')
    .replace(/<br\/>(<br\/>)+/g, '<br/>')
    .replace(/(<li>.*<\/li>)+/g, match => `<ul class="lm-list">${match}</ul>`);
}

function formatMixed(text) {
  const lines = text.split('\n');
  let html = '';
  let tableLines = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('|')) {
      inTable = true;
      tableLines.push(trimmed);
    } else {
      if (inTable) {
        html += buildTable(tableLines);
        tableLines = [];
        inTable = false;
      }
      if (trimmed === '') {
        html += '<br/>';
      } else {
        html += `<p>${trimmed
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`;
      }
    }
  }
  if (tableLines.length) html += buildTable(tableLines);
  return html;
}

function buildTable(lines) {
  const rows = lines.filter(l => !/^\|[-\s|]+\|$/.test(l));
  if (!rows.length) return '';
  const [header, ...body] = rows;
  const cells = r => r.split('|').filter((_, i, a) => i > 0 && i < a.length - 1);
  return `<div class="lm-table-wrap"><table class="lm-table">
    <thead><tr>${cells(header).map(c => `<th>${c.trim()}</th>`).join('')}</tr></thead>
    <tbody>${body.map(r => `<tr>${cells(r).map(c => `<td>${c.trim()}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}
