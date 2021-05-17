import { SiteModel } from './../../model/site';
import { ApiaryModel } from './../../model/apiary';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiariesModel } from 'src/app/model/apiaries';
import { UserDataService } from 'src/app/services/user-data.service';

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

  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getApiaryData();
    this.subscribeForApiariesData();
    this.subscribeForApiaryData();
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

}
