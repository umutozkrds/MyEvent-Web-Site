import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    signup(name: string, email: string, password: string): Observable<any> {
        const authData: User = { name: name, email: email, password: password };
        return this.http.post<{ message: string, userId: string }>('http://localhost:3000/api/users/signup', authData);
    }
}
