// Minimal valid single-page PDF placeholder so the Download Resume button works out of the box.
const fs = require("fs");
const path = require("path");

const text = "Nisha Rani Barman - Resume placeholder. Replace this file at public/resume/Nisha_Rani_Barman_Resume.pdf with your real resume.";

const content = `BT /F1 14 Tf 50 750 Td (${text.replace(/[()\\]/g, "")}) Tj ET`;

const objects = [
  "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
  "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
  "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj",
  "4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
  `5 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj`,
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (const obj of objects) {
  offsets.push(pdf.length);
  pdf += obj + "\n";
}
const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i++) {
  pdf += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
}
pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

const out = path.join(__dirname, "..", "public/resume/Nisha_Rani_Barman_Resume.pdf");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, pdf, "latin1");
console.log("wrote public/resume/Nisha_Rani_Barman_Resume.pdf");
