import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { LoginService } from './services/login/login-service';
import { MainMenu } from "./components/main-menu/main-menu";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MainMenu]
})
export class App {

  private readonly loginService = inject(LoginService);
  protected user = this.loginService.user;

}