import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '../contacts';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  data: Contact = {
    id: '',
    name: '',
    email: '',
    contact: '',
  };
  @Output() formSubmit = new EventEmitter<Contact>();

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: '',
      contact: '',
    });
  }
  ngOnInit(): void {
    console.log('On init called in contact form');

    this.contactService.getData().subscribe((data) => {
      if (data) {
        this.contactForm = this.formBuilder.group({
          id: data.id,
          name: data.name,
          email: data.email,
          contact: data.contact,
        });
        console.log(this.contactForm);
      }
    });
  }

  onSubmit(): void {
    console.log(this.contactForm.value);

    // add new contact
    if (
      this.contactForm.value.name === '' &&
      this.contactForm.value.email === '' &&
      this.contactForm.value.contact === ''
    ) {
      console.log('Hello blank contact form');

      const newContact: Contact = {
        id: '',
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        contact: this.contactForm.value.contact,
      };
      this.formSubmit.emit(newContact);
      this.contactForm.reset();
    }

    // update contact
    else {
      const updateContact: Contact = {
        id: this.contactForm.value.id,
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        contact: this.contactForm.value.contact,
      };
      this.formSubmit.emit(updateContact);
      this.contactForm.reset();
    }
  }
}
