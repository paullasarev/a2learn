import { Routes } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { LoginComponent } from '../login/login.component';
import { NoContentComponent } from './no-content/no-content.component';

export const ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/courses'},
  {path: 'courses', component: CoursesComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NoContentComponent},
];
