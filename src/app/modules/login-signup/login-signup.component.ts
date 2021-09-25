import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginRequest } from '@interfaces/user';
import { UserService } from '@services/user.service';
import { AutoUnsubscribeComponent, ToastMessageService } from '@shared/components';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html'
})
export class LoginSignupComponent extends AutoUnsubscribeComponent implements OnInit {
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });
  signupForm = this.fb.group({
    name: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    // confirmPassword: [null, Validators.required]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toastMessageService: ToastMessageService,
    private readonly userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.userService.isUserLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  getLoginFieldErrors(fieldRef: string): ValidationErrors | null {
    return this.loginForm.get(fieldRef)?.dirty && this.loginForm.get(fieldRef)?.invalid
      ? (this.loginForm.get(fieldRef)?.errors || null)
      : null;
  }

  getSignupFieldErrors(fieldRef: string): ValidationErrors | null {
    return this.signupForm.get(fieldRef)?.dirty && this.signupForm.get(fieldRef)?.invalid
      ? (this.signupForm.get(fieldRef)?.errors || null)
      : null;
  }

  loginUser(): void {
    this.toastMessageService.clear();
    const loginSub = this.userService.login(this.loginForm.value).subscribe(response => {
      if (response.userName) {
        this.router.navigate(['/']);
      }
    });
    this.addSubscriptions(loginSub);
  }

  signupUser(): void {
    this.toastMessageService.clear();
    const signupSub = this.userService.signup(this.signupForm.value).subscribe(response => {
      this.signupForm.reset();
      this.toastMessageService.showSuccessMessages([ 'User account created successfully. Please use the credentials to login.' ]);
    });
    this.addSubscriptions(signupSub);
  }

  get loginUsername(): AbstractControl | null {
    return this.loginForm.get('username');
  }

  get loginPassword(): AbstractControl | null {
    return this.loginForm.get('password');
  }
}
