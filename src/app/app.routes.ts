import { Routes } from '@angular/router';
import { CoursesComponent } from './modules/courses/courses.component';
import { NoContentComponent } from './modules/no-content/no-content.component';

export const ROUTES: Routes = [
  {path: '', component: CoursesComponent},
  {path: 'courses', component: CoursesComponent},
  {path: '**', component: NoContentComponent},
];
