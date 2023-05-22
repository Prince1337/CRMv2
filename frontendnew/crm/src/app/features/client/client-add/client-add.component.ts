import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/core/http/client.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  clientForm!: FormGroup;
  contactEmails!: string[];
  usernames!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],
      contactEmail: ['', Validators.required],
      username: ['', Validators.required]
    });

    this.loadContactEmails();
    this.loadUsernames();
  }

  loadContactEmails() {
    this.clientService.getContactEmails().subscribe(
      (emails) => {
        this.contactEmails = emails;
      },
      (error) => {
        console.error('Error loading contact emails', error.message);
      }
    );
  }

  loadUsernames() {
    this.clientService.getUsernames().subscribe(
      (usernames) => {
        this.usernames = usernames;
      },
      (error) => {
        console.error('Error loading usernames', error.message);
      }
    );
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      this.clientService.createClient(clientData).subscribe(
        (response) => {
          console.log('Client created successfully', response);
          // Reset the form or perform any other necessary actions
          this.clientForm.reset();
        },
        (error) => {
          console.error('Error creating client', error.message);
          // Handle the error as needed
        }
      );
    }
  }
}