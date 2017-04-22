import {Component, Directive, Attribute, forwardRef,
  ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ValidatorFn, Validator, Validators, AbstractControl, NG_VALIDATORS } from '@angular/forms';
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
  encapsulation: ViewEncapsulation.None
})
export class FormGroupComponent {
  constructor() {
  }
}

const noop = () => {
};

function componentProvider(component: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true
  }
}
@Component({
  selector: 'form-input-text',
  template: `
      <div class="form-group__label">{{label}}</div>
      <div class="form-group__value">
        <input type="text" class="form-value form-value--input"
               [(ngModel)]="value" (blur)="onBlur()" [disabled]="isDisabled">
      </div>
`,
  styles: [
    require('./form.styles.scss'),
  ],
  host: {
    class: 'form-group__row'
  },
  providers: [componentProvider(FormInputTextComponent)],
  encapsulation: ViewEncapsulation.None
})
export class FormInputTextComponent  implements ControlValueAccessor {
  protected isDisabled: boolean = false;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private innerValue: string = "";

  @Input() public label: string = "";
  @Output() public valueChange =  new EventEmitter();

  constructor() {
  }

  public get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  @Input() public set value(v: any) {
    if (v !== this.value) {
      this.innerValue = v;
      this.onChangeCallback(v);
      this.onChange(this.innerValue);
    }
  }

  //Set touched on blur
  onBlur() {
      this.onTouchedCallback();
  }

  public onChange(event) {
    this.valueChange.emit(this.innerValue);
  }

  // ControlValueAccessor interface
  /**
   * Write a new value to the element.
   */
  public writeValue(value: any): void {
    if (value !== undefined && value !== this.innerValue) {
      this.innerValue = value;
    }
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}

@Component({
  selector: 'form-input-password',
  template: `
      <div class="form-group__label">{{label}}</div>
      <div class="form-group__value">
        <input type="password" class="form-value form-value--input-password"
               [(ngModel)]="value" (blur)="onBlur()" [disabled]="isDisabled">
      </div>
`,
  host: {
    class: 'form-group__row'
  },
  styles: [
    require('./form.styles.scss'),
  ],
  providers: [componentProvider(FormInputPasswordComponent)],
  encapsulation: ViewEncapsulation.None
})
export class FormInputPasswordComponent extends FormInputTextComponent {
  constructor() {
    super();
  }
}

@Component({
  selector: 'form-input-date',
  template: `
      <div class="form-group__label">{{label}}</div>
      <div class="form-group__value">
        <input type="date" class="form-value form-value--input-date"
               [value]="value | date:'yyyy-MM-dd'" (input)="onChangeDate($event)">
      </div>
`,
  host: {
    class: 'form-group__row'
  },
  styles: [
    require('./form.styles.scss'),
  ],
  providers: [componentProvider(FormInputDateComponent)],
  encapsulation: ViewEncapsulation.None
})
export class FormInputDateComponent extends FormInputTextComponent {
  constructor() {
    super();
  }
  public onChangeDate(event) {
    this.value = new Date(event.target.value);
  }
}

@Component({
  selector: 'form-input-boolean',
  template: `
    <div class="form-group__label">{{label}}</div>
    <div class="form-group__value">
      <input type="checkbox" class="form-value form-value--boolean"
             [checked]="value" (change)="onChangeChecked($event)">
    </div>
  `,
  host: {
    class: 'form-group__row'
  },
  styles: [
    require('./form.styles.scss'),
  ],
  providers: [componentProvider(FormInputBooleanComponent)],
  encapsulation: ViewEncapsulation.None
})
export class FormInputBooleanComponent extends FormInputTextComponent {
  constructor() {
    super();
  }
  public onChangeChecked(event) {
    this.value = !!event.target.checked;
  }
}

@Component({
  selector: 'form-input-number',
  template: `
      <div class="form-group__label">{{label}}</div>
      <div class="form-group__value">
        <input type="text" class="form-value form-value--input-number"
               [(ngModel)]="value" (blur)="onBlur()" [disabled]="isDisabled">
        <div *ngIf="!!tip" class="form-value-tip">{{tip}}</div>
      </div>
`,
  host: {
    class: 'form-group__row'
  },
  styles: [
    require('./form.styles.scss'),
  ],
  providers: [componentProvider(FormInputNumberComponent)],
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
               [(ngModel)]="value" (blur)="onBlur()" [disabled]="isDisabled">
        </textarea>
      </div>
`,
  host: {
    class: 'form-group__row'
  },
  styles: [
    require('./form.styles.scss'),
  ],
  providers: [componentProvider(FormInputTextareaComponent)],
  encapsulation: ViewEncapsulation.None
})
export class FormInputTextareaComponent extends FormInputTextComponent {
  constructor() {
    super();
  }
}

export function IntegerValidator(control: AbstractControl): {[key: string]: any} {
  const value = control.value;
  if (/^[0-9]+$/.test(value)) {
    return null;
  }

  return {'wrongNumber': {value}};
}

@Directive({
  selector: '[isInteger][formControlName],[isInteger][formControl],[isInteger][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => IntegerValidator), multi: true }
  ]
})
export class IntegerValidatorDirective implements Validator {
    private validator: ValidatorFn;

    constructor(
    ) {
      this.validator = IntegerValidator;
    }

    validate(c: AbstractControl): { [key: string]: any } {
      return this.validator(c);
    }
}
