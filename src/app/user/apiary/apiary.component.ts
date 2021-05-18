import { environment } from './../../../environments/environment';
import { AuthenticationService } from './../../services/authentication.service';
import { SiteModel } from './../../model/site';
import { ApiaryModel } from './../../model/apiary';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiariesModel } from 'src/app/model/apiaries';
import { UserDataService } from 'src/app/services/user-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-apiary',
  templateUrl: './apiary.component.html',
  styleUrls: ['./apiary.component.scss']
})
export class ApiaryComponent implements OnInit {

  public apiaryBase: ApiariesModel | undefined;
  public apiary: ApiaryModel | undefined;
  public siteName = new FormControl(null);
  public hiveNumber = new FormControl(null);
  public siteOfNewHive = new FormControl(null);
  public noSiteSelected = false;
  public filteredOptions: Observable<string[]> | undefined
  public invitedEmail = new FormControl(null);
  public inviteLink: string | undefined | null;

  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getApiaryData();
    this.subscribeForApiariesData();
    this.subscribeForApiaryData();
    this.watchForInviteTyping();
    this.subscribeForNoUserToInvite();
  }

  public isOwner(): boolean {
    return this.apiary?.owner === this.authenticationService.userJwtData.value.userId;
  }

  public async onAddHive(): Promise<void> {
    if (!this.siteOfNewHive.value) {
      this.noSiteSelected = true;
      return;
    }
    await this.userDataService.createHive({
      apiaryId: this.route.snapshot.params.apiaryId,
      siteId: this.siteOfNewHive.value
    });
    this.noSiteSelected = false;
  }

  public async onAddSite(): Promise<void> {
    if (!this.siteName.value) {
      return;
    }
    await this.userDataService.addSite({
      apiaryId: this.route.snapshot.params.apiaryId,
      siteName: this.siteName.value
    });
  }

  public async onCreateInviteLink(): Promise<void> {
    const token = await this.userDataService.createInviteLink({ apiaryId: this.route.snapshot.params.apiaryId });
    this.inviteLink = `${environment.uiBaseUrl}/auth/register/${token}`
  }

  public async onInvite(): Promise<void> {
    console.log(this.invitedEmail.value);
    await this.authenticationService.inviteRegisteredUser({
      apiaryId: this.route.snapshot.params.apiaryId,
      userId: this.authenticationService.userJwtData.value.userId,
      email: this.invitedEmail.value
    });
  }

  public onSelectEmail(event: any): void {
    console.log(event);
  }

  public onSelectSite(site: SiteModel): void {
    this.router.navigate(['./site', site._id], { relativeTo: this.route });
  }

  private async getApiaryData(): Promise<void> {
    await this.userDataService.getApiaryData(this.route.snapshot.params.apiaryId);
  }

  private subscribeForApiaryData(): void {
    this.userDataService.apiary.subscribe((apiary: ApiaryModel) => {
      if (apiary && apiary.name) {
        this.apiary = apiary;
      }
    })
  }

  private subscribeForApiariesData(): void {
    this.userDataService.apiaries.subscribe((apiaries: ApiariesModel[]) => {
      if (apiaries && apiaries.length) {
        const selectedApiary = apiaries.find(a => a.id === this.route.snapshot.params.apiaryId);
        if (selectedApiary) {
          this.apiaryBase = selectedApiary;
        } else {
          this.router.navigate(['user', 'profile']);
        }
      }
    })
  }

  private subscribeForNoUserToInvite(): void {
    this.authenticationService.noUserToInvite.subscribe(result => {
      if (result) {
        // TODO create modal
        alert('no user found');
      }
    })
  }

  private watchForInviteTyping(): void {
    this.invitedEmail.valueChanges.subscribe(value => {
      console.log('value change')
      this.authenticationService.getUsersContainingText({
        text: value,
        userId: this.authenticationService.userJwtData.value.userId,
        apiaryId: this.route.snapshot.params.apiaryId
      });
    })
    this.filteredOptions = this.authenticationService.usersToInvite;
  }

}
