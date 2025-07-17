import { Routes } from '@angular/router';
import { HomePrivComponent } from './features/private/home-priv/home-priv.component';
import { LoginPrivComponent } from './features/private/login-priv/login-priv.component';
import { DashboardPrivComponent } from './features/private/dashboard-priv/dashboard-priv.component';
import { authPrivGuard } from './core/guards/auth-priv.guard';
import { loginPrivGuard } from './core/guards/login-priv.guard';
import { HomePubComponent } from './features/public/home-pub/home-pub.component';
import { QuizPubComponent } from './features/public/quiz-pub/quiz-pub.component';
import { ComparePubComponent } from './features/public/compare-pub/compare-pub.component';

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
    path: 'home',
    component: HomePubComponent
  },
  {
    path: 'seu-ford',
    component: QuizPubComponent
  },
  {
    path: 'comparacao',
    component: ComparePubComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
