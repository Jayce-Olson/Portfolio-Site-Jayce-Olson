import { Component } from '@angular/core';
import { AnchorComponent } from './anchor/anchor.component';
import { LetterWiggleDirective } from '../directives/letter-wiggle.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [AnchorComponent,LetterWiggleDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
