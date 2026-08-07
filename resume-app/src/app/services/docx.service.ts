import { Injectable, signal } from '@angular/core';
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  UnderlineType,
} from 'docx';
import { Resume } from '../models/resume.model';
import { ResumeVersion } from '../models/resume-version';

/**
 * Builds an ATS-friendly Word (.docx) resume from the shared resume data.
 */
@Injectable({ providedIn: 'root' })
export class DocxService {
  readonly generating = signal(false);

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
      const summaryTitle = version === 2 ? 'Professional Overview' : 'Summary';
      const experienceTitle = version === 2 ? 'Professional Experience' : 'Work Experience';

      const children: Paragraph[] = [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: resume.name,
              bold: true,
              size: 36,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: resume.headline,
              bold: true,
              size: 22,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: `${resume.contact.email}  |  ${resume.contact.location}  |  ${resume.contact.phone}`,
              size: 18,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: this.linkRuns(resume),
        }),
        this.sectionHeading(summaryTitle),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: resume.summary,
              size: 20,
              font: 'Calibri',
            }),
          ],
        }),
        this.sectionHeading(experienceTitle),
      ];

      for (const job of resume.experience) {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 40 },
            children: [
              new TextRun({
                text: job.title,
                bold: true,
                size: 22,
                font: 'Calibri',
              }),
              new TextRun({
                text: `\t${job.startDate} – ${job.endDate}`,
                size: 18,
                font: 'Calibri',
                color: '666666',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: `${job.company} (${job.arrangement})`,
                size: 19,
                font: 'Calibri',
                italics: true,
              }),
            ],
          }),
        );

        for (const highlight of job.highlights) {
          children.push(
            new Paragraph({
              spacing: { after: 40 },
              indent: { left: 180 },
              children: [
                new TextRun({
                  text: `• ${highlight}`,
                  size: 19,
                  font: 'Calibri',
                }),
              ],
            }),
          );
        }
      }

      children.push(this.sectionHeading('Education'));
      for (const entry of resume.education) {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 20 },
            children: [
              new TextRun({
                text: entry.focus,
                bold: true,
                size: 20,
                font: 'Calibri',
              }),
              new TextRun({
                text: `\t${entry.startYear} – ${entry.endYear}`,
                size: 18,
                font: 'Calibri',
                color: '666666',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: entry.note ? 20 : 80 },
            children: [
              new TextRun({
                text: `${entry.institution}, ${entry.location}`,
                size: 19,
                font: 'Calibri',
              }),
            ],
          }),
        );

        if (entry.note) {
          children.push(
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({
                  text: entry.note,
                  italics: true,
                  size: 18,
                  font: 'Calibri',
                  color: '666666',
                }),
              ],
            }),
          );
        }
      }

      children.push(this.sectionHeading('Skills'));
      for (const group of resume.skillGroups) {
        children.push(
          new Paragraph({
            spacing: { before: 60, after: 20 },
            children: [
              new TextRun({
                text: group.category,
                bold: true,
                size: 19,
                font: 'Calibri',
                color: '1B3A7A',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: group.skills.join(' · '),
                size: 18,
                font: 'Calibri',
              }),
            ],
          }),
        );
      }

      children.push(this.sectionHeading('Featured Projects'));
      const angular = resume.projects.filter((p) => p.stack === 'Angular');
      const react = resume.projects.filter((p) => p.stack === 'React');

      children.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          children: [
            new TextRun({
              text: 'Angular',
              bold: true,
              size: 20,
              font: 'Calibri',
              color: '1B3A7A',
            }),
          ],
        }),
      );
      for (const project of angular) {
        children.push(...this.projectParagraphs(project));
      }

      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: 'React',
              bold: true,
              size: 20,
              font: 'Calibri',
              color: '1B3A7A',
            }),
          ],
        }),
      );
      for (const project of react) {
        children.push(...this.projectParagraphs(project));
      }

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 720,
                  right: 720,
                  bottom: 720,
                  left: 720,
                },
              },
            },
            children,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      this.saveBlob(blob, filename);
    } finally {
      this.generating.set(false);
    }
  }

  private sectionHeading(text: string): Paragraph {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 12, color: '1B3A7A', space: 4 },
      },
      children: [
        new TextRun({
          text,
          bold: true,
          size: 24,
          font: 'Calibri',
          color: '1B3A7A',
        }),
      ],
    });
  }

  private linkRuns(resume: Resume): (TextRun | ExternalHyperlink)[] {
    const runs: (TextRun | ExternalHyperlink)[] = [];

    resume.contact.links.forEach((link, index) => {
      if (index > 0) {
        runs.push(new TextRun({ text: '  |  ', size: 18, font: 'Calibri' }));
      }
      runs.push(
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: link.value,
              size: 18,
              font: 'Calibri',
              color: '0563C1',
              underline: { type: UnderlineType.SINGLE },
            }),
          ],
          link: link.href,
        }),
      );
    });

    return runs;
  }

  private projectParagraphs(project: Resume['projects'][number]): Paragraph[] {
    const paragraphs: Paragraph[] = [
      new Paragraph({
        spacing: { before: 60, after: 20 },
        children: [
          new TextRun({
            text: project.name,
            bold: true,
            size: 19,
            font: 'Calibri',
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({
            text: project.description,
            size: 18,
            font: 'Calibri',
          }),
        ],
      }),
    ];

    const linkChildren: (TextRun | ExternalHyperlink)[] = [];
    if (project.githubUrl) {
      linkChildren.push(
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: 'GitHub',
              size: 17,
              font: 'Calibri',
              color: '0563C1',
              underline: { type: UnderlineType.SINGLE },
            }),
          ],
          link: project.githubUrl,
        }),
      );
    }
    if (project.liveUrl) {
      if (project.githubUrl) {
        linkChildren.push(new TextRun({ text: '  ·  ', size: 17, font: 'Calibri' }));
      }
      linkChildren.push(
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: 'Live demo',
              size: 17,
              font: 'Calibri',
              color: '0563C1',
              underline: { type: UnderlineType.SINGLE },
            }),
          ],
          link: project.liveUrl,
        }),
      );
    }

    if (linkChildren.length) {
      paragraphs.push(
        new Paragraph({
          spacing: { after: 80 },
          children: linkChildren,
        }),
      );
    }

    return paragraphs;
  }

  private saveBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
