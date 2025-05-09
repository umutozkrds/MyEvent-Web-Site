import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryModel } from '../models/category.model';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredEvents = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: new Date('2023-08-15T18:00:00'),
      endTime: '11:00 PM',
      location: 'Central Park, New York',
      description: 'Join us for a night of amazing music under the stars with top artists and bands.',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Music',
      attendees: 120
    },
    {
      id: 3,
      title: 'Food & Wine Festival',
      date: new Date('2023-08-29T12:00:00'),
      endTime: '8:00 PM',
      location: 'Harbor Plaza, Seattle',
      description: 'Enjoy gourmet cuisine and fine wines from top chefs and wineries from around the world.',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Food',
      attendees: 210
    }
  ];

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
