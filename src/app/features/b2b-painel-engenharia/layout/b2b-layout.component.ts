import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-b2b-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen bg-slate-950 overflow-hidden font-sans text-slate-300">
      <!-- Sidebar B2B (Back-Office DARK PREMIUM) -->
      <aside class="w-72 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl z-20 relative overflow-hidden">
        <!-- Decoration Blur -->
        <div class="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
        
        <div class="p-8 relative z-10">
          <div class="mb-12">
            <img src="assets/images/inovalayer-semfundo.png" alt="InovaLayer 3D" class="h-16 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] brightness-110">
          </div>

          <nav class="space-y-1.5">
            <a routerLink="/b2b/pedidos" routerLinkActive="bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all border border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-100 group">
              <i class="pi pi-list text-lg group-hover:text-blue-400 transition-colors"></i>
              <span>Fila de RFQs</span>
            </a>
            <a routerLink="/b2b/motor" routerLinkActive="bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all border border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-100 group">
              <i class="pi pi-cog text-lg animate-spin-slow group-hover:text-blue-400 transition-colors"></i>
              <span>Motor Metrológico</span>
            </a>
            <a routerLink="/b2b/auditoria" routerLinkActive="bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all border border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-100 group">
              <i class="pi pi-shield text-lg group-hover:text-blue-400 transition-colors"></i>
              <span>Auditoria Metrológica</span>
            </a>
            
            <div class="h-6"></div>
            <span class="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] px-4 mb-3 block font-mono">Infraestrutura</span>
            
            <a routerLink="/b2b/catalogo" routerLinkActive="bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all border border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-100 group">
              <i class="pi pi-database text-lg group-hover:text-blue-400 transition-colors"></i>
              <span>Catálogo de Insumos</span>
            </a>
            <a routerLink="/b2b/taxas" routerLinkActive="bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all border border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-100 group">
              <i class="pi pi-percentage text-lg group-hover:text-blue-400 transition-colors"></i>
              <span>Regras e Taxas Globais</span>
            </a>
          </nav>
        </div>

        <div class="mt-auto p-8 relative z-10">
           <a routerLink="/b2b/perfil" class="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-md rounded-[1.5rem] border border-slate-700/50 hover:border-blue-500/30 transition-all group overflow-hidden relative">
             <div class="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>
             <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(37,99,235,0.3)]">
               V
             </div>
             <div class="flex-1 overflow-hidden">
               <p class="text-sm font-black text-slate-200 truncate">Vinicius Rafael</p>
               <p class="text-[9px] font-black text-blue-400 uppercase tracking-widest truncate font-mono">CEO & Founder</p>
             </div>
             <i class="pi pi-chevron-right text-[10px] text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"></i>
           </a>
           
           <!-- Seletor de Idiomas Dark -->
           <div class="mt-6 flex gap-2">
             <button class="flex-1 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-black text-slate-400 flex items-center justify-center gap-2 hover:border-blue-500/50 hover:text-blue-400 transition-all uppercase tracking-tighter">
               <span class="text-lg">🇧🇷</span> PT
             </button>
             <button class="flex-1 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-black text-slate-500 flex items-center justify-center gap-2 uppercase tracking-tighter">
               <span class="text-lg opacity-50">🇺🇸</span> EN
             </button>
           </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto relative bg-slate-950">
        <!-- Top Bar Header -->
        <header class="h-24 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-10 flex items-center justify-between px-12">
          <div class="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-mono">
            <span class="text-blue-400">Back-Office</span>
            <span class="text-slate-800">/</span>
            <span>Unidade Engenharia Matriz</span>
          </div>
          <div class="flex items-center gap-6">
             <div class="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black rounded-lg flex items-center gap-2 tracking-[0.2em]">
               <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
               SISTEMA OPERACIONAL
             </div>
             <button class="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all">
               <i class="pi pi-bell"></i>
             </button>
          </div>
        </header>

        <section class="p-12 relative overflow-hidden">
          <!-- Ambient Light Effects -->
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>
          <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -z-10"></div>
          
          <router-outlet></router-outlet>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .shadow-soft {
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
    }
  `]
})
export class B2bLayoutComponent {}
