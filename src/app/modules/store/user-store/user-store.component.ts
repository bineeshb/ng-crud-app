import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html'
})
export class UserStoreComponent implements OnInit {
  minQuantity = 1;
  availableItems = [
    { name: 'Item 1', quantity: 7 },
    { name: 'Item 2', quantity: 10 },
    { name: 'Item 3', quantity: 4 },
    { name: 'Item 4', quantity: 9 }
  ];
  storeItems = [
    { name: 'Item 1', quantity: 2 },
    { name: 'Item 3', quantity: 4 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
