import { HoneyQuality } from './../../enums/honey-quality';
import { HiveModel } from './../../model/hive';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiaryModel } from 'src/app/model/apiary';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-hive',
  templateUrl: './hive.component.html',
  styleUrls: ['./hive.component.scss']
})
export class HiveComponent implements OnInit {

  public apiary: ApiaryModel | undefined;
  public hive: HiveModel | undefined
  public siteOfHive = new FormControl(null);
  public honeyQualitySelected = new FormControl(null);
  public honeyQuality: string[] = Object.values(HoneyQuality);

  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.setHoneyQualityOptions();
    await this.getApiaryData();
    this.subscribeForApiaryData();
  }

  public onHoneyQualityChange(event: MatSelectChange): void {
    console.log(event);
  }

  public async onSaveHiveSite(): Promise<void> {
    // TODO
    // this.honeyQualitySelected.setValue(null);
    console.log(this.siteOfHive.value);

    const data = {
      apiaryId: this.route.snapshot.params.apiaryId,
      hiveId: this.route.snapshot.params.hiveId,
      siteId: this.siteOfHive.value
    }
    console.log(data)
    await this.userDataService.updateHive(data);
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

  private setHoneyQualityOptions(): void {
    this.honeyQuality = Object.values(HoneyQuality);
    this.honeyQuality.splice(0, 0, '');
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
