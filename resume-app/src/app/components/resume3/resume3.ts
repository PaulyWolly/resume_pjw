import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Resume } from '../../models/resume.model';

/** Version 3 — same content as classic resume, clean document layout. */
@Component({
  selector: 'app-resume3',
  standalone: true,
  templateUrl: './resume3.html',
  styleUrl: './resume3.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resume3 {
  readonly resume = input.required<Resume>();

  protected angularProjects() {
    return this.resume().projects.filter((p) => p.stack === 'Angular');
  }

  protected reactProjects() {
    return this.resume().projects.filter((p) => p.stack === 'React');
  }
}
