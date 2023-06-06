import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/core/http/client.service';
import { EventService } from 'src/app/core/http/event.service';
import { ClientResponse } from 'src/app/shared/models/client-response';
import { EventResponse } from 'src/app/shared/models/event-response';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent {

  eventId!: number;
  eventForm!: FormGroup;
  event!: EventResponse;
  clients!: ClientResponse[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    this.initializeForm();
    this.getEventById();
    this.loadClients();
  }

  initializeForm(): void {
    this.eventForm = this.formBuilder.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      clientId: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  getEventById(): void {
    this.eventService.getEventById(this.eventId).subscribe(
      (response: EventResponse) => {
        this.event = response;
        this.eventForm.patchValue({
          type: this.event.type,
          title: this.event.title,
          clientId: this.event.clientName,
          time: this.event.time
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
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

  updateEvent(): void {
    if (this.eventForm.valid) {
      const updatedEvent = {
        type: this.eventForm.value.type,
        title: this.eventForm.value.title,
        clientId: this.eventForm.value.clientId,
        time: this.eventForm.value.time
      };

      this.eventService.updateEvent(this.eventId, updatedEvent).subscribe(
        (response: EventResponse) => {
          console.log('Event updated successfully:', response);
          // We can redirect to the event details page or show a success message
          this.router.navigate(['/events']);
        },
        (error: any) => {
          console.log('Error updating event:', error);
        }
      );
    }
  }
}
