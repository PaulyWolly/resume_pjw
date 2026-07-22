import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Resume } from '../../models/resume.model';

/** Version 2 — JobLeads / Masterclass (Eleanor Smith–style) layout. */
@Component({
  selector: 'app-resume2',
  standalone: true,
  templateUrl: './resume2.html',
  styleUrl: './resume2.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resume2 {
  readonly resume = input.required<Resume>();

  protected angularProjects() {
    return this.resume().projects.filter((p) => p.stack === 'Angular');
  }

  protected reactProjects() {
    return this.resume().projects.filter((p) => p.stack === 'React');
  }

  protected titleLine(): string {
    return this.resume().headline.replaceAll('·', '|');
  }

  protected competencyLine(): string {
    return [
      'Angular',
      'React',
      'TypeScript',
      'Python',
      'Generative AI / LLMs',
      'NgRx',
      'Azure DevOps',
      'AWS',
      'REST APIs',
      'Agile / Scrum',
      'Mentoring',
    ].join('  |  ');
  }
}
