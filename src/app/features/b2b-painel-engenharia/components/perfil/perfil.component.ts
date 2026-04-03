import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, ToastModule],
  template: `
    <div class="max-w-7xl mx-auto mt-12 px-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 font-outfit">
      <!-- Header de Perfil Administrativo -->
      <div class="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div class="flex items-center gap-10 z-10">
          <div class="w-28 h-28 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-slate-900/40 uppercase italic active:scale-95 transition-transform cursor-pointer">
            {{ getInitials() }}
          </div>
          <div>
            <div class="flex items-center gap-4 mb-2">
               <span class="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 font-industrial-mono">ENGENHARIA MADA</span>
               <span class="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-slate-800 italic font-industrial-mono shadow-lg shadow-slate-900/20">{{ authService.getRole() || 'ADMIN' }}</span>
            </div>
            <h1 class="text-5xl font-black text-slate-900 tracking-tighter">{{ profileForm.get('nome')?.value }}</h1>
            <p class="text-slate-400 font-black font-industrial-mono text-[11px] mt-2 uppercase tracking-[0.3em] opacity-80">{{ 'NAV.LOGIN' | translate }} • {{ profileForm.get('email')?.value }}</p>
          </div>
        </div>
        
        <div class="flex gap-4 z-10">
          <button *ngIf="!editMode" (click)="toggleEdit()" 
            class="px-10 py-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 shadow-xl shadow-slate-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-3 active:scale-95">
            <i class="pi pi-user-edit text-blue-600"></i>
            {{ 'B2B.PERFIL.EDIT_BTN' | translate }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Dashboard Rápido Administrador -->
        <div class="space-y-10">
           <div class="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <h3 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 border-b border-slate-50 pb-6 font-industrial-mono">ACESSO DE AUDITORIA</h3>
              <div class="flex flex-col gap-8">
                 <div class="flex items-center justify-between">
                    <span class="text-sm font-black text-slate-400 uppercase tracking-tight">NÍVEL HIERARCHY</span>
                    <span class="text-[11px] font-black text-slate-900 font-industrial-mono bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 shadow-inner">T-STAGE 1</span>
                 </div>
                 <div class="flex items-center justify-between">
                    <span class="text-sm font-black text-slate-400 uppercase tracking-tight">STATUS MADA</span>
                    <span class="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase border border-emerald-100 font-industrial-mono tracking-widest">AUTORIZADO</span>
                 </div>
              </div>
              <div class="mt-12 pt-10 border-t border-slate-50 border-dashed">
                 <p class="text-[11px] text-slate-400 leading-relaxed italic font-medium">Como membro da Engenharia MADA, você tem autoridade total para calibrar o Motor Metrológico e aprovar orçamentos industriais.</p>
              </div>
           </div>
           
           <div class="bg-slate-900 p-12 rounded-[3.5rem] border border-slate-800 shadow-2xl shadow-slate-200 relative overflow-hidden group">
              <div class="absolute -right-8 -top-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                 <i class="pi pi-user-plus text-[12rem] text-white"></i>
              </div>
              <h3 class="text-[11px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 font-industrial-mono">GESTÃO DE EQUIPE</h3>
              <p class="text-white text-2xl font-black leading-snug mb-8 tracking-tight">Cadastre novos administradores no painel industrial</p>
              <button (click)="showAdminForm = !showAdminForm" class="w-full py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all border border-white/5 shadow-2xl active:scale-95">
                 {{ showAdminForm ? 'VOLTAR PARA PERFIL' : 'CRIAR NOVO ADMINISTRADOR' }}
              </button>
           </div>
        </div>

        <!-- Formulário de Perfil / Criação de Admin -->
        <div class="lg:col-span-2 space-y-10">
          
          <ng-container *ngIf="!showAdminForm">
            <form [formGroup]="profileForm" (ngSubmit)="salvar()" class="space-y-10">
              <!-- Card Identidade -->
              <div class="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm group">
                <div class="flex items-center justify-between mb-12">
                   <h3 class="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] flex items-center gap-4 font-industrial-mono">
                      <i class="pi pi-id-card text-lg"></i>
                      IDENTIFICAÇÃO PROFISSIONAL
                   </h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div class="flex flex-col gap-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 font-industrial-mono">NOME COMPLETO</label>
                    <input formControlName="nome" [readonly]="!editMode"
                           class="w-full px-8 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl text-slate-900 font-black text-sm transition-all outline-none shadow-inner"
                           [class.bg-white]="editMode" [class.border-slate-100]="editMode" [class.focus:border-blue-400]="editMode">
                  </div>

                  <div class="flex flex-col gap-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 font-industrial-mono">E-MAIL CORPORATIVO</label>
                    <input formControlName="email" [readonly]="!editMode"
                           class="w-full px-8 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl text-slate-900 font-black text-sm transition-all outline-none shadow-inner"
                           [class.bg-white]="editMode" [class.border-slate-100]="editMode" [class.focus:border-blue-400]="editMode">
                  </div>

                  <div class="flex flex-col gap-3 md:col-span-2">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 font-industrial-mono">BIO / ESPECIALIDADE TÉCNICA</label>
                    <textarea formControlName="bio" [readonly]="!editMode" rows="4"
                           class="w-full px-8 py-6 bg-slate-50 border-2 border-slate-50 rounded-2xl text-slate-900 font-black text-sm transition-all outline-none italic shadow-inner resize-none"
                           [class.bg-white]="editMode" [class.border-slate-100]="editMode" [class.focus:border-blue-400]="editMode"></textarea>
                  </div>
                </div>
              </div>

              <!-- Card Segurança -->
              <div class="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm group">
                <h3 class="text-[11px] font-black text-rose-600 uppercase tracking-[0.3em] mb-12 flex items-center gap-4 font-industrial-mono">
                   <i class="pi pi-lock text-lg"></i>
                   SEGURANÇA E CRIPTOGRAFIA
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8" *ngIf="editMode; else safetyPreview">
                  <div class="flex flex-col gap-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 font-industrial-mono">SENHA ATUAL</label>
                    <input type="password" formControlName="senhaAtual"
                           class="w-full px-8 py-5 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:border-rose-400 transition-all outline-none shadow-sm">
                  </div>
                  <div class="flex flex-col gap-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 font-industrial-mono">NOVA SENHA</label>
                    <input type="password" formControlName="novaSenha"
                           class="w-full px-8 py-5 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:border-rose-400 transition-all outline-none shadow-sm">
                  </div>
                  <div class="flex flex-col gap-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 font-industrial-mono">CONFIRME</label>
                    <input type="password" formControlName="confirmacaoNovaSenha"
                           class="w-full px-8 py-5 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:border-rose-400 transition-all outline-none shadow-sm">
                  </div>
                </div>
                <ng-template #safetyPreview>
                   <div class="flex items-center gap-5 text-slate-400 italic text-[11px] font-black p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 uppercase tracking-widest font-industrial-mono shadow-inner">
                      <i class="pi pi-shield text-xl text-blue-500"></i>
                      As configurações de segurança só podem ser alteradas no modo de edição.
                   </div>
                </ng-template>
              </div>

              <div class="pt-8 flex gap-6" *ngIf="editMode">
                <button type="submit" [disabled]="saving || profileForm.invalid" 
                  class="flex-1 px-10 py-6 bg-slate-900 hover:bg-black text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-slate-900/30 text-xs active:scale-95 disabled:opacity-50">
                  <i class="pi pi-save mr-3"></i>
                  {{ (saving ? 'B2B.CONFIG.SAVING' : 'B2B.CONFIG.SAVE') | translate }}
                </button>
                <button type="button" (click)="toggleEdit()" 
                  class="px-12 py-6 bg-white hover:bg-slate-50 text-slate-400 rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all text-xs active:scale-95 border border-slate-200">
                  {{ 'B2B.CONFIG.CANCEL' | translate }}
                </button>
              </div>
            </form>
          </ng-container>

          <!-- Formulário Criar Admin -->
          <ng-container *ngIf="showAdminForm">
            <form [formGroup]="adminForm" (ngSubmit)="criarAdmin()" class="space-y-10 animate-in slide-in-from-right-4 duration-700">
              <div class="bg-white p-16 rounded-[4rem] border border-blue-100 shadow-2xl shadow-blue-500/5 group relative overflow-hidden">
                <div class="absolute -right-10 -bottom-10 opacity-[0.03]">
                   <i class="pi pi-user-plus text-[15rem]"></i>
                </div>
                
                <h3 class="text-[12px] font-black text-blue-600 uppercase tracking-[0.4em] mb-12 flex items-center gap-5 font-industrial-mono">
                   <i class="pi pi-user-plus text-2xl"></i>
                   CADASTRO DE ENGENHARIA (B2B ADMIN)
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div class="flex flex-col gap-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 font-industrial-mono">NOME COMPLETO</label>
                    <input formControlName="nomeCompleto"
                           class="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:border-blue-600 transition-all outline-none shadow-inner">
                  </div>
                  <div class="flex flex-col gap-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 font-industrial-mono">E-MAIL CORPORATIVO</label>
                    <input formControlName="email"
                           class="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:border-blue-600 transition-all outline-none shadow-inner">
                  </div>
                  <div class="flex flex-col gap-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 font-industrial-mono">SENHA PRIMÁRIA</label>
                    <input type="password" formControlName="senha"
                           class="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:border-blue-600 transition-all outline-none shadow-inner">
                  </div>
                  <div class="flex flex-col gap-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 font-industrial-mono">CONFIRME SENHA</label>
                    <input type="password" formControlName="confirmacaoSenha"
                           class="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:border-blue-600 transition-all outline-none shadow-inner">
                  </div>
                </div>
              </div>

              <div class="pt-8 flex gap-6">
                <button type="submit" [disabled]="saving || adminForm.invalid" 
                  class="flex-1 px-10 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-blue-600/40 text-xs active:scale-95 disabled:opacity-50">
                  <i class="pi pi-check-circle mr-3"></i>
                  {{ saving ? 'PROCESSANDO...' : 'FINALIZAR CADASTRO INDUSTRIAL' }}
                </button>
                <button type="button" (click)="showAdminForm = false" 
                  class="px-12 py-6 bg-white hover:bg-slate-50 text-slate-400 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all text-xs active:scale-95 border border-slate-200">
                  VOLTAR
                </button>
              </div>
            </form>
          </ng-container>

        </div>
      </div>
    </div>
    <p-toast></p-toast>
  `,
})
export class PerfilComponent implements OnInit {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);

  profileForm: FormGroup;
  adminForm: FormGroup;
  editMode = false;
  showAdminForm = false;
  saving = false;

  constructor() {
    this.profileForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      bio: ['Liderando a revolução da manufatura aditiva 4.0...', [Validators.required]],
      senhaAtual: [''],
      novaSenha: [''],
      confirmacaoNovaSenha: ['']
    });

    this.adminForm = this.fb.group({
        nomeCompleto: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        confirmacaoSenha: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.carregarPerfil();
  }

  carregarPerfil() {
    this.usuarioService.obterPerfil().subscribe({
        next: (user) => {
            this.profileForm.patchValue({
                nome: user.nomeCompleto,
                email: user.email
            });
        },
        error: (err) => console.error('Erro ao carregar perfil:', err)
    });
  }

  getInitials() {
    const nome = this.profileForm.get('nome')?.value || 'Admin User';
    return nome.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (!this.editMode) this.carregarPerfil();
  }

  salvar() {
    if (this.profileForm.valid) {
      this.saving = true;
      this.usuarioService.atualizarPerfil({ 
        nomeCompleto: this.profileForm.get('nome')?.value,
        email: this.profileForm.get('email')?.value
      }).subscribe({
        next: (updatedUser) => {
          this.authService.updateUser({
            nomeCompleto: updatedUser.nomeCompleto,
            email: updatedUser.email
          });
          
          const novaSenha = this.profileForm.get('novaSenha')?.value;
          if (novaSenha) {
            this.usuarioService.atualizarSenha({
              senhaAntiga: this.profileForm.get('senhaAtual')?.value,
              novaSenha: novaSenha,
              confirmacaoSenha: this.profileForm.get('confirmacaoNovaSenha')?.value
            }).subscribe({
              next: () => {
                this.saving = false;
                this.editMode = false;
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: this.translate.instant('B2B.PERFIL.PASSWORD_SUCCESS') });
              },
              error: (err) => {
                this.saving = false;
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.message || 'Erro ao atualizar senha' });
              }
            });
          } else {
            this.saving = false;
            this.editMode = false;
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Perfil atualizado com sucesso!' });
          }
        },
        error: (err) => {
          this.saving = false;
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.translate.instant('B2B.PERFIL_EDIT.SAVE_ERROR') });
        }
      });
    }
  }

  criarAdmin() {
      if (this.adminForm.valid) {
          this.saving = true;
          this.usuarioService.criarAdmin(this.adminForm.value).subscribe({
              next: () => {
                  this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: this.translate.instant('B2B.PERFIL.ADMIN_SUCCESS') });
                  this.saving = false;
                  this.showAdminForm = false;
                  this.adminForm.reset();
              },
              error: (err) => {
                  this.saving = false;
                  this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.message || 'Erro ao criar administrador' });
              }
          });
      }
  }
}
