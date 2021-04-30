import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hive-ui';
  currentLang = 'en'

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.currentLang);
  }

  onToggle() {
    this.currentLang = this.currentLang === 'en' ? 'hu' : 'en'
    this.translate.use(this.currentLang);
  }
}
