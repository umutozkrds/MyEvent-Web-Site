import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../models/event.model';
@Injectable({
    providedIn: 'root'
})
export class CreateEventService {
    constructor(private http: HttpClient) { }

    createEvent(event: EventModel) {
        return this.http.post('http://localhost:3000/api/events', event);
    }
}
