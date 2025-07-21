import { Routes } from '@angular/router';
import { HomePrivComponent } from '../private/home-priv/home-priv.component';
import { DashboardPrivComponent } from '../private/dashboard-priv/dashboard-priv.component';
import { authPrivGuard } from '../../core/guards/auth-priv.guard';
import { ClientesPrivComponent } from '../private/clientes-priv/clientes-priv.component';

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
  },
  {
    path: 'clientes',
    component: ClientesPrivComponent,
    canActivate: [authPrivGuard]
  }
];
