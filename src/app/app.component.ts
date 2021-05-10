import { LanguageService } from './services/language.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseErrorDialogComponent } from './database-error-dialog/database-error-dialog.component';
import { UserDataService } from './services/user-data.service';
import { LocalstorageElement } from './enums/localstorage-elements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hive-ui';

  constructor(
    public dialog: MatDialog,
    private languageService: LanguageService,
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.languageService.setDefaultLanguage();
    await this.getApiariesData();
    this.subscribeForErrorEvent();
  }

  public onLogout(): void {
    this.authenticationService.logoutAndClearLocalStorage();
  }

  public onToggle() {
    this.languageService.toggleLanguage();
  }

  public openErrorDialog(): void {
    const dialogRef = this.dialog.open(DatabaseErrorDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public subscribeForErrorEvent(): void {
    this.userDataService.isDatabaseError.subscribe(isError => {
      if (isError) {
        this.openErrorDialog();
      }
    })
  }

  private async getApiariesData(): Promise<void> {
    const token = localStorage.getItem(LocalstorageElement.HIVE_USER_TOKEN);
    if (!token) {
      return;
    }
    await this.userDataService.getApiariesData();
  }

}
