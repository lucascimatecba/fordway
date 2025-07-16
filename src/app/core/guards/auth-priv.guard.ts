import { inject } from '@angular/core';
import { AuthPrivService } from '../services/auth-priv.service';
import { CanActivateFn, Router } from '@angular/router';

export const authPrivGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthPrivService);
  const router = inject(Router);

  if(authService.estaLogado()) {
    return true;
  } else {
    return router.createUrlTree(['/login'])
  }
};