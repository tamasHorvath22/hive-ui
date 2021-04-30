import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoggingInComponent } from './logging-in/logging-in.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AuthenticationComponent, LoggingInComponent, LogoutPageComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    TranslateModule
  ]
})
export class AuthenticationModule {}
