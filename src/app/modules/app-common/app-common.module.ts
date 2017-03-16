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
} from './form/form.component';

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
  ],
  imports: [
    CommonModule,
  ],
  providers: []
})
export class AppCommonModule {
  constructor() {
  }
}
