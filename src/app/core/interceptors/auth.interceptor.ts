import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor de Autenticação.
 * Adiciona o token JWT em todas as requisições e trata erros de autorização (401/403).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    const userJson = localStorage.getItem('mada_user');
    token = userJson ? JSON.parse(userJson)?.token : null;
  }

  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se o erro for 401 (Não Autenticado) ou 403 (Negado), força logout
      if (error.status === 401 || error.status === 403) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
