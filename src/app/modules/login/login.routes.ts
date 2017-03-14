import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: {breadcrumb: [{label:'login'}]} },
];

export const routes = RouterModule.forChild(loginRoutes);
