import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ClienteResponseDTO } from '../../../../core/models/cliente.model';
import { AuthService } from '../../../../core/services/auth.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, ToastModule],
  template: `
    <div class="max-w-7xl mx-auto mt-12 px-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24" *ngIf="cliente">
      <!-- Header de Perfil -->
      <div class="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
        <div class="flex items-center gap-8 z-10">
          <div class="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-blue-200 uppercase italic">
            {{ (cliente.nomeRazaoSocial.substring(0, 2) || 'CL').toUpperCase() }}
          </div>
          <div>
            <div class="flex items-center gap-3 mb-1">
               <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100">Portal Corporativo</span>
               <span *ngIf="cliente.vip" class="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-100 italic">MADA VIP</span>
            </div>
            <h1 class="text-4xl font-black text-slate-900 tracking-tighter">{{ 'B2C.PERFIL.TITLE' | translate }}</h1>
            <p class="text-slate-500 font-medium font-mono text-sm mt-1 uppercase tracking-widest">{{ 'B2C.PERFIL.SUBTITLE' | translate }}</p>
          </div>
        </div>
        
        <div class="flex gap-4 z-10">
          <button *ngIf="!editMode" (click)="toggleEdit()" 
            class="px-8 py-4 bg-slate-900 hover:bg-black text-white shadow-xl shadow-slate-900/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
            <i class="pi pi-user-edit"></i>
            {{ 'B2C.PERFIL.EDIT_BTN' | translate }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Dashboard Rápido Cliente -->
        <div class="space-y-8">
           <div class="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-100 pb-4">Status da Conta</h3>
              <div class="flex flex-col gap-6">
                 <div class="flex items-center justify-between">
                    <span class="text-sm font-bold text-slate-500">ID Digital</span>
                    <span class="text-xs font-black text-slate-900 font-mono">#{{ cliente.id.substring(0,8).toUpperCase() }}</span>
                 </div>
                 <div class="flex items-center justify-between">
                    <span class="text-sm font-bold text-slate-500">Classificação</span>
                    <span class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase border border-emerald-100">Ativa / Premium</span>
                 </div>
                 <div class="flex items-center justify-between">
                    <span class="text-sm font-bold text-slate-500">Setor</span>
                    <span class="text-xs font-black text-slate-900 uppercase">{{ cliente.setorAtuacao }}</span>
                 </div>
              </div>
              <div class="mt-10 pt-8 border-t border-slate-100 border-dashed">
                 <p class="text-[10px] text-slate-400 leading-relaxed italic">Como cliente MADA, sua empresa tem acesso prioritário ao Motor Metrológico e orçamentos formalizados pela metodologia WAAM.</p>
              </div>
           </div>
           
           <div class="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div class="absolute -right-6 -top-6 opacity-10 group-hover:rotate-12 transition-transform">
                 <i class="pi pi-shield text-9xl text-white"></i>
              </div>
              <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Segurança Industrial</h3>
              <p class="text-white text-lg font-black leading-snug mb-6">Proteja seu acesso ao sistema de RFQ</p>
              <button class="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">
                 Alterar Senha de Acesso
              </button>
           </div>
        </div>

        <form [formGroup]="clienteForm" (ngSubmit)="salvar()" class="lg:col-span-2 space-y-8">
          <!-- Card Informações da Empresa -->
          <div class="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm group">
            <h3 class="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-8 flex items-center gap-3">
               <i class="pi pi-building"></i>
               Informações Institucionais (DADOS C)
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Razão Social / Nome Fantasia</label>
                <input formControlName="razaoSocial" [readonly]="!editMode"
                       class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all outline-none"
                       [class.bg-white]="editMode" [class.border-slate-200]="editMode">
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CNPJ Institucional</label>
                <input formControlName="cnpj" [readonly]="!editMode"
                       class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all outline-none"
                       [class.bg-white]="editMode" [class.border-slate-200]="editMode">
              </div>

              <div class="flex flex-col gap-2 md:col-span-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Setor de Atuação / Segmento</label>
                <input formControlName="setorAtuacao" [readonly]="!editMode"
                       class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all outline-none"
                       [class.bg-white]="editMode" [class.border-slate-200]="editMode">
              </div>
            </div>
          </div>

          <!-- Card Contato -->
          <div class="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm group">
            <h3 class="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-8 flex items-center gap-3">
               <i class="pi pi-users"></i>
               Ponto de Contato Principal
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo do Responsável</label>
                <input formControlName="nomeCompleto" [readonly]="!editMode"
                       class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all outline-none"
                       [class.bg-white]="editMode" [class.border-slate-200]="editMode">
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
                <input formControlName="email" [readonly]="!editMode"
                       class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-black text-sm focus:bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all outline-none"
                       [class.bg-white]="editMode" [class.border-slate-200]="editMode">
              </div>
            </div>
          </div>

          <!-- Card Segurança (Exibido apenas em Edição) -->
          <div class="bg-white p-10 rounded-[2.5rem] border border-blue-200 shadow-xl shadow-blue-500/5 group animate-in slide-in-from-top-4 duration-500" *ngIf="editMode">
            <h3 class="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-8 flex items-center gap-3">
               <i class="pi pi-lock"></i>
               Alteração de Senha (Confirmacional)
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha Atual</label>
                <input type="password" formControlName="senhaAtual"
                       class="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-black text-sm focus:border-blue-500 transition-all outline-none">
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nova Senha</label>
                <input type="password" formControlName="novaSenha"
                       class="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-black text-sm focus:border-blue-500 transition-all outline-none">
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirme</label>
                <input type="password" formControlName="confirmacaoNovaSenha"
                       class="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-black text-sm focus:border-blue-500 transition-all outline-none">
              </div>
            </div>
          </div>

          <div class="pt-6 flex gap-4" *ngIf="editMode">
            <button type="submit" [disabled]="saving || clienteForm.invalid" 
              class="flex-1 px-8 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-blue-600/30 text-xs text-center disabled:opacity-50 active:scale-95">
              <i class="pi pi-save mr-2"></i>
              {{ (saving ? 'B2B.CONFIG.SAVING' : 'B2C.PERFIL.SAVE') | translate }}
            </button>
            <button type="button" (click)="toggleEdit()" 
              class="px-10 py-5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl font-black uppercase tracking-widest transition-all text-xs text-center active:scale-95">
              {{ 'B2B.CONFIG.CANCEL' | translate }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class PerfilClienteComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  private messageService = inject(MessageService);
  
  cliente: ClienteResponseDTO | null = null;
  clienteForm: FormGroup;
  editMode = false;
  saving = false;

  constructor() {
    this.clienteForm = this.fb.group({
      nomeCompleto: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      razaoSocial: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      setorAtuacao: ['', [Validators.required]],
      senhaAtual: [''],
      novaSenha: [''],
      confirmacaoNovaSenha: ['']
    });
  }

  ngOnInit() {
    this.carregarPerfil();
  }

  carregarPerfil() {
    this.clienteService.obterPerfilAtual().subscribe({
      next: (data) => {
        this.cliente = data;
        this.clienteForm.patchValue({
          nomeCompleto: data.nomeCompleto,
          email: data.email,
          razaoSocial: data.nomeRazaoSocial,
          cnpj: data.cnpj,
          setorAtuacao: data.setorAtuacao
        });
      },
      error: (err) => console.error('Erro ao carregar perfil', err)
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.carregarPerfil();
    }
  }

  salvar() {
    if (this.clienteForm.valid && this.cliente) {
      this.saving = true;
      this.clienteService.atualizarPerfil(this.cliente.id, this.clienteForm.value).subscribe({
        next: (updated) => {
          this.authService.updateUser({
            nomeCompleto: updated.nomeCompleto,
            email: updated.email
          });
          this.cliente = updated;
          
          const novaSenha = this.clienteForm.get('novaSenha')?.value;
          if (novaSenha) {
            this.usuarioService.atualizarSenha({
              senhaAntiga: this.clienteForm.get('senhaAtual')?.value,
              novaSenha: novaSenha,
              confirmacaoSenha: this.clienteForm.get('confirmacaoNovaSenha')?.value
            }).subscribe({
              next: () => {
                this.saving = false;
                this.editMode = false;
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Informações e senha atualizadas com sucesso!' });
              },
              error: (err: any) => {
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
        error: () => {
          this.saving = false;
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar perfil.' });
        }
      });
    }
  }
}
