import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { Contact } from '../contact.model';
import { contactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: contactService) {

  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts(); 
    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList
      }
    );
  }

}
