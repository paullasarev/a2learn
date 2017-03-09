import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-header',
  template: require('./app-header.component.html'),
  styles: [
    require('./app-header.styles.scss'),
    require('./logo.styles.scss'),
    require('./breadcrumbs.styles.scss'),
    require('./user.styles.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class AppHeaderComponent {
  constructor() {
  }
}
