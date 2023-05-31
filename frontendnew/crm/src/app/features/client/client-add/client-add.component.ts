import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/core/http/client.service';
import { UserService } from 'src/app/core/http/user.service';
import { ContractResponse } from 'src/app/shared/models/contract-response';
import { UserResponse } from 'src/app/shared/models/user-response';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  clientForm!: FormGroup;
  emails!: string[];
  users!: UserResponse[];

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private userService: UserService
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
      (emails : string[]) => {
        this.emails = emails;
      },
      (error) => {
        console.error('Error loading contact emails', error.message);
      }
    );
  }

  loadUsernames() {
    this.userService.getUsers().subscribe(
      (users: UserResponse[]) => {
        this.users = users;
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
          console.error(error.message);
          // Handle the error as needed
        }
      );
    }
    else {
      alert("Form is not valid");
    }

  }
}