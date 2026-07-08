import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Education, Job } from '../../models/resume.model';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  readonly jobs = input.required<Job[]>();
  readonly education = input.required<Education[]>();
}
