import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from '../../services/auth-guard';

// Route Configuration
const coursesRoutes: Routes = [
  { path: 'courses', canActivate: [AuthGuard], component: CoursesComponent, data: {breadcrumb: [{label:'courses'}]}},
  { path: 'courses/new', canActivate: [AuthGuard], component: CourseDetailComponent, data: {breadcrumb: [
      {label:'courses', route:'/courses'},
      {label:'new'}
    ]}
  },
  { path: 'courses/:id', canActivate: [AuthGuard], component: CourseDetailComponent, data: {breadcrumb: [
      {label:'courses', route:'/courses'},
      {expr: (params)=>`course ${params.id}`}
    ]}
  },
  { path: 'error/:message', component: ErrorComponent, data:{breadcrumb: [{label:'error'}]} },
];

export const routes = RouterModule.forChild(coursesRoutes);
