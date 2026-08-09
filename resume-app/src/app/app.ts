import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Header } from './components/header/header';
import { Experience } from './components/experience/experience';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Resume2 } from './components/resume2/resume2';
import { Resume3 } from './components/resume3/resume3';
import { Resume4 } from './components/resume4/resume4';
import { RESUME } from './data/resume.data';
import { ResumeVersion } from './models/resume-version';
import { DocxService } from './services/docx.service';
import { PdfService } from './services/pdf.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Experience, Skills, Projects, Resume2, Resume3, Resume4],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly resume = RESUME;
  private readonly pdfService = inject(PdfService);
  private readonly docxService = inject(DocxService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly generatingPdf = this.pdfService.generating;
  protected readonly generatingDocx = this.docxService.generating;
  protected readonly exporting = computed(
    () => this.generatingPdf() || this.generatingDocx(),
  );
  protected readonly recommendationOpen = signal(false);
  /** Default = classic navy-banner layout (header / experience / skills / projects). */
  protected readonly version = signal<ResumeVersion>(1);

  protected readonly recommendationPdfUrl = '/Letter_of_Recommendation-TFS.pdf';
  protected readonly recommendationEmbedUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(this.recommendationPdfUrl);
  protected readonly recommendationDownloadName = 'Paul-Welby-Letter-of-Recommendation-TFS.pdf';

  protected setVersion(v: ResumeVersion): void {
    this.version.set(v);
  }

  protected async downloadPdf(): Promise<void> {
    const v = this.version();
    const filename = `PaulWelby_Angular-React-Python-AI_${this.styleLabel(v)}_${this.downloadDateStamp()}.pdf`;
    await this.pdfService.download(this.resume, filename, v);
  }

  protected async downloadDocx(): Promise<void> {
    const v = this.version();
    const filename = `PaulWelby_Angular-React-Python-AI_${this.styleLabel(v)}_${this.downloadDateStamp()}.docx`;
    await this.docxService.download(this.resume, filename, v);
  }

  /** Filename middle segment for each resume style. */
  private styleLabel(version: ResumeVersion): string {
    switch (version) {
      case 1:
        return 'Classic';
      case 2:
        return 'JobLeads';
      case 3:
        return 'Document';
      case 4:
        return 'Indeed';
    }
  }

  /** Local date as M-D-YYYY for download filenames (e.g. 8-9-2026). */
  private downloadDateStamp(): string {
    const now = new Date();
    return `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;
  }

  protected openRecommendation(): void {
    this.recommendationOpen.set(true);
  }

  protected closeRecommendation(): void {
    this.recommendationOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.recommendationOpen()) {
      this.closeRecommendation();
    }
  }
}
