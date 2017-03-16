import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { User }  from "../../entities/user";
import { AuthUser }  from "../../entities/auth-user";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'login',
  template: require('./login.component.html'),
  styles: [
    require('./login.styles.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;

  public user: User;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
  }

  public ngOnInit() {
    this.authSubscription = this.authService.auth.subscribe(this.gotData.bind(this), this.gotError.bind(this));
    this.authService.logout();
    this.user = new User("", "");
  }

  public ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  private gotData(auth: AuthUser) {
    let error = auth.error;
    if (error) {
      this.router.navigate(['error', (error && error.message)]);
    } else if (auth.user) {
      this.location.back();
    }
  }

  private gotError(error) {
    this.router.navigate(['error', (error && error.message)]);
  }

  public doLogin() {
    this.authService.login(this.user);
  }

  public doCancel() {
    this.location.back();
  }

}
