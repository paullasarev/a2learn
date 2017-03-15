import { Component, ViewEncapsulation } from '@angular/core';

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
export class AppHeaderComponent {
  constructor(
    private auth: AuthService
  ) {
  }

  public isAuth() {
    return this.auth.isAuth();
  }

  public getUser() {
    return this.auth.info().name;
  }
}
