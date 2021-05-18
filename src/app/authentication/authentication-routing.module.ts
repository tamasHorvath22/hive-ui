import { RegisterComponent } from './register/register.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoggingInComponent } from './logging-in/logging-in.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent
  },
  {
    path: 'logging-in',
    component: LoggingInComponent
  },
  {
    path: 'logged-out',
    component: LogoutPageComponent
  },
  {
    path: 'register/:token',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
