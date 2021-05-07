import { ApiariesModel } from './../../model/apiaries';
import { UserDataService } from './../../services/user-data.service';
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
  public apiaries?: ApiariesModel[];

  constructor(
    private authenticationService: AuthenticationService,
    private userDataServce: UserDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscribeForUserData();
    this.subscribeForApiaryData();
    await this.getApiaryData();
  }

  public async onAddApiary(): Promise<void> {
    const data = { name: this.apiaryName.value };
    await this.userDataServce.createApiary(data);
  }

  private async getApiaryData(): Promise<void> {
    await this.userDataServce.getApiaryData();
  }

  private subscribeForApiaryData(): void {
    this.userDataServce.apiaries.subscribe((apiaries: ApiariesModel[]) => {
      if (apiaries) {
        this.apiaries = apiaries;
      }
    })
  }

  private subscribeForUserData(): void {
    this.authenticationService.userJwtData.subscribe((userData: UserJwtModel ) => {
      if (userData.userId) {
        this.userJwtData = userData;
      }
    })
  }

}
