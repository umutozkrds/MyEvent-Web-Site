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
  favourites: any[] = [];

  constructor(private router: Router, private eventService: EventsService) { }

  ngOnInit(): void {
    this.loadEvents();

    this.loadFavourites();
  }

  loadFavourites(): void {
    this.eventService.getFavourites().subscribe({
      next: (response: any) => {
        console.log('Received favourites:', response);
        // Ensure favourites is always an array from the response
        this.favourites = Array.isArray(response.favourites) ? response.favourites : [];
      },
      error: (error) => {
        console.error('Error loading favourites:', error);
        this.favourites = [];
      }
    });
  }

  isFavourite(eventId: string): boolean {
    // Add null check and ensure it's an array
    if (!Array.isArray(this.favourites)) {
      console.warn('Favourites is not an array:', this.favourites);
      return false;
    }
    return this.favourites.includes(eventId);
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events: EventModel[]) => {
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
    this.filteredEvents = [...this.events];

    if (filter === 'All') {
      return;
    }

    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const normalizeDate = (date: Date, isEndDate: boolean = false): Date => {
      const normalized = new Date(date);
      if (isEndDate) {
        normalized.setHours(23, 59, 59, 999);
      } else {
        normalized.setHours(0, 0, 0, 0);
      }
      return normalized;
    };

    const todayNormalized = normalizeDate(today);

    if (filter === 'Today') {
      this.filteredEvents = this.events.filter(event => {
        const eventDateNormalized = normalizeDate(new Date(event.date));
        const nextDayNormalized = new Date(todayNormalized);
        nextDayNormalized.setDate(nextDayNormalized.getDate() + 1);
        return eventDateNormalized >= todayNormalized && eventDateNormalized < nextDayNormalized;
      });
    } else if (filter === 'This Week') {
      const weekEndNormalized = normalizeDate(oneWeekFromNow, true);
      this.filteredEvents = this.events.filter(event => {
        const eventDateNormalized = normalizeDate(new Date(event.date));
        return eventDateNormalized >= todayNormalized && eventDateNormalized <= weekEndNormalized;
      });
    } else if (filter === 'This Month') {
      const monthEndNormalized = normalizeDate(oneMonthFromNow, true);
      this.filteredEvents = this.events.filter(event => {
        const eventDateNormalized = normalizeDate(new Date(event.date));
        return eventDateNormalized >= todayNormalized && eventDateNormalized <= monthEndNormalized;
      });
    } else {
      this.filteredEvents = this.events.filter(event => event.category === filter);
    }
    this.sortEvents();
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

  addFavourite(eventId: string): void {
    this.eventService.addFavourite(eventId).subscribe({
      next: () => {
        console.log('Event added to favorites:', eventId);
        // Reload favorites after adding
        this.loadFavourites();
      },
      error: (error) => {
        console.error('Error adding favorite:', error);
      }
    });
  }
}
