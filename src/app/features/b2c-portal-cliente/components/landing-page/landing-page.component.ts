import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './landing-page.component.html'
})
export class LandingPagePolishedComponent {
  private translate = inject(TranslateService);
  idiomaAtivo = 'PT';

  constructor(private router: Router) {
    this.translate.setDefaultLang('pt');
  }

  setIdioma(idioma: string) {
    this.idiomaAtivo = idioma;
    this.translate.use(idioma.toLowerCase());
  }

  login(type: 'b2b' | 'cliente') {
    if (type === 'cliente') this.router.navigate(['/cliente/dashboard']);
    else this.router.navigate(['/b2b/pedidos']);
  }
}
