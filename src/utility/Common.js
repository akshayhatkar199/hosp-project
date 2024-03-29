import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportPDFData(pageTitle, headings, tableData) {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);

    const title = pageTitle;
    const headers = headings;
    const tdata = tableData;

    let content = {
        startY: 50,
        head: headers,
        body: tdata
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(title + '.pdf');
}
