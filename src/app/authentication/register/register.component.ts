import { LocalstorageElement } from './../../enums/localstorage-elements';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  public onRegister(): void {
    const token = this.route.snapshot.params.token
    localStorage.setItem(LocalstorageElement.REG_TOKEN, token);
    this.authenticationService.onLogin();
  }

}
