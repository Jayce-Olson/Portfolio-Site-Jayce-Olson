import { Component } from '@angular/core';
import { DragDirective } from '../../directives/drag.directive';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DragDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
