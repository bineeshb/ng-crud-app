import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_USER } from '@config/api-urls';
import { LoginRequest, LoginResponse, MessageResponse, SignupRequest } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  signup(signupRequest: SignupRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(API_USER.signup, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_USER.login, loginRequest);
  }

  logout(): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(API_USER.logout);
  }
}
