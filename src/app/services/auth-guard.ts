import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { AuthService } from './auth-service';
import { Observable } from "rxjs";

import { Store } from '@ngrx/store';
import { AppState, selector } from '../store/store';
import { AuthState } from '../store/reducers/auth';
import { SetRedirectUrlAction } from '../store/actions/auth';

@Injectable()
export class AuthGuard  implements CanActivate, CanActivateChild {
  private authState$: Observable<AuthState>;
  private authState: AuthState;

  constructor(
    // private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.authState$ = store.select(selector.auth);
    this.authState$.subscribe(this.onAuthState.bind(this));
  }

  private onAuthState(state: AuthState) {
    this.authState = state;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.authState.isLogged) {
      return true;
    }

    this.store.dispatch(new SetRedirectUrlAction(url));
    // if (this.authService.isLoggedIn()) {
    //   return true;
    // }
    // this.authService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }

}
