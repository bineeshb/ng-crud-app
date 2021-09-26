import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTE_PATHS } from '@config/constants';
import { AuthGuardService } from '@auth/auth-guard.service';

const routes: Routes = [
  {
    path: ROUTE_PATHS.login,
    loadChildren: () => import('@modules/login-signup/login-signup.module').then(m => m.LoginSignupModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: ROUTE_PATHS.home,
    loadChildren: () => import('@modules/store/store.module').then(m => m.StoreModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: ROUTE_PATHS.login,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
