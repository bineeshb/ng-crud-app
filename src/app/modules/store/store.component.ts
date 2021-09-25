import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutoUnsubscribeComponent } from '@shared/components/auto-unsubscribe/auto-unsubscribe.component';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent extends AutoUnsubscribeComponent implements OnInit {
  isMasterStore = true;
  userName: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userName = this.userService.userDetails?.userName || null;
    this.isMasterStore = this.userService.userDetails?.role === 'admin';
  }

  logoutUser(): void {
    const logoutSub = this.userService.logout().subscribe(() => this.router.navigate(['/login']));
    this.addSubscriptions(logoutSub);
  }
}
