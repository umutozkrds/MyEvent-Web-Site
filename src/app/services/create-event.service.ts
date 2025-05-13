import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../models/event.model';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CreateEventService {
    private apiUrl = 'http://localhost:3000/api/events';

    constructor(private http: HttpClient) {

    }

    createEvent(event: EventModel): Observable<any> {
        return this.http.post(this.apiUrl, event);
    }

    getEvents(): Observable<EventModel[]> {
        return this.http.get<{ message: string, events: any[] }>(this.apiUrl).pipe(
            map((response) => {
                return response.events.map(event => {
                    return {
                        ...event,
                        date: new Date(event.date) // Convert string date to Date object
                    };
                });
            })
        );
    }
}
