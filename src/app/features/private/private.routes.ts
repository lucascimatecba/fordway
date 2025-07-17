import { Routes } from '@angular/router';
import { HomePrivComponent } from './home-priv/home-priv.component';
import { DashboardPrivComponent } from './dashboard-priv/dashboard-priv.component';
import { authPrivGuard } from '../../core/guards/auth-priv.guard';

export const privateRoutes: Routes = [
  {
    path: 'home-priv',
    component: HomePrivComponent,
    canActivate: [authPrivGuard]
  },
  {
    path: 'dashboard',
    component: DashboardPrivComponent,
    canActivate: [authPrivGuard]
  }
];
