import { ActivatedRoute, Router } from '@angular/router';
import { ApiariesModel } from './../../model/apiaries';
import { UserDataService } from './../../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { UserJwtModel } from 'src/app/model/user-jwt.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl } from '@angular/forms';
import { LocalstorageElement } from 'src/app/enums/localstorage-elements';

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
    private userDataService: UserDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getApiariesData();
    this.subscribeForUserData();
    this.subscribeForApiaryData();
  }

  public async onAddApiary(): Promise<void> {
    if (!this.apiaryName.value) {
      return;
    }
    const data = { name: this.apiaryName.value };
    await this.userDataService.createApiary(data);
  }

  public onSelectApiary(id: string): void {
    this.router.navigate(['../apiary', id], { relativeTo: this.route });
  }

  private async getApiariesData(): Promise<void> {
    const token = localStorage.getItem(LocalstorageElement.HIVE_USER_TOKEN);
    if (!token) {
      return;
    }
    await this.userDataService.getApiariesData();
  }

  private subscribeForApiaryData(): void {
    this.userDataService.apiaries.subscribe((apiaries: ApiariesModel[]) => {
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
