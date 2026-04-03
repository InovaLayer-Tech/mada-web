import { Component, inject, signal } from '@angular/core';
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
    <div class="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-600">
      <!-- Sidebar Cliente -->
      <aside [class.w-72]="!isCollapsed()" [class.w-24]="isCollapsed()" 
             class="bg-white border-r border-slate-200 flex flex-col shadow-sm z-20 relative transition-all duration-300 ease-in-out">
        
        <!-- Botão Toggle (FORA DO OVERFLOW PARA NÃO CORTAR) -->
        <button (click)="toggleSidebar()" 
                class="absolute -right-4 top-24 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-lg hover:bg-slate-50 transition-all text-slate-400 hover:text-blue-600 z-[100] active:scale-90">
           <i [class]="isCollapsed() ? 'pi pi-angle-right' : 'pi pi-angle-left'" class="text-sm"></i>
        </button>

        <div class="p-4 flex flex-col h-full overflow-hidden">
          <!-- Identidade MADA -->
          <div class="flex items-center gap-3 mb-10 px-2 relative h-12">
            <div class="relative shrink-0 flex items-center justify-center" [class.mx-auto]="isCollapsed()">
              <img src="assets/images/inovalayer-circulada.png" alt="IL" 
                   [class.h-12]="!isCollapsed()" [class.h-10]="isCollapsed()"
                   class="w-auto object-contain transition-all duration-300">
              <div *ngIf="!isCollapsed()" class="absolute -right-2 top-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
            </div>
            
            <div *ngIf="!isCollapsed()" class="flex flex-col animate-fade-in whitespace-nowrap ml-1 shrink-0 overflow-hidden">
              <span class="text-[14px] font-black text-slate-900 leading-none">MADA CORE</span>
              <span class="text-[10px] font-bold text-blue-600 tracking-widest mt-0.5 uppercase">Portal Cliente</span>
            </div>
          </div>
          
          <!-- Seletor de Idioma -->
          <div class="px-2 mb-8 transition-all duration-300">
             <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner"
                  [class.flex-col]="isCollapsed()">
               <button (click)="languageService.setLanguage('PT')" 
                       class="flex-1 py-2 rounded-lg text-[9px] font-black tracking-widest transition-all uppercase"
                       [class.w-full]="isCollapsed()"
                       [class.bg-white]="languageService.idiomaAtivo() === 'PT'"
                       [class.text-blue-600]="languageService.idiomaAtivo() === 'PT'"
                       [class.shadow-sm]="languageService.idiomaAtivo() === 'PT'">
                 PT{{ isCollapsed() ? '' : '-BR' }}
               </button>
               <button (click)="languageService.setLanguage('EN')" 
                       class="flex-1 py-2 rounded-lg text-[9px] font-black tracking-widest transition-all uppercase"
                       [class.w-full]="isCollapsed()"
                       [class.bg-white]="languageService.idiomaAtivo() === 'EN'"
                       [class.text-blue-600]="languageService.idiomaAtivo() === 'EN'"
                       [class.shadow-sm]="languageService.idiomaAtivo() === 'EN'">
                 EN{{ isCollapsed() ? '' : '-US' }}
               </button>
             </div>
          </div>

          <!-- Navegação -->
          <nav class="flex flex-col gap-2 flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <div *ngIf="!isCollapsed()" class="px-4 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
              Operacional
            </div>

            <a routerLink="/cliente/dashboard" routerLinkActive="active-link"
               [title]="isCollapsed() ? 'Dashboard' : ''"
               [ngClass]="{'justify-center': isCollapsed(), 'p-4': isCollapsed()}"
               class="nav-item group">
              <i class="pi pi-home text-xl shrink-0 group-hover:scale-110 transition-transform"></i>
              <span *ngIf="!isCollapsed()" class="nav-text">Resumo Geral</span>
            </a>
            
            <a routerLink="/cliente/rfq" routerLinkActive="active-link"
               [title]="isCollapsed() ? 'Orçamentos MADA' : ''"
               [ngClass]="{'justify-center': isCollapsed(), 'p-4': isCollapsed()}"
               class="nav-item group">
              <i class="pi pi-file-plus text-xl shrink-0 group-hover:scale-110 transition-transform"></i>
              <span *ngIf="!isCollapsed()" class="nav-text">Orçamentos MADA</span>
            </a>

            <div class="my-4 h-px bg-slate-100 mx-4"></div>

            <a routerLink="/cliente/perfil" routerLinkActive="active-link"
               [title]="isCollapsed() ? 'Minha Empresa' : ''"
               [ngClass]="{'justify-center': isCollapsed(), 'p-4': isCollapsed()}"
               class="nav-item group">
              <i class="pi pi-building text-xl shrink-0 group-hover:scale-110 transition-transform"></i>
              <span *ngIf="!isCollapsed()" class="nav-text">Minha Empresa</span>
            </a>
          </nav>

          <!-- Perfil Bottom -->
          <div class="mt-auto pt-4 border-t border-slate-100">
             <div *ngIf="!isCollapsed()" class="flex items-center gap-3 px-3 py-3 rounded-2xl bg-slate-50 mb-4 overflow-hidden animate-fade-in italic">
               <div class="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white text-[10px] font-black shadow-lg uppercase">
                 {{ (authService.currentUser()?.nomeCompleto?.substring(0, 2) || 'CL') }}
               </div>
               <div class="flex flex-col overflow-hidden">
                 <span class="text-[12px] font-black text-slate-900 truncate leading-tight uppercase">{{ authService.currentUser()?.nomeCompleto || 'Cliente' }}</span>
                 <span class="text-[9px] font-bold text-slate-400 tracking-wide truncate">Conta Ativa</span>
               </div>
             </div>

            <button (click)="authService.logout()" 
                    class="flex items-center gap-4 px-4 py-3 w-full rounded-2xl hover:bg-red-50 text-red-500 transition-all font-bold text-sm" 
                    [class.justify-center]="isCollapsed()"
                    [title]="isCollapsed() ? 'Logout' : ''">
                <i class="pi pi-power-off text-lg shrink-0"></i>
                <span *ngIf="!isCollapsed()" class="whitespace-nowrap animate-fade-in uppercase">Logout Sistema</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Focal Area -->
      <main class="flex-1 overflow-y-auto relative bg-slate-50 flex flex-col">
        <section class="p-8 lg:p-12 flex-1 relative z-10 w-full max-w-7xl mx-auto">
          <router-outlet></router-outlet>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .nav-item {
      display: flex;
      align-items: center;
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
    }
    .nav-item:hover { background-color: #f8fafc; color: #0f172a; }
    .active-link {
      background-color: #eff6ff !important;
      color: #1d4ed8 !important;
      border-color: #dbeafe !important;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    .active-link i { color: #2563eb !important; transform: scale(1.1); }
    .nav-text { white-space: nowrap; animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
  `]
})
export class B2cLayoutComponent {
  public authService = inject(AuthService);
  protected languageService = inject(LanguageService);
  isCollapsed = signal(false);

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}
