import { Component } from '@angular/core';
import { EventService } from 'src/app/core/http/event.service';
import { EventResponse } from 'src/app/shared/models/event-response';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
  events!: EventResponse[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      response => {
        this.events = response;
        console.log(response);
      },
      error => {
        // Fehlerbehandlung bei der Abrufung der Ereignisse durchführen
      }
    );
  }
}
