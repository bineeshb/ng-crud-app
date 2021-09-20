import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { LoginSignupComponent } from './login-signup.component';

const routes: Routes = [{
  path: '',
  component: LoginSignupComponent
}];

@NgModule({
  declarations: [
    LoginSignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ButtonModule,
    DividerModule,
    InputTextModule,
    PasswordModule
  ]
})
export class LoginSignupModule { }
