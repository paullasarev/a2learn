import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from '../../components/action/action.component';

@NgModule({
  declarations: [
    ActionComponent,
  ],
  exports: [
    ActionComponent,
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
