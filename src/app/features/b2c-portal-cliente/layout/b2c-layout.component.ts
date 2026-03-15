import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-b2c-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <!-- Sidebar B2C -->
      <aside class="w-72 bg-white border-r border-slate-200 flex flex-col shadow-xl z-20">
        <div class="p-8">
          <div class="mb-12 flex items-center justify-center">
            <img src="assets/images/inovalayer-semfundo.png" alt="InovaLayer 3D" class="h-20 w-auto drop-shadow-md">
          </div>

          <nav class="space-y-2">
            <a routerLink="/cliente/dashboard" routerLinkActive="bg-blue-50 text-blue-600 border-blue-200" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all border border-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-900">
              <i class="pi pi-home text-lg"></i>
              <span>Dashboard</span>
            </a>
            <a routerLink="/cliente/rfq" routerLinkActive="bg-blue-50 text-blue-600 border-blue-200" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all border border-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-900">
              <i class="pi pi-file-plus text-lg"></i>
              <span>Solicitar RFQ</span>
            </a>
          </nav>

          <!-- Seletor de Idiomas -->
          <div class="mt-12 pt-8 border-t border-slate-100">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Idioma / Language</span>
            <div class="flex gap-2">
              <button class="flex-1 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs font-black text-blue-600 flex items-center justify-center gap-2 uppercase tracking-tighter shadow-sm shadow-blue-600/5">
                <span class="text-lg">🇧🇷</span> PT
              </button>
              <button class="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-400 hover:border-blue-200 hover:text-blue-500 transition-all flex items-center justify-center gap-2 uppercase tracking-tighter whitespace-nowrap">
                <span class="text-lg">🇺🇸</span> EN
              </button>
            </div>
          </div>
        </div>

        <div class="mt-auto p-8 border-t border-slate-100">
           <a routerLink="/" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all text-red-400 hover:bg-red-50 hover:text-red-600">
              <i class="pi pi-sign-out text-lg"></i>
              <span>Sair</span>
            </a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto relative bg-slate-50">
        <header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-10">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portal do Cliente</span>
          </div>
          <div class="flex items-center gap-4">
            <a routerLink="/cliente/perfil" class="flex items-center gap-3 group">
              <div class="text-right hidden sm:block">
                <p class="text-xs font-black text-slate-900 leading-none">Cliente InovaLayer</p>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Gestão de Conta</p>
              </div>
              <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 group-hover:border-blue-500 transition-all">
                <i class="pi pi-user text-slate-400 group-hover:text-blue-500"></i>
              </div>
            </a>
          </div>
        </header>

        <section class="p-10">
          <router-outlet></router-outlet>
        </section>
      </main>
    </div>
  `
})
export class B2cLayoutComponent {}
