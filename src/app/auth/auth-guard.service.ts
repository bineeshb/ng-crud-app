import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { ROUTE_PATHS } from '@config/constants';
import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isPathLogin = !!(route.url?.length && route.url[0].path === ROUTE_PATHS.login);

    if (isPathLogin && this.userService.isUserLoggedIn) {
      this.router.navigate([ ROUTE_PATHS.home ]);
      return false;
    } else if (!isPathLogin && !this.userService.isUserLoggedIn) {
      this.router.navigate([ ROUTE_PATHS.login ]);
      return false;
    }

    return true;
  }
}
