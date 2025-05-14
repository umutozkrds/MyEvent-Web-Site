import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../models/event.model';
import { EventsService } from '../services/events.service';

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
  filteredEvents: EventModel[] = [];
  sortOption: string = 'dateAsc'; // Default sort option

  constructor(private router: Router, private createEventService: EventsService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.createEventService.getEvents().subscribe({
      next: (events: EventModel[]) => {
        console.log('Received events:', events);
        // Sort events by date (ascending order)
        this.events = events.sort((a: EventModel, b: EventModel) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
        this.filteredEvents = [...this.events];
        this.applyFilter(this.activeFilter);
      },
      error: (error: Error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  getFormattedTime(date: Date | string): string {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error('Error formatting time:', error);
      return '--:--';
    }
  }

  getFormattedDay(date: Date | string): string {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.getDate().toString();
    } catch (error) {
      console.error('Error formatting day:', error);
      return '--';
    }
  }

  getFormattedMonth(date: Date | string): string {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    } catch (error) {
      console.error('Error formatting month:', error);
      return '---';
    }
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilter(filter);
  }

  applyFilter(filter: string): void {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Start with all events for each filter operation
    this.filteredEvents = [...this.events];

    if (filter === 'Today') {
      this.filteredEvents = this.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === today.getDate() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getFullYear() === today.getFullYear();
      });
    } else if (filter === 'This Week') {
      this.filteredEvents = this.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneWeekFromNow;
      });
    } else if (filter === 'This Month') {
      this.filteredEvents = this.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneMonthFromNow;
      });
    } else if (filter !== 'All') {
      this.filteredEvents = this.events.filter(event => event.category === filter);
    }
  }

  sortEvents(): void {
    switch (this.sortOption) {
      case 'dateAsc':
        this.filteredEvents.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case 'dateDesc':
        this.filteredEvents.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'titleAsc':
        this.filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        this.filteredEvents.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
  }
}
