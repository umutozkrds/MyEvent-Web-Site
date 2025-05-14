import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string = '';
    private userId: string = '';
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.token;
    }

    getUserId() {
        return this.userId;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    signup(name: string, email: string, password: string): Observable<any> {
        const authData: User = { name: name, email: email, password: password };
        return this.http.post<{ message: string, userId: string }>('http://localhost:3000/api/users/signup', authData);
    }

    login(email: string, password: string, callback?: (success: boolean, message: string) => void) {
        const authData = { email: email, password: password };
        console.log('Login request initiated for:', email);

        this.http.post<{ token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/users/login', authData)
            .subscribe({
                next: response => {
                    console.log('Login response received:', response);
                    this.token = response.token;
                    if (this.token) {
                        this.userId = response.userId;
                        this.isAuthenticated = true;
                        this.authStatusListener.next(true);
                        const expiresInDuration = response.expiresIn;
                        this.saveAuthData(this.token, new Date(new Date().getTime() + expiresInDuration * 1000), this.userId);
                        this.router.navigate(['/']);
                        if (callback) {
                            callback(true, "Login successful! Redirecting to home page...");
                        }
                    }
                },
                error: error => {
                    console.error('Login error:', error);
                    this.authStatusListener.next(false);
                    if (callback) {
                        const message = error.error?.message || "Authentication failed. Please check your credentials.";
                        callback(false, message);
                    }
                }
            });
    }

    logout() {
        this.token = '';
        this.isAuthenticated = false;
        this.userId = '';
        this.authStatusListener.next(false);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.userId = authInformation.userId || '';
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
        }
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        if (!token || !expirationDate) {
            return null;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        }
    }
}
