import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserJwtModel } from 'src/app/model/user-jwt.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { LocalstorageElement } from '../enums/localstorage-elements';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem(LocalstorageElement.HIVE_USER_TOKEN);
    if (!token && state.url === '/auth') {
      return true;
    }
    if (!token) {
      // TODO define logic
      return true;
    }
    const decodedToken: UserJwtModel = jwt_decode(token);
    if (decodedToken.firstname) {
      // refreshes or passes user data to observable
      this.authenticationService.userJwtData.next(decodedToken);
      // if user tries to open /auth while logged in, redirected to profile page
      if (state.url === '/auth') {
        return this.router.parseUrl('/user/profile');
      } else {
        return true;
      }
    } else {
      return this.router.parseUrl('/auth');
    }
  }
}
