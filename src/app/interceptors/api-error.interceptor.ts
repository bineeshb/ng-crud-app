import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastMessageService } from '@shared/components/toast-message/toast-message.service';
import { UserService } from '@services/user.service';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly toastMessageService: ToastMessageService,
    private readonly userService: UserService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError(httpError => {
          if (httpError.status === 401) {
            this.userService.userDetails.next(null);
            this.router.navigate(['/login']);
          }

          const { statusText: summary, message, error } = httpError;
          this.toastMessageService.showErrorMessages([{
            summary,
            detail: error?.message || message
          }]);

          return throwError(httpError);
        })
      );
  }
}
