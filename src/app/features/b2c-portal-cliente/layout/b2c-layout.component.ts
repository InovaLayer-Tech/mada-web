import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-b2c-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <!-- Sidebar B2C -->
      <aside class="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20">
        <div class="p-8">
          <div class="mb-12 flex items-center">
            <img src="assets/images/inovalayer-semfundo.png" alt="InovaLayer3D" class="h-10 w-auto">
          </div>

          <nav class="space-y-4">
            <a routerLink="/cliente/dashboard" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-5 rounded-2xl text-[16px] font-black transition-all border border-transparent hover:bg-slate-50 text-slate-700 hover:text-slate-900">
              <i class="pi pi-home text-2xl"></i>
              <span>{{ 'SIDEBAR.B2C_DASHBOARD' | translate }}</span>
            </a>
            <a routerLink="/cliente/rfq" routerLinkActive="bg-blue-50 text-blue-700 border-blue-200 shadow-sm" class="flex items-center gap-4 px-5 py-5 rounded-2xl text-[16px] font-black transition-all border border-transparent hover:bg-slate-50 text-slate-700 hover:text-slate-900">
              <i class="pi pi-file-plus text-2xl"></i>
              <span>{{ 'SIDEBAR.B2C_NEW_RFQ' | translate }}</span>
            </a>
          </nav>

          <!-- Seletor de Idiomas Reativo -->
          <div class="mt-12 pt-8 border-t border-slate-100">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block font-mono">Global Language</span>
            <div class="flex gap-2">
              <button (click)="languageService.setLanguage('PT')"
                      [class.bg-blue-50]="languageService.idiomaAtivo() === 'PT'"
                      [class.text-blue-600]="languageService.idiomaAtivo() === 'PT'"
                      [class.border-blue-200]="languageService.idiomaAtivo() === 'PT'"
                      [class.bg-white]="languageService.idiomaAtivo() !== 'PT'"
                      [class.text-slate-400]="languageService.idiomaAtivo() !== 'PT'"
                      [class.border-slate-200]="languageService.idiomaAtivo() !== 'PT'"
                      class="flex-1 py-2 border rounded-lg text-[10px] font-black transition-all flex items-center justify-center gap-2 uppercase tracking-tighter hover:bg-slate-50">
                <span class="text-sm">🇧🇷</span> PT
              </button>
              <button (click)="languageService.setLanguage('EN')"
                      [class.bg-blue-50]="languageService.idiomaAtivo() === 'EN'"
                      [class.text-blue-600]="languageService.idiomaAtivo() === 'EN'"
                      [class.border-blue-200]="languageService.idiomaAtivo() === 'EN'"
                      [class.bg-white]="languageService.idiomaAtivo() !== 'EN'"
                      [class.text-slate-400]="languageService.idiomaAtivo() !== 'EN'"
                      [class.border-slate-200]="languageService.idiomaAtivo() !== 'EN'"
                      class="flex-1 py-2 border rounded-lg text-[10px] font-black transition-all flex items-center justify-center gap-2 uppercase tracking-tighter hover:bg-slate-50">
                <span class="text-sm">🇺🇸</span> EN
              </button>
            </div>
          </div>
        </div>

      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto relative bg-slate-50">
        <header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-10">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">InovaLayer3D {{ 'SIDEBAR.CUSTOMER_PORTAL' | translate }}</span>
          </div>
          <div class="flex items-center gap-6">
            <a routerLink="/cliente/perfil" class="flex items-center gap-3 group px-4 py-2 hover:bg-slate-50 rounded-xl transition-all">
              <div class="text-right hidden sm:block">
                <p class="text-xs font-black text-slate-900 leading-none">{{ authService.currentUser()?.nomeCompleto || authService.currentUser()?.email || 'Cliente' }}</p>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Portal Corporativo</p>
              </div>
              <div class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 group-hover:border-blue-500 transition-all">
                <div class="text-[10px] font-black text-blue-600">
                  {{ (authService.currentUser()?.nomeCompleto?.substring(0, 2) || authService.currentUser()?.email?.substring(0, 2) || 'CL').toUpperCase() }}
                </div>
              </div>
            </a>
            
            <button (click)="authService.logout()" class="w-10 h-10 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-100 rounded-xl flex items-center justify-center transition-all group" title="Sair">
              <i class="pi pi-power-off text-xs group-hover:rotate-12 transition-transform"></i>
            </button>
          </div>
        </header>

        <section class="p-10">
          <router-outlet></router-outlet>
        </section>
      </main>
    </div>
  `
})
export class B2cLayoutComponent {
  public authService = inject(AuthService);
  protected languageService = inject(LanguageService);
}
