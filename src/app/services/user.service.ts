import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { API_USER } from '@config/api-urls';
import { LoginRequest, LoginResponse, MessageResponse, SignupRequest } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetails: LoginResponse | null = null;

  constructor(private readonly http: HttpClient) { }

  signup(signupRequest: SignupRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(API_USER.signup, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_USER.login, loginRequest)
      .pipe(
        tap(response => this.userDetails = response)
      );
  }

  logout(): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(API_USER.logout)
      .pipe(
        tap(() => this.userDetails = null)
      );
  }
}
