import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginStatus: { success: boolean; message: string } | null = null;
  private authStatusSub!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        console.log('Auth status changed:', authStatus);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log('Login attempt with:', form.value.email);
    this.isLoading = true;
    this.loginStatus = null;

    try {
      this.authService.login(
        form.value.email,
        form.value.password,
        (success, message) => {
          console.log('Login callback received:', success, message);
          this.isLoading = false;
          this.loginStatus = { success, message };
          if (success) {
            form.resetForm();
          }
        }
      );
    } catch (error) {
      console.error('Login error caught:', error);
      this.isLoading = false;
      this.loginStatus = { success: false, message: 'An error occurred during login' };
    }
  }
}
