import { HiveModel } from './../../model/hive';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiaryModel } from 'src/app/model/apiary';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  public apiary: ApiaryModel | undefined;
  public hives: HiveModel[] | undefined = [];

  constructor(
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getApiaryData();
    this.subscribeForApiaryData()
  }

  public onSelectHive(hiveId: string) {
    this.router.navigate(['../../hive', hiveId], { relativeTo: this.route });
  }

  private findHivesForSite(siteId: string): void {
    this.hives = this.apiary?.hives.filter(hive => hive.site.toString() === siteId);
  }

  private async getApiaryData(): Promise<void> {
    await this.userDataService.getApiaryData(this.route.snapshot.params.apiaryId);
  }

  private subscribeForApiaryData(): void {
    this.userDataService.apiary.subscribe((apiary: ApiaryModel) => {
      if (apiary && apiary.name) {
        this.apiary = apiary;
        this.findHivesForSite(this.route.snapshot.params.siteId);
      }
    })
  }


}
