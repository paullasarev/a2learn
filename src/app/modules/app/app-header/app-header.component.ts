import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from "rxjs";

import { AuthUser }  from "../../../entities/auth-user";
import { AuthService } from '../../../services/auth-service';

import { Store } from '@ngrx/store';
import { AppState, selector } from '../../../store/store';
import { AuthState } from '../../../store/reducers/auth';
import { AuthAction, LogoutAction } from '../../../store/actions/auth';
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
  private authState$: Observable<AuthState>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>,
    // private authService: AuthService
  ) {
    this.authState$ = store.select(selector.auth);
  }

  public ngOnInit() {
    this.authState$.subscribe(this.onAuthState.bind(this));
    // this.authSubscription = this.authService.auth.subscribe(this.gotData.bind(this));
    // this.authService.askAuth();
  }

  public ngOnDestroy() {
    // this.authSubscription.unsubscribe();
  }

  private onAuthState(state: AuthState) {
    this.gotData(state.user);
  }

  private gotData(auth: AuthUser) {
    this.isLogged = auth.isLogged;
    this.username = auth.username;
    this.changeDetectorRef.markForCheck();
  }
}
