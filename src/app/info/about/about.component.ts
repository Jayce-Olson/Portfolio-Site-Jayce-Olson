import { Component } from '@angular/core';
import { ContactButtonComponent } from '../../intro/contact-button/contact-button.component';
import { LetterWiggleDirective } from '../../directives/letter-wiggle.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ContactButtonComponent, LetterWiggleDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
