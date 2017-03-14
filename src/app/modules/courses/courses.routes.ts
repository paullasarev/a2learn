import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ErrorComponent } from './error/error.component';

// Route Configuration
const coursesRoutes: Routes = [
  { path: 'courses', component: CoursesComponent, data: {breadcrumb: 'courses'} },
  { path: 'courses/new', component: CourseDetailComponent, data: {breadcrumb: 'new course'} },
  { path: 'courses/:id', component: CourseDetailComponent, data: {breadcrumb: ['courses', (params)=>`course ${params.id}`]} },
  { path: 'error/:message', component: ErrorComponent, data: {breadcrumb: 'error'} },
];

export const routes = RouterModule.forChild(coursesRoutes);
