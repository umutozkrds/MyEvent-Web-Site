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
  allEvents: EventModel[] = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: new Date('2025-05-15T18:00:00'),
      endTime: '11:00 PM',
      location: 'Central Park, New York',
      description: 'Join us for a night of amazing music under the stars with top artists and bands.',
      category: 'Music'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      date: new Date('2025-05-27T10:00:00'),
      endTime: '4:00 PM',
      location: 'Tech Hub, San Francisco',
      description: 'Learn the latest web development techniques from industry experts in this hands-on workshop.',
      category: 'Tech'
    },
    {
      id: 3,
      title: 'Food & Wine Festival',
      date: new Date('2025-05-29T12:00:00'),
      endTime: '8:00 PM',
      location: 'Harbor Plaza, Seattle',
      description: 'Enjoy gourmet cuisine and fine wines from top chefs and wineries from around the world.',
      category: 'Food'
    },
    {
      id: 4,
      title: 'Networking Mixer',
      date: new Date('2025-06-10T19:00:00'),
      endTime: '10:00 PM',
      location: 'Grand Hotel, Chicago',
      description: 'Connect with professionals in your industry at this exclusive networking event.',
      category: 'Business'
    }
  ];

  events: EventModel[] = [];
  searchTerm: string = '';
  activeFilter: string = 'All';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize events with all events
    this.events = [...this.allEvents];
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
    this.events = [...this.allEvents];

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
