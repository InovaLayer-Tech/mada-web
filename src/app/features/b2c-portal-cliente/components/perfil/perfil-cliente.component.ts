import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ClienteResponseDTO } from '../../../../core/models/cliente.model';
import { AuthService } from '../../../../core/services/auth.service';
import { UsuarioService } from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto mt-12 px-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12" *ngIf="cliente">
      <div class="mb-10 flex justify-between items-end">
        <div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight">{{ 'B2C.PERFIL.TITLE' | translate }}</h1>
          <p class="text-slate-500 mt-2">{{ 'B2C.PERFIL.SUBTITLE' | translate }}</p>
        </div>
        <button *ngIf="!editMode" (click)="toggleEdit()" class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
          {{ 'B2B.PERFIL.EDIT_BTN' | translate }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <!-- Sidebar Perfil -->
        <div class="md:col-span-4 space-y-6">
          <div class="text-center p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
            <img src="assets/images/inovalayer-circulada.png" alt="Logo InovaLayer" class="w-24 h-24 mx-auto mb-6 object-contain">
            <h2 class="text-xl font-black text-slate-900 leading-tight">{{ clienteForm.get('razaoSocial')?.value }}</h2>
            <p *ngIf="cliente.vip" class="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block">{{ 'B2C.PERFIL.VIP_CLIENT' | translate }}</p>
          </div>

          <div class="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden group">
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
            <h3 class="font-black text-lg mb-2 relative z-10">{{ 'B2C.PERFIL.SUPPORT_TITLE' | translate }}</h3>
            <p class="text-blue-100 text-xs leading-relaxed mb-6 relative z-10">{{ 'B2C.PERFIL.SUPPORT_DESC' | translate }}</p>
            <button class="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative z-10">{{ 'B2C.PERFIL.SUPPORT_BTN' | translate }}</button>
          </div>
        </div>

        <!-- Formulário Real -->
        <form [formGroup]="clienteForm" (ngSubmit)="salvar()" class="md:col-span-8">
          <div class="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
            <section>
              <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">DADOS DO RESPONSÁVEL</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">NOME COMPLETO</label>
                  <input type="text" [readonly]="!editMode" formControlName="nomeCompleto" 
                    [class.bg-slate-50]="!editMode" [class.bg-white]="editMode" [class.border-blue-500]="editMode"
                    class="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-all">
                </div>
                <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">E-MAIL DE ACESSO</label>
                  <input type="email" [readonly]="!editMode" formControlName="email" 
                    [class.bg-slate-50]="!editMode" [class.bg-white]="editMode" [class.border-blue-500]="editMode"
                    class="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-all">
                </div>
              </div>
            </section>

            <section>
              <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">{{ 'B2C.PERFIL.COMPANY_DATA' | translate }}</h3>
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{{ 'B2C.PERFIL.COMPANY_NAME' | translate }}</label>
                  <input type="text" [readonly]="!editMode" formControlName="razaoSocial" 
                    [class.bg-slate-50]="!editMode" [class.bg-white]="editMode" [class.border-blue-500]="editMode"
                    class="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-all">
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{{ 'B2C.PERFIL.CNPJ' | translate }}</label>
                    <input type="text" [readonly]="!editMode" formControlName="cnpj" 
                           [class.bg-slate-50]="!editMode" [class.bg-white]="editMode" [class.border-blue-500]="editMode"
                           class="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-all">
                  </div>
                  <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{{ 'B2C.PERFIL.SECTOR' | translate }}</label>
                    <select *ngIf="editMode" formControlName="setorAtuacao" class="w-full border border-blue-500 bg-white px-4 py-3 rounded-xl text-sm font-bold text-slate-900 focus:outline-none shadow-sm">
                      <option value="Aeroespacial / Defesa">{{ 'B2C.PERFIL.AERO' | translate }}</option>
                      <option value="Automotivo">Automotivo</option>
                      <option value="Energia">Energia</option>
                      <option value="Médico / Dental">Médico / Dental</option>
                    </select>
                    <input *ngIf="!editMode" type="text" readonly [value]="cliente?.setorAtuacao" class="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 focus:outline-none">
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">{{ 'B2C.PERFIL.ACCOUNT_SETTINGS' | translate }}</h3>
              <div class="space-y-4">
                <!-- Seção de Senha Separada -->
                <div *ngIf="editMode" class="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                  <h4 class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">ALTERAR SENHA (OPCIONAL)</h4>
                  <div class="grid grid-cols-1 gap-4">
                    <input type="password" formControlName="senhaAtual" placeholder="Senha Atual" class="w-full border border-slate-200 bg-white px-4 py-3 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all shadow-sm">
                    <input type="password" formControlName="novaSenha" placeholder="Nova Senha" class="w-full border border-slate-200 bg-white px-4 py-3 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all shadow-sm">
                    <input type="password" formControlName="confirmacaoNovaSenha" placeholder="Confirmar Nova Senha" class="w-full border border-slate-200 bg-white px-4 py-3 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all shadow-sm">
                  </div>
                </div>

                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                      <i class="pi pi-bell text-blue-600"></i>
                    </div>
                    <div>
                      <p class="text-sm font-black text-slate-800">{{ 'B2C.PERFIL.NOTIFICATIONS' | translate }}</p>
                      <p class="text-[10px] font-bold text-slate-400 uppercase">{{ 'B2C.PERFIL.NOTIF_DESC' | translate }}</p>
                    </div>
                  </div>
                  <div class="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                    <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                  </div>
                </div>

                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                      <i class="pi pi-globe text-blue-600"></i>
                    </div>
                    <div>
                      <p class="text-sm font-black text-slate-800">{{ 'B2C.PERFIL.LANGUAGE' | translate }}</p>
                      <p class="text-[10px] font-bold text-slate-400 uppercase">Português (Brasil)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div class="pt-6 flex gap-4" *ngIf="editMode">
              <button type="submit" [disabled]="saving || clienteForm.invalid" 
                class="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 text-xs text-center disabled:opacity-50">
                {{ (saving ? 'B2B.CONFIG.SAVING' : 'B2C.PERFIL.SAVE') | translate }}
              </button>
              <button type="button" (click)="toggleEdit()" 
                class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl font-black uppercase tracking-widest transition-all text-xs text-center">
                {{ 'B2B.CONFIG.CANCEL' | translate }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
export class PerfilClienteComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  
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
      this.carregarPerfil(); // Reset if cancel
    }
  }

  salvar() {
    if (this.clienteForm.valid && this.cliente) {
      this.saving = true;
      
      // Update Basic Info
      this.clienteService.atualizarPerfil(this.cliente.id, this.clienteForm.value).subscribe({
        next: (updated) => {
          this.authService.updateUser({
            nomeCompleto: updated.nomeCompleto,
            email: updated.email
          });
          this.cliente = updated;
          
          // Handle Password Change if requested
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
                alert('Informações e senha atualizadas com sucesso!');
              },
              error: (err: any) => {
                this.saving = false;
                alert(err.error?.message || 'Erro ao atualizar senha');
              }
            });
          } else {
            this.saving = false;
            this.editMode = false;
          }
        },
        error: () => {
          this.saving = false;
          alert('Erro ao atualizar perfil.');
        }
      });
    }
  }
}
