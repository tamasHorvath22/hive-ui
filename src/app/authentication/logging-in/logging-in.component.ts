import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.scss']
})
export class LoggingInComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {}

  async ngOnInit(): Promise<void> {
    await this.handleLogin();
  }

  async handleLogin(): Promise<void> {
    await this.authenticationService.getJwtToken();
  }
}
