import {
  Component, ViewEncapsulation,OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { assign } from 'lodash';

import { User }  from "../../entities/user";
import { AuthUser }  from "../../entities/auth-user";
import { AuthService } from '../../services/auth-service';
import { LoadBlockService } from '../../services/load-block';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

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

  constructor(
    private router: Router,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private loadBlockService: LoadBlockService,
    private authService: AuthService
  ) {
      this.form = this.formBuilder.group({
        name: ['',[Validators.required, Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.maxLength(20)]],
      });
  }

  public ngOnInit() {
    this.authSubscription = this.authService.auth.subscribe(this.gotData.bind(this), this.gotError.bind(this));
    this.loadSubscription = this.loadBlockService.load.subscribe(this.gotLoadData.bind(this));
    this.authService.logout();
    this.user = new User("", "");
    this.form.patchValue(this.user);
  }

  public ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.loadSubscription.unsubscribe();
  }

  private gotLoadData(active) {
    this.loadIsActive = active;
  }

  private gotData(auth: AuthUser) {
    this.changeDetectorRef.markForCheck();
    let error = auth.error;
    if (error) {
      this.error = error;
    } else if (auth.user) {
      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl]);
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
    this.authService.login(this.user);
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
