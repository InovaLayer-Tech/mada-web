import { inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  const router = inject(Router);

  // No servidor (SSR), permitimos a navegação para que o bundle chegue ao cliente.
  // A reidratação reativará o sinal isAuthenticated no navegador.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redireciona para o login se não estiver autenticado (apenas no Browser)
  return router.createUrlTree(['/login']);
};
