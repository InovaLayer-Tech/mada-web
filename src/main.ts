import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Inicialização exclusiva para o Client-Side (Navegador).
// Nenhuma importação de 'zone.js/node' ou 'app.config.server' deve existir neste arquivo.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error('Falha crítica na inicialização do Angular:', err));
