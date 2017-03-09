// angular modules
import { NgModule } from '@angular/core';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../app-common/app-common.module';

// routes
import { routes } from './courses.routes';

// custom components
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent
  ],
  exports: [
    CoursesComponent,
  ],
  imports: [
    routes,
    // FormsModule,
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
