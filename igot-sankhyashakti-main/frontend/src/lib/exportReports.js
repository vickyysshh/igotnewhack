// Prepared files are downloaded through native anchors to preserve user activation.
export async function prepareReport(title,rows,format){
  const filename=title.toLowerCase().replaceAll(' ','-');
  const headers=Object.keys(rows[0]||{message:''});
  if(format==='CSV'){
    const safe=value=>{let text=String(value??'');if(/^[=+@-]/.test(text))text="'"+text;return `"${text.replaceAll('"','""')}"`;};
    const content='\ufeff'+[headers,...rows.map(row=>headers.map(h=>row[h]))].map(row=>row.map(safe).join(',')).join('\r\n');
    return {blob:new Blob([content],{type:'text/csv;charset=utf-8'}),name:`${filename}.csv`};
  }
  if(format==='PDF'){
    const {jsPDF}=await import('jspdf');
    const doc=new jsPDF({orientation:'landscape'});
    doc.setTextColor(24,60,100);doc.setFontSize(19);doc.text('iGOT Sankhyashakti',14,18);
    doc.setFontSize(14);doc.text(title,14,29);doc.setTextColor(95,105,115);doc.setFontSize(9);
    doc.text('Prototype / Demonstration Environment | Data shown is simulated.',14,38);
    doc.text(`Generated ${new Date().toLocaleDateString('en-IN')}`,14,44);
    let y=57;const width=265/headers.length;
    const drawHeader=()=>{doc.setFillColor(232,240,248);doc.rect(14,y-5,267,11,'F');doc.setFontSize(9);headers.forEach((h,i)=>doc.text(doc.splitTextToSize(h,width-4),16+i*width,y));y+=12;};
    drawHeader();
    rows.forEach(row=>{
      const lines=headers.map(h=>doc.splitTextToSize(String(row[h]),width-5));
      const height=Math.max(...lines.map(line=>line.length))*4+7;
      if(y+height>192){doc.addPage();y=20;drawHeader();}
      doc.setFontSize(8);lines.forEach((text,i)=>doc.text(text,16+i*width,y));y+=height;
      doc.setDrawColor(225,231,237);doc.line(14,y-3,281,y-3);
    });
    return {blob:doc.output('blob'),name:`${filename}.pdf`};
  }
  const ExcelJS=await import('exceljs');
  const Workbook=ExcelJS.Workbook||ExcelJS.default.Workbook;
  const workbook=new Workbook();workbook.creator='iGOT Sankhyashakti Demo';
  const sheet=workbook.addWorksheet('Simulated Report');
  sheet.addRow([title]);sheet.addRow(['Prototype / Demonstration Environment — simulated data']);sheet.addRow([]);sheet.addRow(headers);
  rows.forEach(row=>sheet.addRow(headers.map(h=>row[h])));
  sheet.columns=headers.map(h=>({width:Math.max(20,Math.min(42,h.length+12))}));
  sheet.getRow(4).font={bold:true,color:{argb:'FFFFFFFF'}};
  sheet.getRow(4).eachCell(cell=>{cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF224F82'}};});
  const buffer=await workbook.xlsx.writeBuffer();
  return {blob:new Blob([buffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),name:`${filename}.xlsx`};
}