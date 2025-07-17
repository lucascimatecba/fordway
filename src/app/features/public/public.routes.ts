import { Routes } from '@angular/router';
import { HomePubComponent } from './home-pub/home-pub.component';
import { QuizPubComponent } from './quiz-pub/quiz-pub.component';
import { ComparePubComponent } from './compare-pub/compare-pub.component';
import { TestdrivePubComponent } from './testdrive-pub/testdrive-pub.component';
import { authPubGuard } from '../../core/guards/auth-pub.guard';


export const publicRoutes: Routes = [
  {
    path: 'home',
    component: HomePubComponent,
    canActivate: [authPubGuard]
  },
  {
    path: 'seu-ford',
    component: QuizPubComponent,
    canActivate: [authPubGuard]
  },
  {
    path: 'comparacao',
    component: ComparePubComponent,
    canActivate: [authPubGuard]
  },
  {
    path: 'test-drive',
    component: TestdrivePubComponent,
    canActivate: [authPubGuard]
  }
];
