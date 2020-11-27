import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { User } from './user.model';
import { NavigationEnd, Router } from '@angular/router';
import { SCORE_API } from '../app.api';
import { NotificationService } from '../shared/message/notification.service';

@Injectable()
export class LoginService {
  user: User;
  lastUrl: string;
  userNameEvent$ = new EventEmitter<string>();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => (this.lastUrl = e.url));
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<any>(`${SCORE_API}/user/login`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((resp) => {
          console.log(resp),
            (this.user = {
              name: resp.user.name,
              email: resp.user.email,
              token: resp.token,
            }),
            this.userNameEvent$.emit(this.user.name);
        })
      );
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }

  logout() {
    this.user = undefined;
  }
}
