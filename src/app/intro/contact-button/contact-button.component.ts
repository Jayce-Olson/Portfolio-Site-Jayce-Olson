import { Component } from '@angular/core';
import { ContactFormService } from '../../services/contact-form.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-contact-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-button.component.html',
  styleUrl: './contact-button.component.css'
})
export class ContactButtonComponent {

  confirmed: boolean = false; // Check if message was sent and confirmed

  constructor(private contactFormService: ContactFormService){}

  ngOnInit() {
    this.contactFormService.getState.subscribe((confirmed: boolean) => {
      console.log("Message sent confirmed");
      this.confirmed = confirmed;
      // setTimeout(()=>{
      //   this.confirmed = false;
      // },2500);
    });
  }

  openContact(){
    console.log("buttonClicked!");
    this.contactFormService.openContact(true); // have this interact with a service
  }
}
