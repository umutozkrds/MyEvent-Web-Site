import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { EventModel } from '../models/event.model';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [EventsService],
  standalone: false
})
export class CreateEventComponent {
  // This is just the design, functionality would be added here

  constructor(private eventsService: EventsService) { }

  onSubmit(form: NgForm) {
    const event: EventModel = {

      title: form.value.title,
      date: new Date(form.value.date),
      startTime: form.value.startTime,
      endTime: form.value.endTime,
      location: form.value.location,
      description: form.value.description,
      category: form.value.category
    }

      this.eventsService.createEvent(event).subscribe({
      next: (response) => {
        console.log('Event created successfully:', response);
        form.reset();
      },
      error: (error) => {
        console.error('Error creating event:', error);
      }
    });
  }
}
