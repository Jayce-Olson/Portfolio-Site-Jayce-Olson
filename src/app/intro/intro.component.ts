import { Component } from '@angular/core';
import { TypedDirective } from './directives/typed.directive';
import { LetterWiggleDirective } from '../directives/letter-wiggle.directive';
import { ContactButtonComponent } from './contact-button/contact-button.component';
import { IconsComponent } from './icons/icons.component';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [TypedDirective, LetterWiggleDirective, ContactButtonComponent, IconsComponent, ProfileComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {

 
}
