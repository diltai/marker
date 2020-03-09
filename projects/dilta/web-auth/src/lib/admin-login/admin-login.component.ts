import { Component, OnInit } from '@angular/core';
import { Login } from '@dilta/platform-shared';
import { AuthLoginService } from './auth-login.service';

@Component({
  selector: 'auth-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AuthUserLoginComponent implements OnInit {
  constructor(
    private auth: AuthLoginService
  ) {}

  /**
   * dispath ation to login
   *
   */
  login(form: Login) {
    this.auth.login(form);
  }

  ngOnInit() {}
}
