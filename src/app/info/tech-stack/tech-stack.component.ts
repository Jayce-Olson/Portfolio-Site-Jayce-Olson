import { Component } from '@angular/core';
import { LetterWiggleDirective } from '../../directives/letter-wiggle.directive';


@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [LetterWiggleDirective],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.css'
})
export class TechStackComponent {

}
