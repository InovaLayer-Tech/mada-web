import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-b2b-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-600">
      <!-- Sidebar B2B (Back-Office LIGHT CORPORATE) -->
      <aside [class.w-72]="!isCollapsed()" [class.w-24]="isCollapsed()" 
             [style.--nav-justify]="isCollapsed() ? 'center' : 'flex-start'"
             class="bg-white border-r border-slate-200 flex flex-col shadow-sm z-20 relative overflow-hidden transition-all duration-300 ease-in-out">
        
        <div class="p-4 relative z-10 flex flex-col h-full">
          <!-- Logo e Toggle -->
          <div class="flex items-center gap-3 mb-10 px-2">
            <div class="relative shrink-0">
              <img src="assets/images/inovalayer-circulada.png" alt="IL" 
                   [class.h-12]="!isCollapsed()" [class.h-10]="isCollapsed()"
                   class="w-auto transition-all duration-300">
              <div *ngIf="!isCollapsed()" class="absolute -right-2 -top-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div *ngIf="!isCollapsed()" class="flex flex-col overflow-hidden animate-fade-in">
              <span class="text-[14px] font-black text-slate-900 leading-none">INOVALAYER</span>
              <span class="text-[10px] font-bold text-blue-600 tracking-widest mt-0.5">MADA OS</span>
            </div>
            <button (click)="toggleSidebar()" 
                    class="ml-auto p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-blue-600">
               <i [class]="isCollapsed() ? 'pi pi-angle-right' : 'pi pi-angle-left'" class="text-sm"></i>
            </button>
          </div>

          <!-- Menu de Navegação -->
          <nav class="flex flex-col gap-2 flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <!-- SEÇÃO PRINCIPAL -->
            <div *ngIf="!isCollapsed()" class="px-4 mb-2 mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
              Operação
            </div>

            <a [routerLink]="['/b2b/pedidos']" routerLinkActive="active-link"
               [title]="isCollapsed() ? 'Fila de Pedidos' : ''"
               class="nav-item w-full group">
              <i class="pi pi-list text-xl shrink-0 group-hover:scale-110 transition-all"></i>
              <span *ngIf="!isCollapsed()" class="nav-text">Fila de Pedidos</span>
            </a>
            
            <a [routerLink]="['/b2b/motor']" routerLinkActive="active-link"
               [title]="isCollapsed() ? 'Motor Metrológico' : ''"
               class="nav-item w-full group">
              <i class="pi pi-cog text-xl shrink-0 group-hover:rotate-45 transition-all"></i>
              <span *ngIf="!isCollapsed()" class="nav-text">Motor Metrológico</span>
            </a>

            <a [routerLink]="['/b2b/auditoria']" routerLinkActive="active-link"
               [title]="isCollapsed() ? 'Dashboard Auditoria' : ''"
               class="nav-item w-full group">
              <i class="pi pi-shield text-xl shrink-0 group-hover:scale-110 transition-all"></i>
              <span *ngIf="!isCollapsed()" class="nav-text">Dashboard Auditoria</span>
            </a>

            <!-- SEÇÃO INFRA -->
            <div class="my-4">
               <div *ngIf="!isCollapsed()" class="px-4 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
                 Metodologia
               </div>
               <div *ngIf="isCollapsed()" class="h-px bg-slate-100 mx-4"></div>
            </div>

            <a [routerLink]="['/b2b/metodologia']" routerLinkActive="active-link"
               [title]="isCollapsed() ? 'Glossário MADA' : ''"
               class="nav-item w-full group">
              <i class="pi pi-book text-xl shrink-0 group-hover:scale-110 transition-all"></i>
              <span *ngIf="!isCollapsed()" class="nav-text">Glossário MADA</span>
            </a>

            <a [routerLink]="['/b2b/catalogo']" routerLinkActive="active-link"
               [title]="isCollapsed() ? 'Catálogo de Insumos' : ''"
               class="nav-item w-full group">
              <i class="pi pi-database text-xl shrink-0 group-hover:scale-110 transition-all"></i>
              <span *ngIf="!isCollapsed()" class="nav-text">Catálogo Insumos</span>
            </a>

            <a [routerLink]="['/b2b/taxas']" routerLinkActive="active-link"
               [title]="isCollapsed() ? 'Configurações de Taxas' : ''"
               class="nav-item w-full group">
              <i class="pi pi-percentage text-xl shrink-0 group-hover:scale-110 transition-all"></i>
              <span *ngIf="!isCollapsed()" class="nav-text">Taxas e Regras</span>
            </a>
          </nav>

          <!-- Footer Perfil -->
          <div class="mt-auto pt-4 border-t border-slate-100 italic">
            <a [routerLink]="['/b2b/perfil']" routerLinkActive="active-link"
               class="flex items-center gap-4 px-3 py-3 rounded-2xl hover:bg-slate-50 transition-all group overflow-hidden" 
               [title]="isCollapsed() ? 'Meu Perfil' : ''">
              <div class="w-10 h-10 bg-blue-600 rounded-xl shrink-0 flex items-center justify-center text-white text-[11px] font-black shadow-lg group-hover:shadow-blue-200 transition-all">
                {{ (authService.currentUser()?.nomeCompleto?.substring(0, 2) || 'AD').toUpperCase() }}
              </div>
              <div *ngIf="!isCollapsed()" class="flex flex-col overflow-hidden animate-fade-in">
                <span class="text-[12px] font-black text-slate-900 truncate uppercase leading-tight">Configurações</span>
                <span class="text-[10px] font-bold text-slate-400 truncate tracking-wide">Minha Conta</span>
              </div>
            </a>
            
            <button (click)="authService.logout()" 
                    class="mt-2 flex items-center gap-4 px-4 py-3 w-full rounded-2xl hover:bg-red-50 text-red-500 transition-all font-bold text-sm overflow-hidden" 
                    [title]="isCollapsed() ? 'Sair do Sistema' : ''">
                <i class="pi pi-power-off text-lg shrink-0"></i>
                <span *ngIf="!isCollapsed()" class="whitespace-nowrap animate-fade-in uppercase">Encerrar Sessão</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto relative bg-slate-50 flex flex-col">
        <!-- Top Bar Header Clean -->
        <header class="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-12 shrink-0">
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold tracking-tight text-slate-900 font-sans italic">MADA <span class="text-blue-600 not-italic">BACK-OFFICE</span></h1>
            <div class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono mt-1">
              <span>UNIDADE DE ENGENHARIA</span>
              <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>MATRIZ WAAM</span>
            </div>
          </div>

          <div class="flex items-center gap-6">
             <!-- Seletor de Idioma Estilo Pílula -->
             <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
               <button (click)="languageService.setLanguage('PT')" 
                       class="px-4 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all uppercase"
                       [class.bg-white]="languageService.idiomaAtivo() === 'PT'"
                       [class.text-blue-600]="languageService.idiomaAtivo() === 'PT'"
                       [class.shadow-sm]="languageService.idiomaAtivo() === 'PT'">
                 PT-BR
               </button>
               <button (click)="languageService.setLanguage('EN')" 
                       class="px-4 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all uppercase"
                       [class.bg-white]="languageService.idiomaAtivo() === 'EN'"
                       [class.text-blue-600]="languageService.idiomaAtivo() === 'EN'"
                       [class.shadow-sm]="languageService.idiomaAtivo() === 'EN'">
                 EN-US
               </button>
             </div>
          </div>
        </header>

        <section class="p-12 flex-1">
          <router-outlet></router-outlet>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .nav-item {
      display: flex;
      align-items: center;
      justify-content: var(--nav-justify, flex-start);
      gap: 1rem;
      padding: 0.875rem 1rem;
      border-radius: 1.25rem;
      font-size: 14px;
      font-weight: 700;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid transparent;
      color: #475569;
      overflow: hidden;
      cursor: pointer;
      width: 100%;
    }
    .nav-item:hover {
      background-color: #f8fafc;
      color: #0f172a;
    }
    .active-link {
      background-color: #eff6ff !important;
      color: #1d4ed8 !important;
      border-color: #dbeafe !important;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    .active-link i {
      color: #2563eb !important;
      transform: scale(1.1);
    }
    .nav-text {
      white-space: nowrap;
      animation: fadeIn 0.3s ease-out;
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `]
})
export class B2bLayoutComponent {
  public authService = inject(AuthService);
  protected languageService = inject(LanguageService);
  
  isCollapsed = signal(true);

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}
