import { Component, OnInit, inject, signal } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  template: `
    <main class="max-w-4xl mx-auto mt-12 px-8 font-sans text-slate-700 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div class="bg-white rounded-[3.5rem] shadow-sm overflow-hidden border border-slate-200 relative group pb-16">
        <!-- Premium Banner Light -->
        <div class="h-64 bg-slate-50 relative border-b border-slate-200">
          <div class="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent"></div>
            
            <div class="absolute -bottom-24 left-12 flex items-end gap-10">
              <div class="w-48 h-48 bg-white rounded-full p-4 shadow-2xl border border-slate-100 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                <div class="w-full h-full bg-slate-50 rounded-full flex items-center justify-center relative overflow-hidden group/avatar border border-slate-100 shadow-inner">
                   <span class="text-5xl text-slate-900 font-black tracking-tighter">{{ getInitials() }}</span>
                  <div class="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                </div>
              </div>
              
              <div class="mb-10">
                 <h1 class="text-6xl font-black text-slate-900 tracking-tighter">{{ profileForm.get('nome')?.value || 'InovaLayer User' }}</h1>
                <div class="flex items-center gap-4 mt-3">
                   <span class="text-xs font-black text-blue-600 uppercase tracking-[0.3em] font-mono bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">{{ authService.getRole() || 'Admin' }}</span>
                  <span class="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                   <span class="text-xs font-black text-slate-400 uppercase tracking-[0.3em] font-mono">InovaLayer 3D</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Content Light -->
          <div class="px-16 pt-36 pb-8">
            <form [formGroup]="profileForm" (ngSubmit)="salvar()" class="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div class="space-y-8">
                <div>
                   <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 font-mono">{{ 'B2B.PERFIL.BIO_TITLE' | translate }}</h3>
                   <div *ngIf="!editMode" class="text-base text-slate-500 leading-relaxed italic font-medium">
                     {{ profileForm.get('bio')?.value }}
                   </div>
                   <textarea *ngIf="editMode" formControlName="bio" rows="4" 
                     class="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-sm italic font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"></textarea>
                </div>
                
                <div class="flex gap-4">
                  <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex-1 text-center shadow-inner">
                     <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-mono">{{ 'B2B.PERFIL.PATENTS' | translate }}</span>
                     <span class="text-2xl font-black text-slate-900 font-mono">08</span>
                   </div>
                   <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex-1 text-center shadow-inner">
                     <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-mono">{{ 'B2B.PERFIL.PAPERS' | translate }}</span>
                     <span class="text-2xl font-black text-slate-900 font-mono">24</span>
                   </div>
                </div>
              </div>

              <div class="space-y-8">
                <div *ngIf="!editMode" class="p-8 bg-blue-600 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-blue-600/30">
                  <div class="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                   <p class="text-white text-xl font-black italic relative z-10 text-center tracking-tight leading-relaxed">
                     {{ 'B2B.PERFIL.QUOTE' | translate }}
                   </p>
                </div>

                <div *ngIf="editMode" class="space-y-4">
                   <div>
                     <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Nome de Exibição</label>
                     <input type="text" formControlName="nome" class="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                   </div>
                   <div class="flex gap-3">
                     <button type="submit" class="flex-1 py-4 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">Salvar</button>
                     <button type="button" (click)="toggleEdit()" class="flex-1 py-4 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest">Cancelar</button>
                   </div>
                </div>

                <button *ngIf="!editMode" (click)="toggleEdit()" type="button" class="w-full py-4 border-2 border-slate-100 border-dashed hover:border-blue-500/30 hover:bg-blue-50/50 rounded-2xl text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-all">
                  {{ 'B2B.CONFIG.SAVE' | translate }} (Editar Informações)
                </button>
              </div>
            </form>

            <!-- Team Divider Light -->
            <div class="mt-20 pt-10 border-t border-slate-100">
               <h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-10 text-center font-mono font-bold">{{ 'B2B.PERFIL.LEADERSHIP' | translate }}</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] flex items-center gap-6 hover:border-blue-500/30 transition-all cursor-pointer group/co shadow-sm hover:shadow-lg">
                   <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-2xl font-black text-slate-900 border border-slate-200 group-hover/co:scale-105 transition-transform">RI</div>
                   <div>
                      <p class="text-xl font-black text-slate-900 tracking-tight">Rafael Inova</p>
                      <p class="text-[11px] font-black text-slate-500 uppercase tracking-widest mt-1 font-mono">Founder & {{ 'B2B.PERFIL.TECHNICAL_SPECIALIST' | translate }}</p>
                   </div>
                </div>
                <div class="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] flex items-center gap-6 hover:border-blue-500/30 transition-all cursor-pointer group/co shadow-sm hover:shadow-lg">
                   <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-2xl font-black text-slate-900 border border-slate-200 group-hover/co:scale-105 transition-transform">VL</div>
                   <div>
                      <p class="text-xl font-black text-slate-900 tracking-tight">Vinícius Layer</p>
                      <p class="text-[11px] font-black text-slate-500 uppercase tracking-widest mt-1 font-mono">Founder & {{ 'B2B.PERFIL.TECHNICAL_SPECIALIST' | translate }}</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  `,
})
export class PerfilComponent implements OnInit {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);

  profileForm: FormGroup;
  editMode = false;
  saving = false;

  constructor() {
    this.profileForm = this.fb.group({
      nome: ['Rafael / Vinicius', [Validators.required]],
      bio: ['Liderando a revolução da manufatura aditiva 4.0, focado em levar sistemas de deposição WAAM de alta taxa para a indústria pesada global.', [Validators.required]]
    });
  }

  ngOnInit() {
    // Carregar do estado se disponível
    const user = this.authService.currentUser();
    if (user?.email === 'admin@inovalayer.com') {
       this.profileForm.patchValue({ nome: 'Vinícius / Rafael' });
    }
  }

  getInitials() {
    const nome = this.profileForm.get('nome')?.value || 'V R';
    return nome.split(' ').map((n: string) => n[0]).join(' / ');
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  salvar() {
    if (this.profileForm.valid) {
      this.saving = true;
      // Simulando delay para UI
      setTimeout(() => {
        this.saving = false;
        this.editMode = false;
        // Aqui chamaria um UsuarioService.updatePerfil()
      }, 1000);
    }
  }
}
