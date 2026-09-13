import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { jsPDF } from 'jspdf';
import { LEARNING_MATERIALS } from '../src/constants/learningMaterials.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/materials');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function cleanText(txt) {
  if (!txt) return '';
  return txt
    .replace(/[—–]/g, '-')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/[•]/g, '-')
    .replace(/[·]/g, '|');
}

function generatePDF(courseId, data) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  function checkPageBreak(needed = 30) {
    if (y + needed > pageHeight - margin - 20) {
      doc.addPage();
      y = margin + 25;
      renderHeaderFooter();
    }
  }

  function renderHeaderFooter() {
    const pageCount = doc.internal.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      
      // Header (pages after page 1)
      if (p > 1) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(100, 115, 130);
        doc.text(`iGOT Sankhyashakti | ${data.courseId}: ${data.title}`, margin, 32);
        doc.setDrawColor(218, 227, 237);
        doc.setLineWidth(0.5);
        doc.line(margin, 38, pageWidth - margin, 38);
      }

      // Footer (all pages)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120, 130, 145);
      doc.text('Confidential - Official Statistics Competency Framework (Prototype)', margin, pageHeight - 25);
      doc.text(`Page ${p} of ${pageCount}`, pageWidth - margin, pageHeight - 25, { align: 'right' });
      doc.setDrawColor(218, 227, 237);
      doc.setLineWidth(0.5);
      doc.line(margin, pageHeight - 34, pageWidth - margin, pageHeight - 34);
    }
  }

  // Cover / Header Banner
  doc.setFillColor(24, 43, 73); // Deep Navy
  doc.roundedRect(margin, y, contentWidth, 110, 6, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(245, 158, 11); // Amber
  doc.text(`iGOT KARMAYOGI - MoSPI COMPETENCY MODULE`, margin + 18, y + 26);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  const titleLines = doc.splitTextToSize(cleanText(data.title), contentWidth - 36);
  doc.text(titleLines, margin + 18, y + 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text(`Course ID: ${data.courseId}   |   Domain: ${data.domain}   |   Level: ${data.level}   |   Duration: ${data.duration}`, margin + 18, y + 92);

  y += 125;

  // Disclaimer Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y, contentWidth, 42, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(180, 83, 9); // Amber-700
  doc.text('PROTOTYPE LEARNING MATERIAL NOTICE', margin + 12, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('This learning module is compiled from curriculum standards for role-aligned training demonstration.', margin + 12, y + 30);

  y += 56;

  // Table of contents summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Table of Contents', margin, y);
  y += 16;

  data.sections.forEach((sec, idx) => {
    checkPageBreak(18);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 64, 175);
    doc.text(`${idx + 1}. ${cleanText(sec.heading)}`, margin + 10, y);
    y += 14;
  });

  y += 15;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  // Render Sections
  data.sections.forEach((sec, idx) => {
    checkPageBreak(40);

    // Section Heading
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(`${idx + 1}. ${cleanText(sec.heading)}`, margin, y);
    y += 18;

    // Plain content
    if (sec.content) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      
      const paragraphs = sec.content.split('\n\n');
      paragraphs.forEach(p => {
        const cleaned = cleanText(p.trim());
        if (!cleaned) return;
        const lines = doc.splitTextToSize(cleaned, contentWidth);
        checkPageBreak(lines.length * 13 + 8);
        doc.text(lines, margin, y);
        y += lines.length * 13 + 8;
      });
    }

    // Subsections
    if (sec.subsections) {
      sec.subsections.forEach((sub, subIdx) => {
        checkPageBreak(30);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(30, 41, 59);
        doc.text(`${idx + 1}.${subIdx + 1} ${cleanText(sub.title)}`, margin + 6, y);
        y += 15;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(51, 65, 85);
        const subLines = doc.splitTextToSize(cleanText(sub.body), contentWidth - 12);
        checkPageBreak(subLines.length * 13 + 10);
        doc.text(subLines, margin + 6, y);
        y += subLines.length * 13 + 10;
      });
    }

    y += 12;
  });

  // Finalize header & footers with total page count
  renderHeaderFooter();

  // Save PDF file
  const outPath = path.join(outputDir, `${courseId}.pdf`);
  const pdfBytes = doc.output('arraybuffer');
  fs.writeFileSync(outPath, Buffer.from(pdfBytes));
  console.log(`Generated: ${outPath} (${pdfBytes.byteLength} bytes)`);
}

// Generate for all 6 courses
const courseIds = ['MOSPI-C001', 'MOSPI-C002', 'MOSPI-C003', 'MOSPI-C004', 'MOSPI-C005', 'MOSPI-C006'];
for (const cid of courseIds) {
  if (LEARNING_MATERIALS[cid]) {
    generatePDF(cid, LEARNING_MATERIALS[cid]);
  } else {
    console.warn(`Missing material data for ${cid}`);
  }
}
console.log('All course PDFs generated successfully!');
