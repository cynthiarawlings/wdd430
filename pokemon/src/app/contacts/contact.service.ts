import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from "./contact.model";

@Injectable({
    providedIn: 'root'
})

export class contactService {
    contactSelectedEvent = new EventEmitter<Contact>();
    contactChangedEvent = new EventEmitter<Contact[]>();
    contactListChangedEvent = new Subject<Contact[]>();

    private contacts: Contact[] = [];
    private maxContactId: number;

    constructor(private http: HttpClient) {
        this.fetchContacts();
    }

    fetchContacts() {
        return this.http
            .get<Contact[]>(
                "http://localhost:3000/contacts"
            )
            .subscribe((result: any) => {
                let contacts = result.contacts;
                this.contacts = contacts;
                // console.log(contacts);
                this.maxContactId = this.getMaxId();
                contacts = contacts.sort((a, b) => {
                    if (a.id > b.id) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
                let contactsListClone = this.contacts.slice();
                this.contactListChangedEvent.next(contactsListClone);
                (error: any) => {
                    console.log(error);
                }
            })
    }

    storeContacts(contact: Contact) {
        if (!contact) {
            return;
        }

        contact.id = '';

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // add to database
        this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
        contact,
            { headers: headers })
            .subscribe(
                (responseData) => {
                    this.contacts.push(responseData.contact);
                    this.sortAndSend();
                }
            );
    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(index: string) {
        // return this.http
        //     .get<Contact[]>(
        //         "http://localhost:3000/contacts"
        //     )
        //     .subscribe((result: any) => {
        //         let contacts = result.contacts;
        //         this.contacts = contacts;
        //         for (let contact of this.contacts) {
        //             if (index == contact._id) {
        //                 console.log(contact);
        //                 return contact;
        //             }
        //             console.log(contact);
        //         }
        //         // console.log(contacts);
        //         // this.maxContactId = this.getMaxId();
        //         // contacts = contacts.sort((a, b) => {
        //         //     if (a.id > b.id) {
        //         //         return 1;
        //         //     } else {
        //         //         return -1;
        //         //     }
        //         // })
        //         // let contactsListClone = this.contacts.slice();
        //         // this.contactListChangedEvent.next(contactsListClone);
        //         (error: any) => {
        //             console.log(error);
        //         }
        //     })
        
        // console.log(index);
        // return this.http
        //     .get<Contact[]>(
        //         "http://localhost:3000/contacts/" + index
        //     )
        //     .subscribe((result: any) => {
        //         let sender = result.contact;
        //         // return sender;
        //         console.log(sender);
        //         (error: any) => {
        //             console.log(error);
        //         }
        //     })
        // console.log(index);
        // console.log(this.contacts);
        // console.log(this.contacts[index]);

        // for (let contact of this.contacts) {
        //     if (index == contact._id) {
        //         console.log(contact);
        //         return contact;
        //     }
        //     console.log(contact);
        // }

        
        return this.contacts[index];

    }

    getMaxId(): number {
        let maxId = 0;
        for (let contact of this.contacts) {
            let currentId = parseInt(contact.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }

    addContact(newContact: Contact) {
        if (!newContact) {
            return;
        }
        this.maxContactId++;
        newContact.id = this.maxContactId.toString();
        this.contacts.push(newContact);
        this.storeContacts(newContact);
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
            return;
        }

        const pos = this.contacts.findIndex(d => d.id === originalContact.id);

        if (pos < 0) {
            return;
        }

        newContact.id = originalContact.id;
        newContact._id = originalContact._id;

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // update database
        this.http.put('http://localhost:3000/contacts/' + originalContact.id,
            newContact, { headers: headers })
            .subscribe(
                (response: Response) => {
                    this.contacts[pos] = newContact;
                    this.sortAndSend();
                }
            );
    }
    
    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }

        const pos = this.contacts.findIndex(d => d.id === contact.id);

        if (pos < 0) {
            return;
        }

        // delete from database
        this.http.delete('http://localhost:3000/contacts/' + contact.id)
            .subscribe(
                (response: Response) => {
                    this.contacts = this.contacts.splice(pos, 1);
                    this.sortAndSend();
                }
            );
    }
    sortAndSend() {
        this.fetchContacts();
    }
}