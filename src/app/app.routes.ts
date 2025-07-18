import { Routes } from '@angular/router';
import { LoginPrivComponent } from './features/private/login-priv/login-priv.component';
import { loginPrivGuard } from './core/guards/login-priv.guard';
import { SignPrivComponent } from './features/private/sign-priv/sign-priv.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPrivComponent,
    canActivate: [loginPrivGuard]
  },
  {
    path: 'cadastro',
    component: SignPrivComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/public/public.routes').then(m => m.publicRoutes)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/private/private.routes').then(m => m.privateRoutes)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
