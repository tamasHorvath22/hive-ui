import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, @Inject(LOCALE_ID) public locale: string) {}

  ngOnInit(): void {
    console.log(window.navigator);
  }

  onLogin(): void {
    this.authenticationService.onLogin();
  }

  onLogout(): void {
    this.authenticationService.logoutAndClearLocalStorage();
  }
}
