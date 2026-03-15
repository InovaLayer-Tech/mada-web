import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {
  private router = inject(Router);

  login(type: string) {
    if (type === 'cliente') this.router.navigate(['/cliente/dashboard']);
    else this.router.navigate(['/b2b/pedidos']);
  }
}
