import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: require('./app-footer.component.html'),
  styles: [
    require('./app-footer.styles.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class AppFooterComponent {
  constructor() {
  }
}
