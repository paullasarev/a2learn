import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';

import { routes } from './login.routes';

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ],
  imports: [
    routes,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    CommonModule,
  ],
  providers: []
})
export class LoginModule {
  constructor() {
  }
}
