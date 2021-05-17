import { HiveComponent } from './hive/hive.component';
import { SiteComponent } from './site/site.component';
import { ApiaryComponent } from './apiary/apiary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'apiary/:apiaryId',
    component: ApiaryComponent
  },
  {
    path: 'apiary/:apiaryId/site/:siteId',
    component: SiteComponent
  },
  {
    path: 'apiary/:apiaryId/hive/:hiveId',
    component: HiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
