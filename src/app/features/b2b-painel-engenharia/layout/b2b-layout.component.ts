import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-b2b-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-600">
      <!-- Sidebar B2B (Back-Office LIGHT CORPORATE) -->
      <aside class="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20 relative overflow-hidden">
        
        <div class="p-8 relative z-10">
          <div class="mb-12">
            <img src="assets/images/inovalayer-semfundo.png" alt="InovaLayer 3D" class="h-8 w-auto">
          </div>

          <nav class="space-y-1.5">
            <a routerLink="/b2b/pedidos" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-4 rounded-xl text-[15px] font-black transition-all border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 group">
              <i class="pi pi-list text-xl group-hover:text-blue-600 transition-colors"></i>
              <span>Fila de RFQs</span>
            </a>
            <a routerLink="/b2b/motor" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-4 rounded-xl text-[15px] font-black transition-all border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 group">
              <i class="pi pi-cog text-xl group-hover:text-blue-600 transition-colors"></i>
              <span>Motor Metrológico</span>
            </a>
            <a routerLink="/b2b/auditoria" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-4 rounded-xl text-[15px] font-black transition-all border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 group">
              <i class="pi pi-shield text-xl group-hover:text-blue-600 transition-colors"></i>
              <span>Auditoria Metrológica</span>
            </a>
            
            <div class="h-8"></div>
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-5 mb-4 block font-mono">Infraestrutura</span>
            
            <a routerLink="/b2b/catalogo" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-4 rounded-xl text-[15px] font-black transition-all border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 group">
              <i class="pi pi-database text-xl group-hover:text-blue-600 transition-colors"></i>
              <span>Catálogo de Insumos</span>
            </a>
            <a routerLink="/b2b/taxas" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-4 rounded-xl text-[15px] font-black transition-all border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 group">
              <i class="pi pi-percentage text-xl group-hover:text-blue-600 transition-colors"></i>
              <span>Regras e Taxas Globais</span>
            </a>
          </nav>
        </div>

        <div class="mt-auto p-8 relative z-10">
           <a routerLink="/b2b/perfil" class="flex items-center gap-4 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-200/50 hover:border-blue-200 transition-all group overflow-hidden relative">
             <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
               V
             </div>
             <div class="flex-1 overflow-hidden">
               <p class="text-sm font-black text-slate-900 truncate">Vinicius Rafael</p>
               <p class="text-[9px] font-black text-blue-600 uppercase tracking-widest truncate font-mono">CEO & Founder</p>
             </div>
             <i class="pi pi-chevron-right text-[10px] text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
           </a>
           
           <!-- Seletor de Idiomas Light -->
           <div class="mt-6 flex gap-2">
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
             <button class="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
               <i class="pi pi-bell"></i>
             </button>
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
  idiomaAtivo = 'PT';

  setIdioma(idioma: string) {
    this.idiomaAtivo = idioma;
  }
}
