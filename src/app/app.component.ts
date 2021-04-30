import { LanguageService } from './services/language.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hive-ui';

  constructor(
    private languageService: LanguageService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.languageService.setDefaultLanguage();
  }

  onToggle() {
    this.languageService.toggleLanguage();
  }

  onLogout(): void {
    this.authenticationService.logoutAndClearLocalStorage();
  }

}
