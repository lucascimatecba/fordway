import { Routes } from '@angular/router';
import { LoginPrivComponent } from '../private/login-priv/login-priv.component';
import { SignPrivComponent } from '../private/sign-priv/sign-priv.component';
import { loginPrivGuard } from '../../core/guards/login-priv.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPrivComponent,
    canActivate: [loginPrivGuard]
  },
  {
    path: 'cadastro',
    component: SignPrivComponent
  }
];
