import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Education, Job, Project } from '../../models/resume.model';
import { Projects } from '../projects/projects';

@Component({
  selector: 'app-experience',
  imports: [Projects],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  readonly jobs = input.required<Job[]>();
  readonly education = input.required<Education[]>();
  readonly projects = input<Project[]>([]);
}
