import { Component } from '@angular/core';
import { LetterWiggleDirective } from '../../directives/letter-wiggle.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [LetterWiggleDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

}
