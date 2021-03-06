import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.authenticationService.onLogin();
  }

  onLogout(): void {
    this.authenticationService.logoutAndClearLocalStorage();
  }
}
