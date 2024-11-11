import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { IntroComponent } from './intro/intro.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './info/about/about.component';
import { TechStackComponent } from './info/tech-stack/tech-stack.component';
import { ProjectsComponent } from './info/projects/projects.component';
import { LetterWiggleDirective } from './directives/letter-wiggle.directive';
import { ContactButtonComponent } from './intro/contact-button/contact-button.component';
import { FinalComponent } from './final/final.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, IntroComponent,ContactComponent,AboutComponent, TechStackComponent, ProjectsComponent, LetterWiggleDirective,ContactButtonComponent, FinalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  
}
