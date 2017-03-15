import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action/action.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    ActionComponent,
    ConfirmComponent
  ],
  exports: [
    ActionComponent,
    ConfirmComponent
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
