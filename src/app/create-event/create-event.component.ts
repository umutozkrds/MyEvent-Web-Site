import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateEventService } from '../services/create-event.service';
import { EventModel } from '../models/event.model';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [CreateEventService],
  standalone: false
})
export class CreateEventComponent {
  // This is just the design, functionality would be added here

  constructor(private createEventService: CreateEventService) { }

  onSubmit(form: NgForm) {
    const event: EventModel = {
      id: 0,
      title: form.value.title,
      date: new Date(form.value.date),
      startTime: form.value.startTime,
      endTime: form.value.endTime,
      location: form.value.location,
      description: form.value.description,
      category: form.value.category
    }

    this.createEventService.createEvent(event).subscribe((response) => {
      console.log(response);
      form.reset();
    });
  }
}
