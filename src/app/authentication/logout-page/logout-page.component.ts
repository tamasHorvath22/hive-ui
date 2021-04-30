import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onGoToLogin(): void {
    this.router.navigate(['auth']);
  }

}
