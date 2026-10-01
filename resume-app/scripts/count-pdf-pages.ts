import { jsPDF } from 'jspdf';
import { RESUME } from '../src/app/data/resume.data';

const pageWidth = 210;
const pageHeight = 297;
const marginX = 14;
const marginTop = 12;
const marginBottom = 12;
const contentWidth = pageWidth - marginX * 2;

function ensureSpace(doc: InstanceType<typeof jsPDF>, y: number, needed: number): number {
  if (y + needed > pageHeight - marginBottom) {
    doc.addPage();
    return marginTop;
  }
  return y;
}

function drawWrapped(
  doc: InstanceType<typeof jsPDF>,
  text: string,
  y: number,
  fontSize: number,
  lineHeight: number,
): number {
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, contentWidth) as string[];
  for (const _line of lines) {
    y = ensureSpace(doc, y, lineHeight + 0.8);
    y += lineHeight;
  }
  return y;
}

function drawBullet(doc: InstanceType<typeof jsPDF>, text: string, y: number): number {
  const textWidth = contentWidth - 3;
  const lineHeight = 3.9;
  doc.setFontSize(9);
  const lines = doc.splitTextToSize(text, textWidth) as string[];
  const blockHeight = lines.length * lineHeight + 0.8;
  y = ensureSpace(doc, y, blockHeight);
  y += lines.length * lineHeight + 0.8;
  return y;
}

const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
const resume = RESUME;
let y = marginTop;

// Approximate classic header (name + headline + contact + links)
y += 28;
y += 6;
y = drawWrapped(doc, resume.summary, y, 9, 4.1);
y += 3;
y += 6;

for (const job of resume.experience) {
  y = ensureSpace(doc, y, 16);
  y += 4.5;
  y += 4;
  for (const h of job.highlights) {
    y = drawBullet(doc, h, y);
  }
  y += 2.5;
}

y += 1.5;
y += 6;
for (const entry of resume.education) {
  y = ensureSpace(doc, y, 12);
  y += 8;
  if (entry.note) y += 4;
}

y += 1.5;
y += 6;
for (const group of resume.skillGroups) {
  y = ensureSpace(doc, y, 12);
  y += 4;
  y = drawWrapped(doc, group.skills.join(' · '), y, 8, 3.6);
  y += 2;
}

y += 1.5;
y += 6;
y += 16;

console.log(`Estimated Classic PDF pages: ${doc.getNumberOfPages()}`);
console.log(
  `Bullets: ${resume.experience.reduce((n, j) => n + j.highlights.length, 0)} across ${resume.experience.length} jobs`,
);
