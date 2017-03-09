import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: require('./app-toolbar.component.html'),
  styles: [
    require('./app-toolbar.styles.scss'),
    require('./search.styles.scss'),
    require('./action.styles.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class AppToolbarComponent {
  private filter: string = "string to search";
  constructor() {
  }

  public doFind() {
    console.log('doFind', this.filter);
  }

  public doAdd() {
    console.log('doAdd');
  }
}
