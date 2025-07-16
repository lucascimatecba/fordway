import { Routes } from '@angular/router';
import { HomePrivComponent } from './features/private/home-priv/home-priv.component';
import { LoginPrivComponent } from './features/private/login-priv/login-priv.component';
import { DashboardPrivComponent } from './features/private/dashboard-priv/dashboard-priv.component';
import { authPrivGuard } from './core/guards/auth-priv.guard';
import { loginPrivGuard } from './core/guards/login-priv.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPrivComponent,
    canActivate: [loginPrivGuard]
  },
  {
    path: 'home',
    component: HomePrivComponent,
    canActivate: [authPrivGuard]
  },
  {
    path: 'dashboard',
    component: DashboardPrivComponent,
    canActivate: [authPrivGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
