import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { LoginService } from '../../services/login/login-service';


export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.user() === undefined) {
    return loginService.getUser().pipe(
      map(user => user ? true : router.createUrlTree(['login'])), // createUrlTree préféré danss les guards au lieu de navigate
      catchError(() => of(router.createUrlTree(['login']))) // of cree un observable apartir d'une valeur (retourne un UrlTree, PAS un Observable.)
    );
  }

  return loginService.user()
    ? true
    : router.createUrlTree(['login']);
};
