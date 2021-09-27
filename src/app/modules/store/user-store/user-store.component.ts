import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { ExistingItem } from '@interfaces';
import { MasterStoreService, UserStoreService } from '@services';
import { AutoUnsubscribeComponent, ToastMessageService } from '@shared/components';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html'
})
export class UserStoreComponent extends AutoUnsubscribeComponent implements OnInit {
  minQuantity = 1;
  availableItems: ExistingItem[] = [];
  storeItems: ExistingItem[] = [];

  constructor(
    private readonly masterStoreService: MasterStoreService,
    private readonly toastMessageService: ToastMessageService,
    private readonly userStoreService: UserStoreService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchAndShowAvailableItems();
    this.fetchAndShowStoreItems();
  }

  fetchAndShowAvailableItems(): void {
    const itemsSub = this.masterStoreService.getItems().subscribe(response => this.availableItems = response.items);
    this.addSubscriptions(itemsSub);
  }

  fetchAndShowStoreItems(): void {
    const storeItemsSub = this.userStoreService.getItems().subscribe(response => this.storeItems = response.items);
    this.addSubscriptions(storeItemsSub);
  }

  buyItemQuantities(item: ExistingItem, field: NgModel): void {
    const quantity = field.value;
    this.toastMessageService.clear();
    const buyItemsSub = this.masterStoreService.buyItemQuantities(item.id, { quantity }).subscribe(
      () => {
        this.fetchAndShowAvailableItems();
        this.fetchAndShowStoreItems();
        this.toastMessageService.showSuccessMessages([{
          summary: 'Item Bought',
          detail: `${quantity} '${item.name}' bought successfully !`
        }]);
      },
      () => field.control.setValue(this.minQuantity)
    );
    this.addSubscriptions(buyItemsSub);
  }

  sellItemQuantities(item: ExistingItem, field: NgModel): void {
    const quantity = field.value;
    this.toastMessageService.clear();
    const sellItemsSub = this.userStoreService.sellItemQuantities(item.id, { quantity }).subscribe(
      () => {
        this.fetchAndShowAvailableItems();
        this.fetchAndShowStoreItems();
        this.toastMessageService.showSuccessMessages([{
          summary: 'Item Sold',
          detail: `${quantity} '${item.name}' sold successfully !`
        }]);
      },
      () => field.control.setValue(this.minQuantity)
    );
    this.addSubscriptions(sellItemsSub);
  }
}
