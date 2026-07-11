import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Header } from './components/header/header';
import { Experience } from './components/experience/experience';
import { Skills } from './components/skills/skills';
import { RESUME } from './data/resume.data';
import { PdfService } from './services/pdf.service';

@Component({
  selector: 'app-root',
  imports: [Header, Experience, Skills],
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

  protected readonly recommendationPdfUrl = '/Letter_of_Recommendation-TFS.pdf';
  protected readonly recommendationEmbedUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(this.recommendationPdfUrl);
  protected readonly recommendationDownloadName = 'Paul-Welby-Letter-of-Recommendation-TFS.pdf';

  protected async downloadPdf(): Promise<void> {
    await this.pdfService.download(
      this.resume,
      'PaulWelby_Resume_Angular-Python-AI_7-11-2026-rev2.pdf',
    );
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
