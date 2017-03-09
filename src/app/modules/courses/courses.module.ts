import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../app-common/app-common.module';
import { CoursesToolbarComponent } from './toolbar/courses-toolbar.component';
import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './courses.routes';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    CoursesToolbarComponent
  ],
  exports: [
    CoursesComponent,
  ],
  imports: [
    routes,
    FormsModule,
    // ReactiveFormsModule,
    CommonModule,
    AppCommonModule
  ],
  providers: []
})
export class CoursesModule {
  constructor() {
  }
}
