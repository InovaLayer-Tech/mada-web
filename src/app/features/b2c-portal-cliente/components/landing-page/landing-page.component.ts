import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './landing-page.component.html'
})
export class LandingPagePolishedComponent {
  protected languageService = inject(LanguageService);

  constructor(private router: Router) {}

  setIdioma(idioma: string) {
    this.languageService.setLanguage(idioma);
  }

  login(type: 'b2b' | 'cliente') {
    if (type === 'cliente') this.router.navigate(['/cliente/dashboard']);
    else this.router.navigate(['/b2b/pedidos']);
  }
}
