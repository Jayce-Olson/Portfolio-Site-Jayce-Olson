import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  // Creating a subject to use as observable to emit boolean
  subject = new Subject<boolean>()
  update = this.subject.asObservable();

  constructor() { }

  openContact(open: boolean){
    console.log("Open Contact Function ran");
    this.subject.next(open); // Emit value of open
  }
}
