import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User }  from "../../../entities/user";
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-header',
  template: require('./app-header.component.html'),
  styles: [
    require('./app-header.styles.scss'),
    require('./logo.styles.scss'),
    require('./user.styles.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class AppHeaderComponent implements OnInit, OnDestroy{
  private authSubscription: Subscription;

  public username: string;
  public isLogged: boolean;

  constructor(
    private authService: AuthService
  ) {
  }

  public ngOnInit() {
    this.authSubscription = this.authService.auth.subscribe(this.gotData.bind(this));
    this.username = "";
    this.isLogged = false;
    this.authService.askAuth();
  }

  public ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  private gotData(user: User) {
    this.isLogged = !!user;
    this.username = (user && user.name) || "";
  }
}
