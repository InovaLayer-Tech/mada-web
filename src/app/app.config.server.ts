import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export class ServerTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    try {
      const assetsPath = join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`);
      const content = readFileSync(assetsPath, 'utf8');
      return of(JSON.parse(content));
    } catch (e) {
      console.error(`[ServerLoader] Erro ao carregar tradução (${lang}):`, e);
      return of({});
    }
  }
}

export function ServerLoaderFactory() {
  return new ServerTranslateLoader();
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: TranslateLoader,
      useFactory: ServerLoaderFactory
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
