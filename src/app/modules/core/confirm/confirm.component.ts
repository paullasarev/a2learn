import {Component, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'confirm',
  template: require('./confirm.component.html'),
  styles: [
    require('./confirm.styles.scss'),
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ConfirmComponent {
  @Input() public message: string = "";
  @Output() public ok =  new EventEmitter();
  @Output() public cancel =  new EventEmitter();

  constructor() {
  }

  public onYes() {
    this.ok.emit();
  }

  public onNo() {
    this.cancel.emit();
  }

}
