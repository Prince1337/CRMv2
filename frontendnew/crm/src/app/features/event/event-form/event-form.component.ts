import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/http/client.service';
import { EventService } from 'src/app/core/http/event.service';
import { ClientResponse } from 'src/app/shared/models/client-response';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventForm!: FormGroup;
  clients!: ClientResponse[];

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router,
    private clientService: ClientService) { }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      clientId: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAllClients().subscribe(
      (clients: ClientResponse[]) => {
        this.clients = clients;
      },
      (error) => {
        console.error('Error loading clients', error.message);
      }
    );
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      return;
    }

    this.eventService.addEvent(this.eventForm.value).subscribe(
      response => {
        // Event erfolgreich hinzugefügt, weitere Aktionen ausführen
        console.log(response);
        this.router.navigate(['/events']);
      },
      error => {
        // Fehler beim Hinzufügen des Events, Fehlerbehandlung durchführen
        console.error(error.message);
      }
    );
  }
}
