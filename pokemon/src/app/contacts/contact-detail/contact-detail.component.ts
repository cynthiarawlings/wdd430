import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { contactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  @Input() contact: Contact;
  detailContact: Contact[];
  id: string;

  constructor(private contactService: contactService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params["id"];
        this.contact = this.contactService.getContact(this.id);
      }
    );
  }

  onEditContact() {
    this.router.navigate(["edit"], {relativeTo: this.route});
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    // this.router.navigate(["contacts"], {relativeTo: this.route});
    // this.router.navigateByUrl("contacts", {relativeTo: this.route});
    this.router.navigateByUrl('contacts');
  }
  
}
