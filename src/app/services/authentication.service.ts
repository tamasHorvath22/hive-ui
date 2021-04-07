import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDto } from '../authentication/user-dto.model';
import jwt_decode from 'jwt-decode';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
        localStorage.setItem('hiveUserToken', response);
        localStorage.setItem('hiveUser', JSON.stringify(jwt_decode(response)));
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
    localStorage.removeItem('hiveUserToken');
    localStorage.removeItem('hiveUser');
    this.authService.logout();
  }
}
