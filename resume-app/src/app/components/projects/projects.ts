import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../models/resume.model';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  readonly projects = input.required<Project[]>();

  protected angularProjects(): Project[] {
    return this.projects().filter((p) => p.stack === 'Angular');
  }

  protected reactProjects(): Project[] {
    return this.projects().filter((p) => p.stack === 'React');
  }
}
