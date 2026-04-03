import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, AuthResponse } from '../../../../core/services/auth.service';
import { LanguageService } from '../../../../core/services/language.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-outfit">
      <div class="fixed left-12 right-12 top-12 flex justify-between items-center z-50">
        <a routerLink="/" class="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md text-slate-500 hover:text-blue-600 transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left group-hover:-translate-x-1 transition-transform" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
          <span class="text-[11px] font-black uppercase tracking-widest">{{ 'NAV.NAV_BACK' | translate }}</span>
        </a>
        <div class="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <button (click)="setIdioma('PT')" 
                  [class.bg-blue-600]="languageService.idiomaAtivo() === 'PT'" [class.text-white]="languageService.idiomaAtivo() === 'PT'"
                  class="px-4 py-2 rounded-xl text-[10px] font-black transition-all">PT</button>
          <button (click)="setIdioma('EN')"
                  [class.bg-blue-600]="languageService.idiomaAtivo() === 'EN'" [class.text-white]="languageService.idiomaAtivo() === 'EN'"
                  class="px-4 py-2 rounded-xl text-[10px] font-black transition-all">EN</button>
        </div>
      </div>

      <div class="w-full max-w-[540px] bg-white rounded-[3rem] p-12 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.1)] border border-slate-100 relative">
        <div class="text-center mb-10 mt-12">
          <div class="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
             <img src="assets/images/inovalayer-semfundo.png" alt="IL" class="w-12 h-auto brightness-0 invert">
          </div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tighter mb-2">{{ 'B2C.CADASTRO.TITLE' | translate }}</h1>
          <p class="text-slate-400 font-bold text-[10px] uppercase tracking-widest leading-relaxed">{{ 'B2C.CADASTRO.SUBTITLE' | translate }}</p>
        </div>

        <form [formGroup]="cadastroForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{{ 'B2C.CADASTRO.NAME_LABEL' | translate }}</label>
              <input type="text" formControlName="nomeCompleto" class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all">
            </div>
            <div class="col-span-2 space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{{ 'B2C.CADASTRO.COMPANY_LABEL' | translate }}</label>
              <input type="text" formControlName="nomeEmpresa" class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all">
            </div>
            <div class="col-span-2 space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{{ 'B2C.CADASTRO.EMAIL_LABEL' | translate }}</label>
              <input type="email" formControlName="email" class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all">
            </div>
            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{{ 'B2C.CADASTRO.PASSWORD_LABEL' | translate }}</label>
              <input type="password" formControlName="senha" placeholder="••••••••" class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all">
            </div>
            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{{ 'B2C.CADASTRO.CONFIRM_PASSWORD_LABEL' | translate }}</label>
              <input type="password" formControlName="confirmacaoSenha" placeholder="••••••••" class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all">
            </div>
          </div>
          <button type="submit" [disabled]="isLoading() || cadastroForm.invalid"
                  class="w-full py-6 bg-slate-900 hover:bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-xl shadow-slate-900/10 transition-all border-b-4 border-slate-800 hover:border-blue-700 disabled:opacity-50">
              {{ isLoading() ? ('B2C.CADASTRO.SUBMIT_LOADING' | translate) : ('B2C.CADASTRO.SUBMIT_BTN' | translate) }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class CadastroClienteComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
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
    if (this.cadastroForm.invalid) return;
    this.isLoading.set(true);

    this.authService.register(this.cadastroForm.value).subscribe({
      next: () => {
        this.messageService.add({ 
            severity: 'success', 
            summary: this.languageService.idiomaAtivo() === 'PT' ? 'Sucesso' : 'Success', 
            detail: this.languageService.idiomaAtivo() === 'PT' ? 'Cadastro realizado com sucesso!' : 'Registration successful!' 
        });
        setTimeout(() => this.router.navigate(['/cliente/dashboard']), 500);
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.message || 'Falha no cadastro' });
        this.isLoading.set(false);
      }
    });
  }
}
