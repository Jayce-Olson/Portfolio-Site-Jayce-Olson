import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ContactFormService } from '../services/contact-form.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  visible: boolean = false;
  serverUrl: string = "http://localhost/contact" // http for testing
  contactData = {
    name: '',
    email: '',
    message: '',
  }

  constructor(private contactFormService: ContactFormService, private httpClient: HttpClient) {}

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
    console.log(this.contactData);
    this.httpClient.post<any>(this.serverUrl, this.contactData).subscribe(
      (response:any) => {
        console.log('Form submitted successfully:', response);
      },
      (error:any) => {
        console.error('Error submitting form:', error);
      }
    );
    this.close();
  }
}

