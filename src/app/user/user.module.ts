import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiaryComponent } from './apiary/apiary.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ApiaryComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
