import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

export const autenticacaoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacaoService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
