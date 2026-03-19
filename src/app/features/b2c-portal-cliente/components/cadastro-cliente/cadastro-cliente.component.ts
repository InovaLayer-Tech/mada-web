import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, AuthResponse } from '../../../../core/services/auth.service';
import { LanguageService } from '../../../../core/services/language.service';

/**
 * Validador Customizado para verificar se as senhas coincidem de forma reativa.
 */
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const senha = control.get('senha');
  const confirmacaoSenha = control.get('confirmacaoSenha');
  return senha && confirmacaoSenha && senha.value !== confirmacaoSenha.value ? { mismatch: true } : null;
};

@Component({
  selector: 'app-cadastro-cliente',
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

      <div class="w-full max-w-[540px] bg-white rounded-[3rem] p-12 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.1)] border border-slate-100 relative">

        <div class="text-center mb-10 mt-12">
          <div class="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
             <img src="assets/images/inovalayer-semfundo.png" alt="InovaLayer3D" class="w-12 h-auto brightness-0 invert">
          </div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tighter mb-2">{{ 'B2C.CADASTRO.TITLE' | translate }}</h1>
          <p class="text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed">{{ 'B2C.CADASTRO.SUBTITLE' | translate }}</p>
        </div>

        <form [formGroup]="cadastroForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{{ 'B2C.CADASTRO.NAME' | translate }}</label>
              <input type="text" formControlName="nomeCompleto" placeholder="Seu nome"
                     class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-blue-500 transition-all">
            </div>

            <div class="col-span-2 space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{{ 'B2C.CADASTRO.COMPANY' | translate }}</label>
              <input type="text" formControlName="nomeEmpresa" placeholder="Sua empresa"
                     class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-blue-500 transition-all">
            </div>

            <div class="col-span-2 space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{{ 'B2C.CADASTRO.EMAIL' | translate }}</label>
              <input type="email" formControlName="email" placeholder="nome@empresa.com"
                     class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-blue-500 transition-all">
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{{ 'B2C.CADASTRO.PASSWORD' | translate }}</label>
              <input type="password" formControlName="senha" placeholder="••••••••"
                     class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-blue-500 transition-all">
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{{ 'B2C.CADASTRO.CONFIRM_PASSWORD' | translate }}</label>
              <input type="password" formControlName="confirmacaoSenha" placeholder="••••••••"
                     class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-blue-500 transition-all"
                     [class.border-rose-300]="cadastroForm.errors?.['mismatch'] && (cadastroForm.get('confirmacaoSenha')?.touched)">
            </div>
          </div>

          @if (cadastroForm.errors?.['mismatch'] && cadastroForm.get('confirmacaoSenha')?.touched) {
            <p class="text-rose-600 text-[11px] font-black uppercase tracking-widest pl-2 animate-pulse flex items-center gap-2">
              <i class="pi pi-exclamation-circle"></i> {{ 'B2C.CADASTRO.MISMATCH' | translate }}
            </p>
          }

          @if (errorMessage()) {
            <p class="text-rose-600 text-[11px] font-black uppercase tracking-widest pl-2 animate-bounce flex items-center gap-2">
              <i class="pi pi-exclamation-circle"></i> {{ errorMessage() }}
            </p>
          }

          <div class="pt-6">
            <button type="submit" [disabled]="isLoading() || cadastroForm.invalid"
                    class="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50">
              {{ isLoading() ? ('B2C.CADASTRO.PROCESS' | translate) : ('B2C.CADASTRO.FINISH' | translate) }}
            </button>
            <p class="text-center mt-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
              {{ 'B2C.CADASTRO.ALREADY_HAVE' | translate }} <a routerLink="/login" class="text-blue-600 hover:underline">{{ 'B2C.CADASTRO.ENTER_HERE' | translate }}</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class CadastroClienteComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  protected languageService = inject(LanguageService);

  isLoading = signal(false);
  errorMessage = signal('');

  setIdioma(idioma: string) {
    this.languageService.setLanguage(idioma);
  }

  cadastroForm = this.fb.group({
    nomeCompleto: ['', Validators.required],
    nomeEmpresa: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    confirmacaoSenha: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  onSubmit() {
    if (this.cadastroForm.invalid) {
      this.errorMessage.set('Preencha todos os campos corretamente');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.register(this.cadastroForm.value).subscribe({
      next: (user: AuthResponse) => {
        alert(this.languageService.idiomaAtivo() === 'PT' ? 'Cadastro realizado com sucesso! Bem-vindo à InovaLayer3D.' : 'Registration successful! Welcome to InovaLayer3D.');
        this.router.navigate(['/cliente/dashboard']);
      },
      error: (err: any) => {
        this.errorMessage.set(err.error?.message || 'Erro ao realizar cadastro');
        this.isLoading.set(false);
      }
    });
  }
}
