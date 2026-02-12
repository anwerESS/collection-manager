import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LoginCredentialsDTO, LoginService } from '../../services/login/login-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnDestroy {

  private readonly formBuilder = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  private readonly subscriptions: Subscription = new Subscription();

  loginFormGroup = this.formBuilder.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required]]
  });
  invalidCredentials = signal(false);


  login() {
    const loginSubscription = this.loginService.login(
      this.loginFormGroup.value as LoginCredentialsDTO
    ).subscribe({
      next: () => this.getUserAndRedirect(),
      error: () => this.invalidCredentials.set(true)
    });
    this.subscriptions.add(loginSubscription);
  }

  getUserAndRedirect() {
    const getUserSubscription = this.loginService.getUser().subscribe(user => {
      this.navigateHome();
    });
    this.subscriptions.add(getUserSubscription);
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}