import { Injectable, signal } from '@angular/core';
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  UnderlineType,
  VerticalAlign,
  WidthType,
} from 'docx';
import { Resume } from '../models/resume.model';
import { ResumeVersion } from '../models/resume-version';

type DocChild = Paragraph | Table;

/**
 * Builds an ATS-friendly Word (.docx) resume from the shared resume data.
 * Compact spacing — avoids Word Heading styles (they inflate to many pages).
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
      const summaryTitle =
        version === 2 ? 'Professional Overview' : 'Summary';
      const experienceTitle =
        version === 2 ? 'Professional Experience' : 'Work Experience';

      const children: DocChild[] = [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: resume.name,
              bold: true,
              size: 32,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: resume.headline,
              bold: true,
              size: 20,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 20 },
          children: [
            new TextRun({
              text: `${resume.contact.email}  |  ${resume.contact.location}  |  ${resume.contact.phone}`,
              size: 17,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: this.linkRuns(resume),
        }),
        this.sectionHeading(summaryTitle),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: resume.summary,
              size: 18,
              font: 'Calibri',
            }),
          ],
        }),
        this.sectionHeading(experienceTitle),
      ];

      for (const job of resume.experience) {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 20 },
            children: [
              new TextRun({
                text: job.title,
                bold: true,
                size: 20,
                font: 'Calibri',
              }),
              new TextRun({
                text: `    ${job.startDate} – ${job.endDate}`,
                size: 17,
                font: 'Calibri',
                color: '666666',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: job.site
                  ? `${job.company} (${job.arrangement}) • ${job.site}`
                  : `${job.company} (${job.arrangement})`,
                size: 18,
                font: 'Calibri',
                italics: true,
              }),
            ],
          }),
        );

        for (const highlight of job.highlights) {
          children.push(
            new Paragraph({
              spacing: { after: 20 },
              indent: { left: 144 },
              children: [
                new TextRun({
                  text: `• ${highlight}`,
                  size: 17,
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
            spacing: { before: 40, after: 10 },
            children: [
              new TextRun({
                text: entry.focus,
                bold: true,
                size: 18,
                font: 'Calibri',
              }),
              new TextRun({
                text: `    ${entry.startYear} – ${entry.endYear}`,
                size: 17,
                font: 'Calibri',
                color: '666666',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: entry.note ? 10 : 40 },
            children: [
              new TextRun({
                text: `${entry.institution}, ${entry.location}`,
                size: 17,
                font: 'Calibri',
              }),
            ],
          }),
        );

        if (entry.note) {
          children.push(
            new Paragraph({
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: entry.note,
                  italics: true,
                  size: 16,
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
            spacing: { before: 40, after: 10 },
            children: [
              new TextRun({
                text: group.category,
                bold: true,
                size: 18,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: group.skills.join(' · '),
                size: 17,
                font: 'Calibri',
              }),
            ],
          }),
        );
      }

      children.push(this.sectionHeading('Featured Projects'));
      children.push(this.projectsTable(resume.projects));

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: { font: 'Calibri', size: 18 },
              paragraph: {
                spacing: { after: 0, line: 240 },
              },
            },
          },
        },
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 540,
                  right: 540,
                  bottom: 540,
                  left: 540,
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
    // Do NOT use HeadingLevel — Word's built-in Heading 2 spacing balloons the page count.
    return new Paragraph({
      spacing: { before: 140, after: 60 },
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          size: 6,
          color: '222222',
          space: 2,
        },
      },
      children: [
        new TextRun({
          text,
          bold: true,
          size: 22,
          font: 'Calibri',
          color: '1A1A1A',
        }),
      ],
    });
  }

  private linkRuns(resume: Resume): (TextRun | ExternalHyperlink)[] {
    const runs: (TextRun | ExternalHyperlink)[] = [];

    resume.contact.links.forEach((link, index) => {
      if (index > 0) {
        runs.push(new TextRun({ text: '  |  ', size: 17, font: 'Calibri' }));
      }
      runs.push(
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: link.value,
              size: 17,
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

  private projectsTable(projects: Resume['projects']): Table {
    const angular = projects.filter((p) => p.stack === 'Angular');
    const react = projects.filter((p) => p.stack === 'React');
    const rowCount = Math.max(angular.length, react.length);
    const colWidth = 5040;

    const rows: TableRow[] = [
      new TableRow({
        children: [
          this.stackHeaderCell('Angular', colWidth),
          this.stackHeaderCell('React', colWidth),
        ],
      }),
    ];

    for (let i = 0; i < rowCount; i++) {
      rows.push(
        new TableRow({
          children: [
            this.projectCell(angular[i], colWidth),
            this.projectCell(react[i], colWidth),
          ],
        }),
      );
    }

    return new Table({
      width: { size: colWidth * 2, type: WidthType.DXA },
      columnWidths: [colWidth, colWidth],
      rows,
    });
  }

  private stackHeaderCell(text: string, width: number): TableCell {
    return new TableCell({
      width: { size: width, type: WidthType.DXA },
      verticalAlign: VerticalAlign.CENTER,
      shading: { type: ShadingType.CLEAR, fill: 'E8E8E8' },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 20, after: 20 },
          children: [
            new TextRun({
              text,
              bold: true,
              size: 18,
              font: 'Calibri',
            }),
          ],
        }),
      ],
    });
  }

  private projectCell(
    project: Resume['projects'][number] | undefined,
    width: number,
  ): TableCell {
    if (!project) {
      return new TableCell({
        width: { size: width, type: WidthType.DXA },
        children: [new Paragraph({ children: [] })],
      });
    }

    return new TableCell({
      width: { size: width, type: WidthType.DXA },
      children: this.projectParagraphs(project),
    });
  }

  private projectParagraphs(project: Resume['projects'][number]): Paragraph[] {
    const paragraphs: Paragraph[] = [
      new Paragraph({
        spacing: { before: 40, after: 10 },
        children: [
          new TextRun({
            text: project.name,
            bold: true,
            size: 17,
            font: 'Calibri',
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 10 },
        children: [
          new TextRun({
            text: project.description,
            size: 16,
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
              size: 16,
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
        linkChildren.push(new TextRun({ text: '  ·  ', size: 16, font: 'Calibri' }));
      }
      linkChildren.push(
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: 'Live demo',
              size: 16,
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
          spacing: { after: 40 },
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
