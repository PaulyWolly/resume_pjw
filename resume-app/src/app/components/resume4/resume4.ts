import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Resume } from '../../models/resume.model';

/** Version 4 — Indeed / ATS style (plain document, company lines with sites). */
@Component({
  selector: 'app-resume4',
  standalone: true,
  templateUrl: './resume4.html',
  styleUrl: './resume4.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resume4 {
  readonly resume = input.required<Resume>();

  protected angularProjects() {
    return this.resume().projects.filter((p) => p.stack === 'Angular');
  }

  protected reactProjects() {
    return this.resume().projects.filter((p) => p.stack === 'React');
  }
}
