import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, AuthResponse } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div class="w-full max-w-[540px] bg-white rounded-[3rem] p-12 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.1)] border border-slate-100">
        <div class="text-center mb-10">
          <div class="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
             <img src="assets/images/inovalayer-semfundo.png" alt="InovaLayer3D" class="w-12 h-auto brightness-0 invert">
          </div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tighter mb-2">CRIAR CONTA CORPORATIVA</h1>
          <p class="text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed">Inicie sua jornada na manufatura aditiva</p>
        </div>

        <form [formGroup]="cadastroForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Nome Completo</label>
              <input type="text" formControlName="nomeCompleto" placeholder="Seu nome"
                     class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-blue-500 transition-all">
            </div>

            <div class="col-span-2 space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Razão Social / Empresa</label>
              <input type="text" formControlName="nomeEmpresa" placeholder="Sua empresa"
                     class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-blue-500 transition-all">
            </div>

            <div class="col-span-2 space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">E-mail Corporativo</label>
              <input type="email" formControlName="email" placeholder="nome@empresa.com"
                     class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-blue-500 transition-all">
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Senha</label>
              <input type="password" formControlName="senha" placeholder="••••••••"
                     class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-blue-500 transition-all">
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Confirmar</label>
              <input type="password" formControlName="confirmacaoSenha" placeholder="••••••••"
                     class="w-full px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-blue-500 transition-all">
            </div>
          </div>

          @if (errorMessage()) {
            <p class="text-rose-600 text-[11px] font-black uppercase tracking-widest pl-2 animate-bounce flex items-center gap-2">
              <i class="pi pi-exclamation-circle"></i> {{ errorMessage() }}
            </p>
          }

          <div class="pt-6">
            <button type="submit" [disabled]="isLoading()"
                    class="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50">
              {{ isLoading() ? 'PROCESSANDO...' : 'FINALIZAR CADASTRO' }}
            </button>
            <p class="text-center mt-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
              Já possui conta? <a routerLink="/login" class="text-blue-600 hover:underline">Entre aqui</a>
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

  isLoading = signal(false);
  errorMessage = signal('');

  cadastroForm = this.fb.group({
    nomeCompleto: ['', Validators.required],
    nomeEmpresa: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    confirmacaoSenha: ['', Validators.required]
  });

  onSubmit() {
    if (this.cadastroForm.invalid) {
      this.errorMessage.set('Preencha todos os campos corretamente');
      return;
    }

    if (this.cadastroForm.value.senha !== this.cadastroForm.value.confirmacaoSenha) {
      this.errorMessage.set('As senhas não coincidem');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.register(this.cadastroForm.value).subscribe({
      next: (user: AuthResponse) => {
        alert('Cadastro realizado com sucesso! Bem-vindo à InovaLayer3D.');
        this.router.navigate(['/cliente/dashboard']);
      },
      error: (err: any) => {
        this.errorMessage.set(err.error?.message || 'Erro ao realizar cadastro');
        this.isLoading.set(false);
      }
    });
  }
}
