import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '@auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@modules/login-signup/login-signup.module').then(m => m.LoginSignupModule)
  },
  {
    path: '',
    loadChildren: () => import('@modules/store/store.module').then(m => m.StoreModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
