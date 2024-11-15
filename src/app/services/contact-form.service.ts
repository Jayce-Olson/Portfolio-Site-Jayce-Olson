import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  // Creating a subject to use as observable to emit boolean
  subject = new Subject<boolean>();
  buttonMessageConfirmedSubject = new Subject<boolean>();
  update = this.subject.asObservable(); // This and below are what are used to subsribe to for updates
  getState = this.buttonMessageConfirmedSubject.asObservable();

  constructor() { }

  openContact(open: boolean){
    console.log("Open Contact Function ran");
    this.subject.next(open); // Emit value of open (passed as true when openContact was called from contactButton.ts) this is suscribed to by the contactComponent.ts
  }

  messageSent(confirmed: boolean){
    this.buttonMessageConfirmedSubject.next(confirmed); // Emits confirmed value. Subscribed to from the contact button component and will be called from the contact form component.ts
  }
}
