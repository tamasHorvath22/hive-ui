import { Component, OnInit } from '@angular/core';
import { UserJwtModel } from 'src/app/model/user-jwt.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userJwtData: UserJwtModel | undefined;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.subscribeForUserData();
  }

  subscribeForUserData(): void {
    this.authenticationService.userJwtData.subscribe((userData: UserJwtModel ) => {
      if (userData.userId) {
        this.userJwtData = userData;
      }
    })
  }

}
