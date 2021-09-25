import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderService } from '@shared/components/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private noOfRequests = 0;

  constructor(private readonly loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.noOfRequests++;
    this.loaderService.setLoading(true);
    return next.handle(request)
      .pipe(
        finalize(() => {
          this.noOfRequests--;
          this.loaderService.setLoading(this.noOfRequests > 0);
        })
      );
  }
}
