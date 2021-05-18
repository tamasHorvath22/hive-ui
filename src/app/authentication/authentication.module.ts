import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoggingInComponent } from './logging-in/logging-in.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AuthenticationComponent, LoggingInComponent, LogoutPageComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    TranslateModule,
    MatButtonModule
  ]
})
export class AuthenticationModule {}
