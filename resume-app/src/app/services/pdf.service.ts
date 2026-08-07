import { Injectable, signal } from '@angular/core';
import { Resume } from '../models/resume.model';
import { ResumeVersion } from '../models/resume-version';

type JsPdfDoc = import('jspdf').jsPDF;

/**
 * Builds a text PDF for the selected resume version (1 / 2 / 3).
 */
@Injectable({ providedIn: 'root' })
export class PdfService {
  readonly generating = signal(false);

  private readonly pageWidth = 210;
  private readonly pageHeight = 297;
  private readonly marginX = 14;
  private readonly marginTop = 12;
  private readonly marginBottom = 12;
  private readonly contentWidth = this.pageWidth - this.marginX * 2;

  private readonly navy: [number, number, number] = [27, 58, 122];
  private readonly ink: [number, number, number] = [31, 41, 55];
  private readonly muted: [number, number, number] = [75, 85, 99];
  private readonly faint: [number, number, number] = [107, 114, 128];

  async download(
    resume: Resume,
    filename: string,
    version: ResumeVersion = 1,
  ): Promise<void> {
    if (this.generating()) {
      return;
    }

    this.generating.set(true);

    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      if (version === 2) {
        this.buildJobLeadsPdf(doc, resume);
      } else if (version === 3) {
        this.buildDocumentPdf(doc, resume);
      } else {
        this.buildClassicPdf(doc, resume);
      }

      doc.save(filename);
    } finally {
      this.generating.set(false);
    }
  }

  /** Resume 1 — classic navy-banner layout */
  private buildClassicPdf(doc: JsPdfDoc, resume: Resume): void {
    let y = this.marginTop;

    y = this.drawHeader(doc, resume, y);
    y = this.drawSectionTitle(doc, 'Summary', y);
    y = this.drawWrappedText(doc, resume.summary, y, 9, this.muted, 4.1);
    y += 3;

    y = this.drawSectionTitle(doc, 'Work Experience', y);
    for (const job of resume.experience) {
      y = this.beginJob(doc, job, y);
      y = this.drawJob(doc, job, y);
    }

    y += 1.5;
    y = this.drawSectionTitle(doc, 'Education', y);
    for (const entry of resume.education) {
      y = this.ensureSpace(doc, y, 12);
      y = this.drawEducation(doc, entry, y);
    }

    y += 1.5;
    y = this.drawSectionTitle(doc, 'Skills', y);
    for (const group of resume.skillGroups) {
      y = this.ensureSpace(doc, y, 12);
      y = this.drawSkillGroup(doc, group, y);
    }

    y += 1.5;
    y = this.drawSectionTitle(doc, 'Featured Projects', y);
    this.drawProjects(doc, resume.projects, y);
  }

  /** Resume 2 — JobLeads / Masterclass style */
  private buildJobLeadsPdf(doc: JsPdfDoc, resume: Resume): void {
    let y = this.marginTop;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...this.ink);
    doc.text(resume.name, this.pageWidth / 2, y, { align: 'center' });
    y += 7;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(resume.headline.replaceAll('·', '|'), this.pageWidth / 2, y, {
      align: 'center',
    });
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...this.muted);
    const contactLine = [
      resume.contact.location,
      resume.contact.email,
      resume.contact.phone,
    ].join('  |  ');
    doc.text(contactLine, this.pageWidth / 2, y, { align: 'center' });
    y += 3.5;

    const linksLine = resume.contact.links.map((l) => l.value).join('  |  ');
    doc.text(linksLine, this.pageWidth / 2, y, { align: 'center' });
    y += 5;

    y = this.drawHr(doc, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...this.ink);
    doc.text('Professional Overview', this.marginX, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...this.muted);
    y = this.drawWrappedText(doc, resume.summary, y, 9, this.muted, 4);
    y += 2;

    const competencies =
      'Angular  |  React  |  TypeScript  |  Python  |  Generative AI / LLMs  |  NgRx  |  Azure DevOps  |  AWS  |  REST APIs  |  Agile / Scrum  |  Mentoring';
    doc.setFontSize(8);
    doc.setTextColor(...this.faint);
    const compLines = doc.splitTextToSize(competencies, this.contentWidth) as string[];
    for (const line of compLines) {
      doc.text(line, this.pageWidth / 2, y, { align: 'center' });
      y += 3.4;
    }
    y += 2;

    y = this.drawHr(doc, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...this.ink);
    doc.text('Professional Experience', this.marginX, y);
    y += 6;

    for (const job of resume.experience) {
      y = this.beginJob(doc, job, y);
      y = this.drawJob(doc, job, y);
    }

    y += 1;
    y = this.drawHr(doc, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...this.ink);
    doc.text('Education', this.marginX, y);
    y += 6;

    for (const entry of resume.education) {
      y = this.ensureSpace(doc, y, 12);
      y = this.drawEducation(doc, entry, y);
    }

    y += 1;
    y = this.drawHr(doc, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...this.ink);
    doc.text('Featured Projects', this.marginX, y);
    y += 6;
    this.drawProjects(doc, resume.projects, y);
  }

  /** Resume 3 — document layout (navy banner, plain skill lists) */
  private buildDocumentPdf(doc: JsPdfDoc, resume: Resume): void {
    let y = this.marginTop;

    // Simpler navy banner (no icon glyphs) — matches Resume 3 web look
    const bannerHeight = 34;
    doc.setFillColor(...this.navy);
    doc.rect(0, 0, this.pageWidth, bannerHeight, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(resume.name, this.pageWidth / 2, 11, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(220, 230, 245);
    doc.text(resume.headline, this.pageWidth / 2, 17.5, { align: 'center' });

    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    const line1 = `${resume.contact.email}  |  ${resume.contact.location}  |  ${resume.contact.phone}`;
    const line2 = resume.contact.links.map((l) => l.value).join('  |  ');
    doc.text(line1, this.pageWidth / 2, 24, { align: 'center' });
    doc.text(line2, this.pageWidth / 2, 29, { align: 'center' });

    y = bannerHeight + 8;

    y = this.drawSectionTitle(doc, 'Summary', y);
    y = this.drawWrappedText(doc, resume.summary, y, 9, this.muted, 4.1);
    y += 3;

    y = this.drawSectionTitle(doc, 'Work Experience', y);
    for (const job of resume.experience) {
      y = this.beginJob(doc, job, y);
      y = this.drawJob(doc, job, y);
    }

    y += 1.5;
    y = this.drawSectionTitle(doc, 'Education', y);
    for (const entry of resume.education) {
      y = this.ensureSpace(doc, y, 12);
      y = this.drawEducation(doc, entry, y);
    }

    y += 1.5;
    y = this.drawSectionTitle(doc, 'Skills', y);
    for (const group of resume.skillGroups) {
      y = this.ensureSpace(doc, y, 12);
      y = this.drawSkillGroup(doc, group, y);
    }

    y += 1.5;
    y = this.drawSectionTitle(doc, 'Featured Projects', y);
    this.drawProjects(doc, resume.projects, y);
  }

  private drawHr(doc: JsPdfDoc, y: number): number {
    y = this.ensureSpace(doc, y, 6);
    doc.setDrawColor(30, 30, 30);
    doc.setLineWidth(0.4);
    doc.line(this.marginX, y, this.pageWidth - this.marginX, y);
    return y + 5;
  }

  private drawHeader(doc: JsPdfDoc, resume: Resume, _y: number): number {
    const bannerHeight = 34;
    doc.setFillColor(...this.navy);
    doc.rect(0, 0, this.pageWidth, bannerHeight, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(resume.name, this.pageWidth / 2, 11, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(220, 230, 245);
    doc.text(resume.headline, this.pageWidth / 2, 17.5, { align: 'center' });

    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    const line1 = `${resume.contact.email}  |  ${resume.contact.location}  |  ${resume.contact.phone}`;
    const line2 = resume.contact.links.map((l) => l.value).join('  |  ');
    doc.text(line1, this.pageWidth / 2, 24, { align: 'center' });
    doc.text(line2, this.pageWidth / 2, 29, { align: 'center' });

    return bannerHeight + 10;
  }

  private drawSectionTitle(doc: JsPdfDoc, title: string, y: number): number {
    y = this.ensureSpace(doc, y, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...this.navy);
    doc.text(title, this.marginX, y);

    const textWidth = doc.getTextWidth(title);
    doc.setDrawColor(...this.navy);
    doc.setLineWidth(0.4);
    doc.line(this.marginX, y + 1.2, this.marginX + textWidth, y + 1.2);

    // Extra breathing room after section headers (Summary, Work Experience, etc.)
    return y + 9;
  }

  /**
   * Keep an entire job block on one page when it fits.
   * If the job is taller than a page, fall back to header + first bullet.
   */
  private beginJob(
    doc: JsPdfDoc,
    job: Resume['experience'][number],
    y: number,
  ): number {
    const fullHeight = this.measureJobHeight(doc, job);
    const usableHeight = this.pageHeight - this.marginTop - this.marginBottom;

    if (fullHeight <= usableHeight) {
      // Small pad so rounding / font metrics don't still clip the last bullet
      return this.ensureSpace(doc, y, fullHeight + 2);
    }

    // Oversized job: at least keep title/company with the first bullet
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const firstBullet = job.highlights[0] ?? '';
    const lines = doc.splitTextToSize(firstBullet, this.contentWidth - 3) as string[];
    const firstBulletHeight = Math.max(lines.length, 1) * 3.9 + 0.7;
    return this.ensureSpace(doc, y, 4.2 + 4.8 + firstBulletHeight);
  }

  /** Height of title + company + all bullets (no trailing between-job gap). */
  private measureJobHeight(
    doc: JsPdfDoc,
    job: Resume['experience'][number],
  ): number {
    const lineHeight = 3.9;
    const textWidth = this.contentWidth - 3;
    let height = 4.2 + 4.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);

    for (const highlight of job.highlights) {
      const lines = doc.splitTextToSize(highlight, textWidth) as string[];
      height += Math.max(lines.length, 1) * lineHeight + 0.7;
    }

    return height;
  }

  private drawJob(
    doc: JsPdfDoc,
    job: Resume['experience'][number],
    y: number,
  ): number {
    // Title + dates (same row)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...this.ink);
    doc.text(job.title, this.marginX, y);

    const dates = `${job.startDate} – ${job.endDate}`;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...this.faint);
    doc.text(dates, this.pageWidth - this.marginX, y, { align: 'right' });
    y += 4.2;

    // Company line — tight under title, like the web
    doc.setFontSize(8.5);
    doc.setTextColor(...this.muted);
    doc.text(`${job.company} (${job.arrangement})`, this.marginX, y);
    y += 4.8;

    for (const highlight of job.highlights) {
      y = this.drawBullet(doc, highlight, y);
    }

    // Between-job gap ≈ web margin+padding (~1.1rem)
    return y + 4.5;
  }

  private drawEducation(
    doc: JsPdfDoc,
    entry: Resume['education'][number],
    y: number,
  ): number {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...this.ink);
    doc.text(entry.focus, this.marginX, y);

    const dates = `${entry.startYear} – ${entry.endYear}`;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...this.faint);
    doc.text(dates, this.pageWidth - this.marginX, y, { align: 'right' });
    y += 4.2;

    doc.setFontSize(8.5);
    doc.setTextColor(...this.muted);
    doc.text(`${entry.institution}, ${entry.location}`, this.marginX, y);
    y += 4.2;

    if (entry.note) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(...this.faint);
      doc.text(entry.note, this.marginX, y);
      y += 4;
    }

    return y + 3.5;
  }

  private drawSkillGroup(
    doc: JsPdfDoc,
    group: Resume['skillGroups'][number],
    y: number,
  ): number {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...this.navy);
    doc.text(group.category, this.marginX, y);
    y += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...this.muted);
    y = this.drawWrappedText(doc, group.skills.join(' · '), y, 8, this.muted, 3.6);
    return y + 2.5;
  }

  private drawProjects(
    doc: JsPdfDoc,
    projects: Resume['projects'],
    y: number,
  ): number {
    const angular = projects.filter((p) => p.stack === 'Angular');
    const react = projects.filter((p) => p.stack === 'React');

    const gap = 6;
    const colWidth = (this.contentWidth - gap) / 2;
    const leftX = this.marginX;
    const rightX = this.marginX + colWidth + gap;

    y = this.ensureSpace(doc, y, 28);

    // Column headers
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...this.navy);
    doc.text('Angular', leftX, y);
    doc.text('React', rightX, y);
    y += 4;

    const startY = y;
    const leftEnd = this.drawProjectColumn(doc, angular, leftX, startY, colWidth);
    const rightEnd = this.drawProjectColumn(doc, react, rightX, startY, colWidth);

    return Math.max(leftEnd, rightEnd) + 1;
  }

  private drawProjectColumn(
    doc: JsPdfDoc,
    projects: Resume['projects'],
    x: number,
    y: number,
    colWidth: number,
  ): number {
    for (const project of projects) {
      const primaryUrl = project.githubUrl || project.liveUrl || '';

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...this.ink);
      const titleLines = doc.splitTextToSize(project.name, colWidth) as string[];
      for (const line of titleLines) {
        if (primaryUrl) {
          doc.textWithLink(line, x, y, { url: primaryUrl });
        } else {
          doc.text(line, x, y);
        }
        y += 3.1;
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.2);
      doc.setTextColor(...this.muted);
      const descLines = doc.splitTextToSize(project.description, colWidth) as string[];
      for (const line of descLines.slice(0, 3)) {
        doc.text(line, x, y);
        y += 2.85;
      }

      doc.setFontSize(7);
      doc.setTextColor(...this.navy);
      let linkX = x;

      if (project.githubUrl) {
        doc.textWithLink('GitHub', linkX, y, { url: project.githubUrl });
        linkX += doc.getTextWidth('GitHub');
      }

      if (project.liveUrl) {
        if (project.githubUrl) {
          doc.text('  ·  ', linkX, y);
          linkX += doc.getTextWidth('  ·  ');
        }
        doc.textWithLink('Live demo', linkX, y, { url: project.liveUrl });
      }

      y += 4.2;
    }

    return y;
  }

  private drawBullet(doc: JsPdfDoc, text: string, y: number): number {
    const bulletIndent = this.marginX + 3;
    const textWidth = this.contentWidth - 3;
    const lines = doc.splitTextToSize(text, textWidth) as string[];
    const lineHeight = 3.9;
    const blockHeight = lines.length * lineHeight + 0.8;

    y = this.ensureSpace(doc, y, blockHeight);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...this.muted);
    doc.text('•', this.marginX, y);

    for (const line of lines) {
      doc.text(line, bulletIndent, y);
      y += lineHeight;
    }

    // Small gap between bullets (mirrors web li margin)
    return y + 0.7;
  }

  private drawWrappedText(
    doc: JsPdfDoc,
    text: string,
    y: number,
    fontSize: number,
    color: [number, number, number],
    lineHeight: number,
  ): number {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);

    const lines = doc.splitTextToSize(text, this.contentWidth) as string[];
    for (const line of lines) {
      y = this.ensureSpace(doc, y, lineHeight + 0.8);
      doc.text(line, this.marginX, y);
      y += lineHeight;
    }

    return y;
  }

  private ensureSpace(doc: JsPdfDoc, y: number, needed: number): number {
    if (y + needed > this.pageHeight - this.marginBottom) {
      doc.addPage();
      return this.marginTop;
    }
    return y;
  }
}
