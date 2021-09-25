import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { API_USER } from '@config/api-urls';
import { LoginRequest, LoginResponse, MessageResponse, SignupRequest } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly userKey = 'user';
  userDetails: BehaviorSubject<LoginResponse> = new BehaviorSubject(null);

  constructor(private readonly http: HttpClient) {
    const storedUser  = sessionStorage.getItem(this.userKey);

    this.userDetails.subscribe(value => {
      if (value) {
        sessionStorage.setItem(this.userKey, JSON.stringify(value));
      } else {
        sessionStorage.removeItem(this.userKey);
      }
    });

    if (storedUser) {
      this.userDetails.next(JSON.parse(storedUser));
    }
  }

  get isUserLoggedIn(): boolean {
    return !!(this.userDetails.value?.userName && this.userDetails.value.role);
  }

  signup(signupRequest: SignupRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(API_USER.signup, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_USER.login, loginRequest)
      .pipe(
        tap(response => this.userDetails.next(response))
      );
  }

  logout(): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(API_USER.logout)
      .pipe(
        tap(() => this.userDetails.next(null))
      );
  }
}
