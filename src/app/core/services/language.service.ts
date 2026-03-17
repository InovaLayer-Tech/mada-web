import { Injectable, inject, signal, effect } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  
  idiomaAtivo = signal('PT');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('mada_lang');
      if (saved) {
        this.idiomaAtivo.set(saved.toUpperCase());
        this.translate.use(saved.toLowerCase());
      } else {
        const browserLang = this.translate.getBrowserLang();
        const initial = browserLang?.match(/en|pt/) ? browserLang : 'pt';
        this.idiomaAtivo.set(initial.toUpperCase());
        this.translate.use(initial);
      }
    }

    // Opcional: Efeito para persistir mudança
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('mada_lang', this.idiomaAtivo().toLowerCase());
      }
    });
  }

  setLanguage(lang: string) {
    this.idiomaAtivo.set(lang);
    this.translate.use(lang.toLowerCase());
  }
}
