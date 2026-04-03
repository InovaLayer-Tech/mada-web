import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, lastValueFrom } from 'rxjs';
import { APP_INITIALIZER } from '@angular/core';
import { routes } from './app.routes';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export function HttpLoaderFactory() {
  return new TranslateHttpLoader();
}

export function translateInitializer(translate: TranslateService) {
  return () => lastValueFrom(translate.use('pt'));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    importProvidersFrom(TranslateModule.forRoot(), ToastModule, ConfirmDialogModule),
    provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json'
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService) => () => lastValueFrom(translate.use('pt')),
      deps: [TranslateService],
      multi: true
    },
    MessageService,
    ConfirmationService,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          // Desativa completamente o dark mode do PrimeNG.
          // Sem isso, o tema Aura ativa dark mode quando o SO estiver em dark,
          // causando inputs com fundo preto e texto invisível.
          darkModeSelector: 'none'
        }
      }
    })
  ],
};
