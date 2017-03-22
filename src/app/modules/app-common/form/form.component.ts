import {Component, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'form',
  template: '<div class="form"><ng-content></ng-content></div>',
  styles: [
    require('./form.styles.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent {
  constructor() {
  }
}

@Component({
  selector: 'form-group',
  template: '<ng-content></ng-content>',
  host: {
    class: 'form-group'
  },
  styles: [
    require('./form.styles.scss'),
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormGroupComponent {
  constructor() {
  }
}

@Component({
  selector: 'form-input-text',
  template: `
      <div class="form-group__label">{{label}}</div>
      <div class="form-group__value">
        <input type="text" class="form-value form-value--input"
               [value]="value" (input)="onChange($event)">
      </div>
`,
  styles: [
    require('./form.styles.scss'),
  ],
  host: {
    class: 'form-group__row'
  },
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormInputTextComponent {

  @Input() public label: string = "";
  @Input() public value: string = "";
  @Output() public valueChange =  new EventEmitter();

  constructor() {
  }

  public onChange(event) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

}

@Component({
  selector: 'form-input-password',
  template: `
      <div class="form-group__label">{{label}}</div>
      <div class="form-group__value">
        <input type="password" class="form-value form-value--input-password"
               [value]="value" (input)="onChange($event)">
      </div>
`,
  host: {
    class: 'form-group__row'
  },
  styles: [
    require('./form.styles.scss'),
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormInputPasswordComponent extends FormInputTextComponent {
  constructor() {
    super();
  }
}

@Component({
  selector: 'form-input-number',
  template: `
      <div class="form-group__label">{{label}}</div>
      <div class="form-group__value">
        <input type="text" class="form-value form-value--input-number"
               [value]="value" (input)="onChange($event)">
        <div *ngIf="!!tip" class="form-value-tip">{{tip}}</div>
      </div>
`,
  host: {
    class: 'form-group__row'
  },
  styles: [
    require('./form.styles.scss'),
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormInputNumberComponent extends FormInputTextComponent {
  @Input() public tip: string = "";
  constructor() {
    super();
  }
}

@Component({
  selector: 'form-input-textarea',
  template: `
      <div class="form-group__label">{{label}}</div>
      <div class="form-group__value">
        <textarea class="form-value form-value--textarea"
                  [value]="value" (input)="onChange($event)">
        </textarea>
      </div>
`,
  host: {
    class: 'form-group__row'
  },
  styles: [
    require('./form.styles.scss'),
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormInputTextareaComponent extends FormInputTextComponent {
  constructor() {
    super();
  }
}
