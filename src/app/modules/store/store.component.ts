import { Component, OnInit } from '@angular/core';

import { UserService } from '@services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit {
  isMasterStore = true;
  userName: string | null = null;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.userName = this.userService.userDetails?.userName || null;
    this.isMasterStore = this.userService.userDetails?.role === 'admin';
  }
}
