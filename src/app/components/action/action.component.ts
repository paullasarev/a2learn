import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'action',
  template: require('./action.component.html'),
  styles: [
    require('./action.styles.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class ActionComponent {
  @Input() public title: string = "";
  @Input() public icon: string = "";
  @Output() public action =  new EventEmitter();

  constructor() {
  }

  public onAction() {
    this.action.emit();
  }

}
