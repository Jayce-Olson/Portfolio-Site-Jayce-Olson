import { Component } from '@angular/core';
import { ContactFormService } from '../../services/contact-form.service';

@Component({
  selector: 'app-contact-button',
  standalone: true,
  imports: [],
  templateUrl: './contact-button.component.html',
  styleUrl: './contact-button.component.css'
})
export class ContactButtonComponent {

  constructor(private contactFormService: ContactFormService){}

  openContact(){
    console.log("buttonClicked!");
    this.contactFormService.openContact(true); // have this interact with a service
  }
}
