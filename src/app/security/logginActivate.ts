import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Route,
} from '@angular/router';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private loginService: LoginService) {}

  checkAuthentication(path: string): boolean {
    const loggedIn = this.loginService.isLoggedIn();
    if (!loggedIn) {
      this.loginService.handleLogin(`/${path}`);
    }
    return loggedIn;
  }

  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(
    activateRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean {
    return this.checkAuthentication(activateRoute.routeConfig.path);
  }
}
