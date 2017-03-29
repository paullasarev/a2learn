import {Component, ViewEncapsulation, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: require('./courses-toolbar.component.html'),
  styles: [
    require('./courses-toolbar.styles.scss'),
    require('./courses-search.styles.scss'),
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CoursesToolbarComponent {
  private filter: string = "string to search";
  @Output() public find = new EventEmitter();
  @Output() public add = new EventEmitter();

  constructor() {
  }

  public doFind() {
    this.find.emit(this.filter);
  }

  public doAdd() {
    this.add.emit(this.filter);
  }
}
