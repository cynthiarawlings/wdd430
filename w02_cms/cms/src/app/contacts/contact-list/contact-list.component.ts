import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { contactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  contacts: Contact[] = [];

  constructor(private contactService: contactService) {

  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
