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

  constructor(
    private route: ActivatedRoute,
    private userDataServce: UserDataService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getApiaryData();
    this.subscribeForApiariesData();
    this.subscribeForApiaryData();
  }

  public async onAddSite(): Promise<void> {
    if (!this.siteName.value) {
      return;
    }
    await this.userDataServce.addSite({
      apiaryId: this.route.snapshot.params.id,
      siteName: this.siteName.value
    });
  }

  public onSelectSite(siteName: string): void {
    console.log(siteName);
  }

  private async getApiaryData(): Promise<void> {
    await this.userDataServce.getApiaryData(this.route.snapshot.params.id);
  }

  private subscribeForApiaryData(): void {
    this.userDataServce.apiary.subscribe((apiary: ApiaryModel) => {
      if (apiary && apiary.name) {
        this.apiary = apiary;
      }
    })
  }

  private subscribeForApiariesData(): void {
    this.userDataServce.apiaries.subscribe((apiaries: ApiariesModel[]) => {
      if (apiaries && apiaries.length) {
        const selectedApiary = apiaries.find(a => a.id === this.route.snapshot.params.id);
        if (selectedApiary) {
          this.apiaryBase = selectedApiary;
        } else {
          this.router.navigate(['user', 'profile']);
        }
      }
    })
  }

}
