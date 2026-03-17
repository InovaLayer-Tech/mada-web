import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-b2b-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-600">
      <!-- Sidebar B2B (Back-Office LIGHT CORPORATE) -->
      <aside class="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20 relative overflow-hidden">
        
        <div class="p-8 relative z-10">
          <div class="mb-12">
            <img src="assets/images/inovalayer-semfundo.png" alt="InovaLayer3D" class="h-10 w-auto">
          </div>

          <nav class="space-y-1.5">
            <a routerLink="/b2b/pedidos" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-5 rounded-2xl text-[16px] font-black transition-all border border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900 group">
              <i class="pi pi-list text-2xl group-hover:text-blue-600 transition-colors"></i>
              <span>{{ 'SIDEBAR.B2B_QUEUE' | translate }}</span>
            </a>
            <a routerLink="/b2b/motor" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-5 rounded-2xl text-[16px] font-black transition-all border border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900 group">
              <i class="pi pi-cog text-2xl group-hover:text-blue-600 transition-colors"></i>
              <span>{{ 'SIDEBAR.B2B_MOTOR' | translate }}</span>
            </a>
            <a routerLink="/b2b/auditoria" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-5 rounded-2xl text-[16px] font-black transition-all border border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900 group">
              <i class="pi pi-shield text-2xl group-hover:text-blue-600 transition-colors"></i>
              <span>{{ 'SIDEBAR.B2B_AUDIT' | translate }}</span>
            </a>
            
            <div class="h-10"></div>
            <span class="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] px-5 mb-6 block font-mono">{{ 'SIDEBAR.INFRASTRUCTURE' | translate }}</span>
            
            <a routerLink="/b2b/catalogo" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-5 rounded-2xl text-[16px] font-black transition-all border border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900 group">
              <i class="pi pi-database text-2xl group-hover:text-blue-600 transition-colors"></i>
              <span>{{ 'SIDEBAR.B2B_CATALOG' | translate }}</span>
            </a>
            <a routerLink="/b2b/taxas" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-5 rounded-2xl text-[16px] font-black transition-all border border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900 group">
              <i class="pi pi-percentage text-2xl group-hover:text-blue-600 transition-colors"></i>
              <span>{{ 'SIDEBAR.B2B_SETTINGS' | translate }}</span>
            </a>
          </nav>
        </div>

        <div class="mt-auto p-8 relative z-10">
           <!-- Seletor de Idiomas Light -->
           <div class="flex gap-2">
             <button (click)="setIdioma('PT')" 
                     [class.bg-blue-50]="idiomaAtivo === 'PT'"
                     [class.text-blue-600]="idiomaAtivo === 'PT'"
                     [class.border-blue-200]="idiomaAtivo === 'PT'"
                     [class.bg-white]="idiomaAtivo !== 'PT'"
                     [class.text-slate-400]="idiomaAtivo !== 'PT'"
                     [class.border-slate-200]="idiomaAtivo !== 'PT'"
                     class="flex-1 py-2 border rounded-lg text-xs font-black transition-all flex items-center justify-center gap-2 hover:bg-slate-50">
               <span class="text-lg">🇧🇷</span> PT
             </button>
             <button (click)="setIdioma('EN')" 
                     [class.bg-blue-50]="idiomaAtivo === 'EN'"
                     [class.text-blue-600]="idiomaAtivo === 'EN'"
                     [class.border-blue-200]="idiomaAtivo === 'EN'"
                     [class.bg-white]="idiomaAtivo !== 'EN'"
                     [class.text-slate-400]="idiomaAtivo !== 'EN'"
                     [class.border-slate-200]="idiomaAtivo !== 'EN'"
                     class="flex-1 py-2 border rounded-lg text-xs font-black transition-all flex items-center justify-center gap-2 hover:bg-slate-50">
               <span class="text-lg">🇺🇸</span> EN
             </button>
           </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto relative bg-slate-50">
        <!-- Top Bar Header -->
        <header class="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-12">
          <div class="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono">
            <span class="text-blue-600">Back-Office</span>
            <span class="text-slate-200">/</span>
            <span>Unidade Engenharia Matriz</span>
          </div>
          <div class="flex items-center gap-6">
             <div class="px-4 py-2 bg-blue-50 border border-blue-100 text-blue-600 text-[9px] font-black rounded-lg flex items-center gap-2 tracking-[0.2em]">
               <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-sm"></div>
               SISTEMA OPERACIONAL
             </div>
             
             <div class="h-8 w-px bg-slate-200 mx-2"></div>

             <!-- User Profile & Logout -->
             <div class="flex items-center gap-4">
                <a routerLink="/b2b/perfil" class="flex items-center gap-3 group px-4 py-2 hover:bg-slate-50 rounded-xl transition-all">
                  <div class="text-right">
                    <p class="text-[13px] font-black text-slate-900 leading-none">{{ authService.currentUser()?.email || 'Engenharia' }}</p>
                    <p class="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1">{{ authService.currentUser()?.role || 'Admin' }}</p>
                  </div>
                  <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-[10px] shadow-md">
                    {{ (authService.currentUser()?.email?.substring(0, 2) || 'IN').toUpperCase() }}
                  </div>
                </a>

                <button (click)="authService.logout()" class="w-10 h-10 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-100 rounded-xl flex items-center justify-center transition-all group" title="Sair">
                  <i class="pi pi-power-off text-xs group-hover:rotate-12 transition-transform"></i>
                </button>
             </div>
          </div>
        </header>

        <section class="p-12">
          <router-outlet></router-outlet>
        </section>
      </main>
    </div>
  `,
  styles: []
})
export class B2bLayoutComponent {
  private translate = inject(TranslateService);
  public authService = inject(AuthService);
  idiomaAtivo = 'PT';

  constructor() {
    this.translate.setDefaultLang('pt');
  }

  setIdioma(idioma: string) {
    this.idiomaAtivo = idioma;
    this.translate.use(idioma.toLowerCase());
  }
}
