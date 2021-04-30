import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDto } from '../authentication/user-dto.model';
import jwt_decode from 'jwt-decode';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserJwtModel } from '../model/user-jwt.model';
import { LocalstorageElement } from '../enums/localstorage-elements';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userJwtData = new BehaviorSubject<UserJwtModel>({} as UserJwtModel);
  private userAuthData: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  public async authentication(userData: UserDto): Promise<boolean> {
    const url = `${environment.serverBaseUrl}/auth/google`;
    try {
      const response = await this.http.post(url, userData, { responseType: 'text' }).toPromise();
      if (response) {
        localStorage.setItem(LocalstorageElement.HIVE_USER_TOKEN, response);
        const decodedToken = jwt_decode(response);
        localStorage.setItem(LocalstorageElement.HIVE_USER, JSON.stringify(decodedToken));
        this.userJwtData.next(decodedToken as UserJwtModel);
        return true;
      }
    } catch (err) {
      console.log(err);
      this.logoutAndClearLocalStorage();
      return false;
    }
    this.logoutAndClearLocalStorage();
    return false;
  }

  async getJwtToken(): Promise<void> {
    this.authService.user$.subscribe(async (data) => {
      this.userAuthData = data;
      if (!this.userAuthData) {
        return;
      }
      const result = await this.authentication({
        firstname: this.userAuthData.given_name,
        lastname: this.userAuthData.family_name,
        nickname: this.userAuthData.nickname
      });
      if (result) {
        this.router.navigate(['user', 'profile']);
        return;
      } else {
        this.logoutAndClearLocalStorage();
        this.router.navigate(['auth']);
        return;
      }
    });
  }

  public onLogin(): void {
    this.authService.loginWithRedirect();
  }

  public logoutAndClearLocalStorage(): void {
    localStorage.removeItem(LocalstorageElement.HIVE_USER_TOKEN);
    localStorage.removeItem(LocalstorageElement.HIVE_USER);
    this.authService.logout();
  }
}
