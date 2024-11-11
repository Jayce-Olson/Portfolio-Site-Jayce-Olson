import { Component } from '@angular/core';
import { ContactButtonComponent } from '../intro/contact-button/contact-button.component';
import { IconsComponent } from '../intro/icons/icons.component';
import { LetterWiggleDirective } from '../directives/letter-wiggle.directive';
@Component({
  selector: 'app-final',
  standalone: true,
  imports: [ContactButtonComponent,IconsComponent, LetterWiggleDirective],
  templateUrl: './final.component.html',
  styleUrl: './final.component.css'
})
export class FinalComponent {

}
