import {
  Component, ViewEncapsulation,OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { assign } from 'lodash';
import { Observable } from "rxjs";

import { User }  from "../../entities/user";
import { AuthUser }  from "../../entities/auth-user";
import { AuthService } from '../../services/auth-service';
import { LoadBlockService } from '../../services/load-block';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState, selector } from '../../store/store';
import { AuthState } from '../../store/reducers/auth';
import { AuthAction, LogoutAction } from '../../store/actions/auth';

@Component({
  selector: 'login',
  template: require('./login.component.html'),
  styles: [
    require('./login.styles.scss'),
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  private loadSubscription: Subscription;
  private loadIsActive: boolean = false;
  public error: Error;

  public user: User;
  public form: FormGroup;

  private authState$: Observable<AuthState>;

  constructor(
    private router: Router,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private loadBlockService: LoadBlockService,
    private store: Store<AppState>,
    // private authService: AuthService
  ) {
      this.form = this.formBuilder.group({
        name: ['',[Validators.required, Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.maxLength(20)]],
      });

    this.authState$ = store.select(selector.auth);
  }

  public ngOnInit() {
    // this.authSubscription = this.authService.auth.subscribe(this.gotData.bind(this), this.gotError.bind(this));
    this.loadSubscription = this.loadBlockService.load.subscribe(this.gotLoadData.bind(this));

    this.authState$.subscribe(this.onAuthState.bind(this), this.gotError.bind(this));

    // this.authService.logout();
    this.store.dispatch(new LogoutAction());
    this.user = new User("", "");
    this.form.patchValue(this.user);
  }

  public ngOnDestroy() {
    // this.authSubscription.unsubscribe();
    this.loadSubscription.unsubscribe();
  }

  private gotLoadData(active) {
    this.loadIsActive = active;
  }

  private onAuthState(state: AuthState) {
    this.gotData(state.user, state.redirectUrl);
  }

  private gotData(auth: AuthUser, redirectUrl: string) {
    this.changeDetectorRef.markForCheck();
    let error = auth.error;
    if (error) {
      this.error = error;
    } else if (auth.user) {
      if (redirectUrl) {
        this.router.navigate([redirectUrl]);
      } else {
        this.location.back();
      }
    }
  }

  private gotError(error) {
    this.changeDetectorRef.markForCheck();
    this.router.navigate(['error', (error && error.message)]);
  }

  public doLogin() {
    if (this.loadIsActive) {
      return;
    }
    this.error = null;
    assign(this.user, this.form.value);
    // this.authService.login(this.user);
    this.store.dispatch(new AuthAction(this.user));
  }

  public doCancel() {
    if (this.loadIsActive) {
      return;
    }
    this.location.back();
  }

  public isValid(): boolean{
    return this.form.valid;
  }
}
