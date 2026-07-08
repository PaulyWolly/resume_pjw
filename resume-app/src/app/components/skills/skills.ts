import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkillGroup } from '../../models/resume.model';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  readonly skillGroups = input.required<SkillGroup[]>();
}
