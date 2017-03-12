import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ErrorComponent } from './error/error.component';

// Route Configuration
const coursesRoutes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/new', component: CourseDetailComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'error/:message', component: ErrorComponent },
];

export const routes = RouterModule.forChild(coursesRoutes);
