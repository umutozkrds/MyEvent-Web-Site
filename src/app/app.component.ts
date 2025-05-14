import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MyEvent';
  isAuthenticated = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
