// src/app/core/guards/auth-pub.guard.ts
import { inject } from '@angular/core';
import { AuthPrivService } from '../services/auth-priv.service';
import { CanActivateFn, Router } from '@angular/router';

export const authPubGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthPrivService);
  const router = inject(Router);

  return authService.estaLogado()
    ? router.createUrlTree(['/home-priv']) // redireciona caso esteja logado
    : true;
};
