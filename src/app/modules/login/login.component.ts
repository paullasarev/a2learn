import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

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
export class LoginComponent {
  @Output() public cancel = new EventEmitter();

  public user: string;
  public password: string;

  constructor(
    private router: Router
  ) {
  }

  public doLogin() {
    this.router.navigate(['login']);
  }

  public doCancel() {
    this.router.navigate(['/']);
  }

}
