import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthUser }  from "../../../entities/auth-user";
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;

  public username: string = "";
  public isLogged: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService
  ) {
  }

  public ngOnInit() {
    this.authSubscription = this.authService.auth.subscribe(this.gotData.bind(this));
    this.authService.askAuth();
  }

  public ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  private gotData(auth: AuthUser) {
    this.isLogged = auth.isLogged;
    this.username = auth.username;
    this.changeDetectorRef.markForCheck();
  }
}
