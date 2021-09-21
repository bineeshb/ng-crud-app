import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html'
})
export class LoginSignupComponent implements OnInit {
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

  constructor(private readonly fb: FormBuilder) { }

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
    console.log(this.loginForm.value);
  }

  signupUser(): void {
    console.log(this.signupForm.value);
  }

  get username(): AbstractControl | null {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }
}
