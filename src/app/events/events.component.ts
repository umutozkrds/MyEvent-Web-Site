import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  standalone: false
})
export class EventsComponent implements OnInit {

  events: EventModel[] = [];
  searchTerm: string = '';
  activeFilter: string = 'All';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize events with all events
    this.events = [...this.events];
  }

  getFormattedTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getFormattedDay(date: Date): string {
    return date.getDate().toString();
  }

  getFormattedMonth(date: Date): string {
    return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  }

  viewEventDetails(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }

  setFilter(filter: string): void {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    this.activeFilter = filter;

    // Start with all events for each filter operation
    this.events = [...this.events];

    if (filter === 'Today') {
      this.events = this.events.filter(event => event.date.getDate() === today.getDate() &&
        event.date.getMonth() === today.getMonth() &&
        event.date.getFullYear() === today.getFullYear());
    } else if (filter === 'This Week') {
      this.events = this.events.filter(event => event.date >= today && event.date <= oneWeekFromNow);
    } else if (filter === 'This Month') {
      this.events = this.events.filter(event => event.date >= today && event.date <= oneMonthFromNow);
    } else if (filter !== 'All') {
      this.events = this.events.filter(event => event.category === filter);
    }
  }
}
