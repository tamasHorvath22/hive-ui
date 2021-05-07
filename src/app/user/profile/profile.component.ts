import { Component, OnInit } from '@angular/core';
import { UserJwtModel } from 'src/app/model/user-jwt.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public apiaryName = new FormControl(null);
  public userJwtData: UserJwtModel | undefined;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.subscribeForUserData();
  }

  public onAddApiary(): void {
    console.log(this.apiaryName.value)
  }

  private subscribeForUserData(): void {
    this.authenticationService.userJwtData.subscribe((userData: UserJwtModel ) => {
      if (userData.userId) {
        this.userJwtData = userData;
      }
    })
  }

}
