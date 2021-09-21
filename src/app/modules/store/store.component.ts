import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit {
  isMasterStore = true;

  constructor() { }

  ngOnInit(): void {
  }

}
