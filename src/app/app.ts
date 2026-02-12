import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { LoginService } from './services/login/login-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MatButton]
})
export class App implements OnDestroy {

  private readonly loginService = inject(LoginService);
  protected user = this.loginService.user;
  private readonly router = inject(Router);

  private logoutSubscription: Subscription | null = null;

  logout() {
    this.logoutSubscription = this.loginService.logout().subscribe({
      next: () => this.router.navigate(['login']),
      error: () => this.router.navigate(['login']),
    });
  }

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }

}