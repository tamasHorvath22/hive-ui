import { LanguageService } from './services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hive-ui';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.setDefaultLanguage();
  }

  onToggle() {
    this.languageService.toggleLanguage();
  }

}
