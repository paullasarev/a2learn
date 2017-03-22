import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: require('./app-footer.component.html'),
  styles: [
    require('./app-footer.styles.scss'),
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppFooterComponent {
  constructor() {
  }
}
