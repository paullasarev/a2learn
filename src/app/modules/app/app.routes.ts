import { Routes } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { NoContentComponent } from './no-content/no-content.component';

export const ROUTES: Routes = [
  {path: '', component: CoursesComponent},
  {path: 'courses', component: CoursesComponent},
  {path: '**', component: NoContentComponent},
];
