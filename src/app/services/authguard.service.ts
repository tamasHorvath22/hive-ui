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
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem(LocalstorageElement.HIVE_USER_TOKEN);
    if (!token) {
      return this.router.parseUrl('/auth');
    }
    const decodedToken: UserJwtModel = jwt_decode(token);
    if (decodedToken.firstname) {
      return true;
    } else {
      return this.router.parseUrl('/auth');
    }
  }
}
