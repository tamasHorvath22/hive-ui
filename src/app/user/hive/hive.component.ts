import { HiveModel } from './../../model/hive';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiaryModel } from 'src/app/model/apiary';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hive',
  templateUrl: './hive.component.html',
  styleUrls: ['./hive.component.scss']
})
export class HiveComponent implements OnInit {

  public apiary: ApiaryModel | undefined;
  public hive: HiveModel | undefined
  public siteOfHive = new FormControl(null);

  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getApiaryData();
    this.subscribeForApiaryData();
  }

  public onSaveHiveSite(): void {
    // TODO
    console.log(this.siteOfHive.value);
  }

  private async getApiaryData(): Promise<void> {
    await this.userDataService.getApiaryData(this.route.snapshot.params.apiaryId);
  }

  private setCurrentSite(): void {
    this.hive = this.apiary?.hives.find(h => h._id.toString() === this.route.snapshot.params.hiveId)
    if (this.hive) {
      const site = this.apiary?.sites.find(s => s._id.toString() === this.hive?.site.toString());
      if (site) {
        this.siteOfHive.setValue(site._id);
      }
    }
  }

  private subscribeForApiaryData(): void {
    this.userDataService.apiary.subscribe((apiary: ApiaryModel) => {
      if (apiary && apiary.name) {
        this.apiary = apiary;
        this.setCurrentSite();
      }
    })
  }

}
