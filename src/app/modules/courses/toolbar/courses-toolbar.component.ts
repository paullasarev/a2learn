import {Component, ViewEncapsulation, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: require('./courses-toolbar.component.html'),
  styles: [
    require('./courses-toolbar.styles.scss'),
    require('./courses-search.styles.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class CoursesToolbarComponent {
  private filter: string = "string to search";
  @Output() public find = new EventEmitter();

  constructor() {
  }

  public doFind() {
    console.log('doFind', this.filter);
    this.find.emit(this.filter);
  }

  public doAdd() {
    console.log('doAdd');
  }
}
