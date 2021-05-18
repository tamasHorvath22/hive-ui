import { LocalstorageElement } from './../enums/localstorage-elements';
import { UserDataService } from 'src/app/services/user-data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDto } from '../authentication/user-dto.model';
import jwt_decode from 'jwt-decode';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserJwtModel } from '../model/user-jwt.model';
import { ServerError } from './user-data.service';
import { ResponseMessages } from '../enums/response-messages';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userJwtData = new BehaviorSubject<UserJwtModel>({} as UserJwtModel);
  public usersToInvite = new BehaviorSubject<string[]>([]);
  public noUserToInvite = new BehaviorSubject<boolean>(false);
  private userAuthData: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService
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

  public async getJwtToken(): Promise<void> {
    this.authService.user$.subscribe(async (data) => {
      this.userAuthData = data;
      if (!this.userAuthData) {
        return;
      }
      const regToken = localStorage.getItem(LocalstorageElement.REG_TOKEN);
      const result = await this.authentication({
        firstname: this.userAuthData.given_name,
        lastname: this.userAuthData.family_name,
        nickname: this.userAuthData.nickname,
        token: regToken
      });
      if (result) {
        localStorage.removeItem(LocalstorageElement.REG_TOKEN);
        this.router.navigate(['user', 'profile']);
        return;
      } else {
        this.logoutAndClearLocalStorage();
        this.router.navigate(['auth']);
        return;
      }
    });
  }

  public async getUsersContainingText(data: { text: string, userId: string, apiaryId: string }): Promise<void> {
    const url = `${environment.serverBaseUrl}/get-users-by-text`;
    this.userDataService.isLoading.next(true);
    try {
      const response = await this.http.post<string[] | ServerError>(url, data).toPromise();
      if (!this.isError(response)) {
        this.usersToInvite.next(response);
      } else {
        // TODO error handling
      }
      this.userDataService.isLoading.next(false);
    } catch (err) {
      console.log(err);
      this.userDataService.isDatabaseError.next(true);
      this.userDataService.isLoading.next(false);
    }
  }

  public async inviteRegisteredUser(data: { apiaryId: string, userId: string, email: string }): Promise<void> {
    const url = `${environment.serverBaseUrl}/invite-registered-user`;
    this.userDataService.isLoading.next(true);
    try {
      const response = await this.http.post<string[] | ServerError>(url, data).toPromise();
      if (!this.isError(response)) {
        // TODO apiary response?
        // this.usersToInvite.next(response);
      } else if (this.isError(response) && response.error === ResponseMessages.NOT_FOUND) {
        // TODO create info popup
        this.noUserToInvite.next(true);
      }
      this.userDataService.isLoading.next(false);
    } catch (err) {
      console.log(err);
      this.userDataService.isDatabaseError.next(true);
      this.userDataService.isLoading.next(false);
    }
  }

  private isError(elem: any): elem is ServerError {
    return (<ServerError>elem).error !== undefined;
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
