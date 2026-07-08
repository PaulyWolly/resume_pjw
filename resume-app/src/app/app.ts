import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  protected readonly generating = this.pdfService.generating;

  protected async downloadPdf(): Promise<void> {
    await this.pdfService.download(this.resume, 'Paul-Welby-Resume.pdf');
  }
}
