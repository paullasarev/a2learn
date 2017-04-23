import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  FormCheckListComponent,
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
    FormCheckListComponent,
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
    FormCheckListComponent,
    DurationPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: []
})
export class CoreModule {
  constructor() {
  }
}
