import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/core/http/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      clientId: ['', Validators.required],
      time: ['', Validators.required]
    });
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
