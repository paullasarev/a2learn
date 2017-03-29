import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action/action.component';
import { ConfirmComponent } from './confirm/confirm.component';
import {
  FormComponent,
  FormGroupComponent,
  FormInputTextComponent,
  FormInputPasswordComponent,
  FormInputNumberComponent,
  FormInputTextareaComponent,
  FormInputDateComponent,
  FormInputBooleanComponent,
} from './form/form.component';
import { DurationPipe } from './pipes/duration.pipe';

@NgModule({
  declarations: [
    ActionComponent,
    ConfirmComponent,
    FormComponent,
    FormGroupComponent,
    FormInputTextComponent,
    FormInputPasswordComponent,
    FormInputNumberComponent,
    FormInputTextareaComponent,
    FormInputDateComponent,
    FormInputBooleanComponent,
    DurationPipe,
  ],
  exports: [
    ActionComponent,
    ConfirmComponent,
    FormComponent,
    FormGroupComponent,
    FormInputPasswordComponent,
    FormInputTextComponent,
    FormInputPasswordComponent,
    FormInputNumberComponent,
    FormInputTextareaComponent,
    FormInputDateComponent,
    FormInputBooleanComponent,
    DurationPipe,
  ],
  imports: [
    CommonModule,
  ],
  providers: []
})
export class CoreModule {
  constructor() {
  }
}
