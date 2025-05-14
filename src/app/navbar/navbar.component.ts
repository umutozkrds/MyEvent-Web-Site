import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAuthenticated = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout() {
    this.authService.logout();
  }
}