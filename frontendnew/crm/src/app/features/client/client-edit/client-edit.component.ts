import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/core/http/client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent {
  clientId!: number;
  editForm!: FormGroup;

  contactEmails!: string[];
  usernames!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      region: [''],
      country: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });

    const param=this.route.snapshot.paramMap.get('id');
    this.clientId = param?+param:0;

    this.loadContactEmails();
    this.loadUsernames();

    this.clientService.getClientById(this.clientId).subscribe((client : ClientRequest) => {
      this.editForm.patchValue(client);
    });    
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

  updateClient(): void {
    if (this.editForm.invalid) {
      return;
    }

    const clientRequest : ClientRequest = this.editForm.value;
    this.clientService.updateClient(this.clientId, clientRequest).subscribe((response : ClientResponse) => {
      console.log('Client updated successfully:', response);
      this.router.navigate(['/clients']);
    }, error => {
      console.error('Error updating client:', error.message);
      // Handle error or display error message
    });
  }
}

interface ClientRequest {
  firstName: string;
  lastName: string;
  street: string;
  postcode: string;
  city: string;
  region: string;
  country: string;
  contactEmail: string;
  username: string;
}


interface ClientResponse {
  id: number;
  firstName: string;
  lastName: string;
  created: Date;
  street: string;
  postcode: string;
  city: string;
  region: string;
  country: string;
  contactFirstname: string;
  contactLastname: string;
  contactEmail: string;
  contactPhone: string;
  username: string;
}