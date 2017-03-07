// angular modules
import { NgModule } from '@angular/core';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  imports: [
    routes,
    // FormsModule,
    // ReactiveFormsModule,
    CommonModule,
    // CourseComponent,
  ],
  providers: []
})
export class CoursesModule {
  constructor() {
  }
}
