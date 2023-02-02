import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
    providedIn: 'root'
})

export class contactService {
    contactSelectedEvent = new EventEmitter<Contact>();

    private contacts: Contact[] = [];

    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: string) {
        this.contacts.forEach(function (contact) {
            if (contact.id == id) {
                return contact;
            }
            else if (contact == this.contacts[this.contacts.length-1]) {
                return null;
            }
        });
    }
}