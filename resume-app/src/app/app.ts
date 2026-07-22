import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Header } from './components/header/header';
import { Experience } from './components/experience/experience';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Resume2 } from './components/resume2/resume2';
import { Resume3 } from './components/resume3/resume3';
import { RESUME } from './data/resume.data';
import { ResumeVersion } from './models/resume-version';
import { PdfService } from './services/pdf.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Experience, Skills, Projects, Resume2, Resume3],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly resume = RESUME;
  private readonly pdfService = inject(PdfService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly generating = this.pdfService.generating;
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
    const filename = `PaulWelby_Resume_v${v}_Angular-Python-AI_7-11-2026.pdf`;
    await this.pdfService.download(this.resume, filename, v);
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
