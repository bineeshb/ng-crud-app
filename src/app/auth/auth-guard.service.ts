import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  canActivate(): boolean {
    if (!this.userService.isUserLoggedIn) {
      this.router.navigate([ '/login' ]);
    }

    return true;
  }
}
