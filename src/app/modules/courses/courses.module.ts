import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { CoursesToolbarComponent } from './toolbar/courses-toolbar.component';

import { routes } from './courses.routes';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseDetailComponent,
    CoursesToolbarComponent,
    ErrorComponent
  ],
  exports: [
    CoursesComponent,
  ],
  imports: [
    routes,
    FormsModule,
    CommonModule,
    CoreModule
  ],
  providers: []
})
export class CoursesModule {
  constructor() {
  }
}
