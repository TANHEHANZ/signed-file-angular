import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/login/pages/login/login.component';
import { FormLoginComponent } from './presentation/pages/login/pages/login/components/form-login.component';

export const routes: Routes = [
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [{ path: '', component: FormLoginComponent }],
  },
];
