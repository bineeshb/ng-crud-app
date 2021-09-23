import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auto-unsubscribe',
  template: ''
})
export class AutoUnsubscribeComponent implements OnDestroy {
  subscriptions: Subscription[] = [];

  constructor() { }

  protected addSubscriptions(...newSubscriptions: Subscription[]): void {
    this.subscriptions.push(...newSubscriptions);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
