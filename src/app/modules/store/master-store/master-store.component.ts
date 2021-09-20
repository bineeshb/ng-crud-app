import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-store',
  templateUrl: './master-store.component.html'
})
export class MasterStoreComponent implements OnInit {
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'quantity', header: 'Quantity' }
  ];
  availableItems = [
    { name: 'Item 1', quantity: 7 },
    { name: 'Item 2', quantity: 10 },
    { name: 'Item 3', quantity: 4 },
    { name: 'Item 4', quantity: 9 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
