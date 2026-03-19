import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, AuthResponse } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <!-- Navbar Topo Fixa -->
      <div class="fixed left-12 right-12 top-12 flex justify-between items-center z-50">
        <!-- Botão Voltar -->
        <a routerLink="/" class="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md text-slate-500 hover:text-blue-600 transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left group-hover:-translate-x-1 transition-transform" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
          <span class="text-[11px] font-black uppercase tracking-widest">{{ 'NAV.NAV_BACK' | translate }}</span>
        </a>

        <!-- Seletor Idioma -->
        <div class="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <button (click)="setIdioma('PT')" 
                  [class.bg-blue-600]="languageService.idiomaAtivo() === 'PT'" [class.text-white]="languageService.idiomaAtivo() === 'PT'"
                  [class.text-slate-400]="languageService.idiomaAtivo() !== 'PT'"
                  class="px-4 py-2 rounded-xl text-[10px] font-black transition-all hover:bg-slate-50 border border-transparent"
                  [class.hover:bg-blue-700]="languageService.idiomaAtivo() === 'PT'">PT</button>
          <button (click)="setIdioma('EN')"
                  [class.bg-blue-600]="languageService.idiomaAtivo() === 'EN'" [class.text-white]="languageService.idiomaAtivo() === 'EN'"
                  [class.text-slate-400]="languageService.idiomaAtivo() !== 'EN'"
                  class="px-4 py-2 rounded-xl text-[10px] font-black transition-all hover:bg-slate-50 border border-transparent"
                  [class.hover:bg-blue-700]="languageService.idiomaAtivo() === 'EN'">EN</button>
        </div>
      </div>

      <div class="w-full max-w-[480px] bg-white rounded-[3rem] p-12 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.1)] border border-slate-100 relative">

        <div class="text-center mb-8 mt-12">
          <div class="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
            <img src="assets/images/inovalayer-semfundo.png" alt="InovaLayer3D" class="w-12 h-auto brightness-0 invert">
          </div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tighter mb-2">{{ 'NAV.LOGIN' | translate }}</h1>
          <p class="text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed">InovaLayer3D - Acesso Seguro</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Endereço de E-mail</label>
            <input type="email" formControlName="email" placeholder="nome@empresa.com"
                   class="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[1.8rem] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Senha de Acesso</label>
            <input type="password" formControlName="senha" placeholder="••••••••"
                   class="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[1.8rem] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
          </div>

          @if (errorMessage()) {
            <p class="text-rose-600 text-[11px] font-black uppercase tracking-widest pl-2 animate-bounce">{{ errorMessage() }}</p>
          }

          <div class="pt-4 space-y-4">
            <button type="submit" [disabled]="isLoading()" 
                    class="w-full py-6 bg-slate-900 hover:bg-blue-600 text-white rounded-[1.8rem] font-black uppercase tracking-widest text-[11px] transition-all shadow-xl shadow-slate-900/10 border-b-4 border-slate-800 hover:border-blue-700 disabled:opacity-50">
              {{ isLoading() ? 'Autenticando...' : 'Acessar Sistema' }}
            </button>
            <a routerLink="/cadastro" class="block w-full py-6 bg-white hover:bg-slate-50 text-slate-700 rounded-[1.8rem] font-black uppercase tracking-widest text-[11px] transition-all text-center border-2 border-slate-100 hover:border-blue-200">
              Criar Nova Conta Corporativa
            </a>
          </div>
        </form>

        <div class="mt-12 pt-8 border-t border-slate-50 text-center">
          <span class="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">InovaLayer3D &copy; 2026 - v2.0</span>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  protected languageService = inject(LanguageService);

  isLoading = signal(false);
  errorMessage = signal('');

  setIdioma(idioma: string) {
    this.languageService.setLanguage(idioma);
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginForm.value).subscribe({
      next: (user: AuthResponse) => {
        if (user.role === 'ADMIN') {
          this.router.navigate(['/b2b/pedidos']);
        } else {
          this.router.navigate(['/cliente/dashboard']);
        }
      },
      error: (err: any) => {
        this.errorMessage.set('Credenciais Inválidas ou Erro de Conexão');
        this.isLoading.set(false);
      }
    });
  }
}
