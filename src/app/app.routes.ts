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
      import('./features/auth/public.routes').then(m => m.publicRoutes)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/private.routes').then(m => m.privateRoutes)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
