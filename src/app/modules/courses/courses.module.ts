import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { CoursesToolbarComponent } from './toolbar/courses-toolbar.component';

import { routes } from './courses.routes';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ErrorComponent } from './error/error.component';

import { CourseStateDirective } from './state/state.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterByPipe } from './pipes/filter-by.pipe';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseDetailComponent,
    CoursesToolbarComponent,
    ErrorComponent,
    CourseStateDirective,
    OrderByPipe,
    FilterByPipe,
  ],
  exports: [
    CoursesComponent,
  ],
  imports: [
    routes,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CoreModule
  ],
  providers: []
})
export class CoursesModule {
  constructor() {
  }
}
