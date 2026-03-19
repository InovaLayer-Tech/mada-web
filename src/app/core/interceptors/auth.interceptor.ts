import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const translate = inject(TranslateService);
  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    const userJson = localStorage.getItem('mada_user');
    token = userJson ? JSON.parse(userJson)?.token : null;
  }

  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        messageService.add({ 
          severity: 'error', 
          summary: translate.instant('AUTH.ACCESS_DENIED_TITLE'), 
          detail: translate.instant('AUTH.ACCESS_DENIED_DETAIL') 
        });
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
