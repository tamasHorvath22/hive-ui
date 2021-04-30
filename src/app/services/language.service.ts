import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = 'en';
  private possibleLanguages = ['hu', 'en'];

  constructor(private translate: TranslateService) {}

  toggleLanguage(): void {
    this.currentLang = this.currentLang === 'en' ? 'hu' : 'en'
    this.translate.use(this.currentLang);
  }

  setDefaultLanguage(): void {
    const userLocale = this.getUsersLocale(this.currentLang);
    if (this.possibleLanguages.includes(userLocale)) {
      this.currentLang = userLocale;
    }
    this.translate.use(this.currentLang);
  }

  private getUsersLocale(defaultValue: string): string {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return defaultValue;
    }
    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[wn.languages.length - 1] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    lang = lang.substring(0, 2);
    return lang;
  }
}
