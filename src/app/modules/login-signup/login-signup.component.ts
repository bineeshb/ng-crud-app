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
    const loginRequest: LoginRequest = {
      username: this.loginUsername?.value,
      password: this.loginPassword?.value
    };
    const loginSub = this.userService.login(loginRequest).subscribe(response => {
      if (response.userName) {
        this.router.navigate(['/']);
      }
    });
    this.addSubscriptions(loginSub);
  }

  signupUser(): void {
    this.toastMessageService.clear();
    console.log(this.signupForm.value);
  }

  get loginUsername(): AbstractControl | null {
    return this.loginForm.get('username');
  }

  get loginPassword(): AbstractControl | null {
    return this.loginForm.get('password');
  }
}
