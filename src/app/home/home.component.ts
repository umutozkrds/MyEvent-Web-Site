import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryModel } from '../models/category.model';
import { EventModel } from '../models/event.model';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredEvents: EventModel[] = [];

  categories: CategoryModel[] = [
    {
      id: 1,
      name: 'Music',
      count: 12, 
      icon: 'bi-music-note',
      color: '#e9f5ff'
    },
    {
      id: 2,
      name: 'Tech',
      count: 8,
      icon: 'bi-laptop',
      color: '#f8f9fa'
    },
    {
      id: 3,
      name: 'Food',
      count: 15,
      icon: 'bi-cup-hot',
      color: '#fff8e1'
    },
    {
      id: 4,
      name: 'Business',
      count: 10,
      icon: 'bi-briefcase',
      color: '#e8f5e9'
    },
    {
      id: 5,
      name: 'Art',
      count: 7,
      icon: 'bi-palette',
      color: '#fce4ec'
    },
    {
      id: 6,
      name: 'Sports',
      count: 14,
      icon: 'bi-dribbble',
      color: '#e3f2fd'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
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
}
