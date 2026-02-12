import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../models/user';
import { map, Observable, tap } from 'rxjs';


export interface LoginCredentialsDTO {
  username: string,
  password: string
}


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private readonly LK_TOKEN = 'token';
  private readonly BASE_URL = 'http://localhost:3000';
  private readonly http = inject(HttpClient);

  user = signal<User | undefined | null>(undefined);

  login(credentials: LoginCredentialsDTO): Observable<void> {
    return this.http.post(this.BASE_URL + '/login/', credentials).pipe(
      tap((result: any) => {
        localStorage.setItem(this.LK_TOKEN, result['token']);
      })
    )
  }

  getUser(): Observable<User | null | undefined> {
    return this.http.get(this.BASE_URL + '/me/').pipe(
      tap((result: any) => {
        const user = Object.assign(new User(), result);
        this.user.set(user);
      }),
      map(() => this.user())
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.BASE_URL + '/logout/', {}).pipe(
      tap(() => {
        localStorage.removeItem(this.LK_TOKEN);
        this.user.set(null);
      })
    );
  }

}