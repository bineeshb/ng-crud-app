import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new BehaviorSubject<boolean>(false);

  setLoading(isShowLoading = false) {
    this.isLoading.next(isShowLoading);
  }
}
