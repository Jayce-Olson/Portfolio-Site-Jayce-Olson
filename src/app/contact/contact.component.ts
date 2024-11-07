import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ContactFormService } from '../services/contact-form.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  visible: boolean = false;

  constructor(private contactFormService: ContactFormService) {}

  ngOnInit() {
    this.contactFormService.update.subscribe((open: boolean) => {
      console.log("success!");
      this.visible = open;
    });
  }

  close() {
    this.visible = false;
  }

  submit() {
    console.log('Form Submitted');
    this.close();
  }
}

