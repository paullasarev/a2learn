import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { User }  from "../../entities/user";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'login',
  template: require('./login.component.html'),
  styles: [
    require('./login.styles.scss'),
    require('../../styles/form.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  @Output() public cancel = new EventEmitter();

  public user: User;

  constructor(
    private router: Router,
    private location: Location,
    private auth: AuthService
  ) {
  }

  public ngOnInit() {
    console.log('LoginComponent.ngOnInit')
    this.auth.logout();
    this.user = new User("", "");
  }

  public doLogin() {
    this.auth.login(this.user); //TODO: async result processing
    this.location.back();
  }

  public doCancel() {
    this.location.back();
  }

}
