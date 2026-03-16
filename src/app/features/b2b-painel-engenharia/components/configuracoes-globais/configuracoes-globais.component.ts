import { Component } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuracoes-globais',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="h-full w-full font-sans pb-20 overflow-y-auto bg-slate-50 text-slate-700">
      <main class="max-w-7xl mx-auto mt-12 px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div class="mb-12 border-b border-slate-200 pb-10">
          <h1 class="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">{{ 'B2B.CONFIG.TITLE' | translate }}</h1>
          <p class="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mt-3 font-industrial-mono opacity-80">{{ 'B2B.CONFIG.SUBTITLE' | translate }}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <!-- Energia Elétrica -->
          <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
            <h3 class="text-sm font-black text-amber-600 uppercase tracking-[0.3em] mb-8 font-industrial-mono flex items-center gap-4">
              <i class="pi pi-bolt"></i> {{ 'B2B.CONFIG.ENERGY' | translate }}
            </h3>
            <div class="space-y-6">
              <div>
                <label class="text-xs font-black text-slate-700 uppercase tracking-widest ml-1 mb-3 block">{{ 'B2B.CONFIG.KWH_COST' | translate }}</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 font-industrial-mono">R$</span>
                  <input type="number" [value]="0.80" class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-5 text-slate-900 font-black text-lg font-industrial-mono focus:outline-none focus:border-amber-500 transition-all shadow-inner">
                </div>
              </div>
              <div>
                <label class="text-xs font-black text-slate-700 uppercase tracking-widest ml-1 mb-3 block">{{ 'B2B.CONFIG.KW_BASE' | translate }}</label>
                <div class="relative">
                   <input type="number" [value]="15.5" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 font-black text-lg font-industrial-mono focus:outline-none focus:border-amber-500 transition-all shadow-inner">
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 font-industrial-mono">kW</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Mão de Obra -->
          <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
            <h3 class="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-8 font-industrial-mono flex items-center gap-4">
              <i class="pi pi-users"></i> {{ 'B2B.CONFIG.LABOR' | translate }}
            </h3>
            <div class="space-y-6">
              <div>
                <label class="text-xs font-black text-slate-700 uppercase tracking-widest ml-1 mb-3 block">{{ 'B2B.CONFIG.ENG_HOUR' | translate }}</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 font-industrial-mono">R$</span>
                  <input type="number" [value]="220.00" class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-5 text-slate-900 font-black text-lg font-industrial-mono focus:outline-none focus:border-indigo-500 transition-all shadow-inner">
                </div>
              </div>
              <div>
                <label class="text-xs font-black text-slate-700 uppercase tracking-widest ml-1 mb-3 block">{{ 'B2B.CONFIG.OP_HOUR' | translate }}</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 font-industrial-mono">R$</span>
                  <input type="number" [value]="85.00" class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-5 text-slate-900 font-black text-lg font-industrial-mono focus:outline-none focus:border-indigo-500 transition-all shadow-inner">
                </div>
              </div>
            </div>
          </div>

          <!-- Metodologia AC -->
          <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
            <h3 class="text-sm font-black text-rose-600 uppercase tracking-[0.3em] mb-8 font-industrial-mono flex items-center gap-4">
              <i class="pi pi-cog"></i> {{ 'B2B.CONFIG.AC_METHOD' | translate }}
            </h3>
            <div class="space-y-6">
              <div>
                <label class="text-xs font-black text-slate-700 uppercase tracking-widest ml-1 mb-3 block">{{ 'B2B.CONFIG.CNC_COST' | translate }}</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 font-industrial-mono">R$</span>
                  <input type="number" [value]="150.00" class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-5 text-slate-900 font-black text-lg font-industrial-mono focus:outline-none focus:border-rose-500 transition-all shadow-inner">
                </div>
              </div>
              <div>
                <label class="text-xs font-black text-slate-700 uppercase tracking-widest ml-1 mb-3 block">{{ 'B2B.CONFIG.HEAT_COST' | translate }}</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 font-industrial-mono">R$</span>
                  <input type="number" [value]="120.00" class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-5 text-slate-900 font-black text-lg font-industrial-mono focus:outline-none focus:border-rose-500 transition-all shadow-inner">
                </div>
              </div>
            </div>
          </div>

          <!-- Financeiro -->
          <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
            <h3 class="text-sm font-black text-emerald-600 uppercase tracking-[0.3em] mb-8 font-industrial-mono flex items-center gap-4">
              <i class="pi pi-chart-line"></i> {{ 'B2B.CONFIG.FINANCIAL' | translate }}
            </h3>
            <div class="space-y-6">
              <div>
                <label class="text-xs font-black text-slate-700 uppercase tracking-widest ml-1 mb-3 block">{{ 'B2B.CONFIG.PROFIT' | translate }}</label>
                <div class="relative">
                  <input type="number" [value]="35" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 font-black text-lg font-industrial-mono focus:outline-none focus:border-emerald-500 transition-all shadow-inner">
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 font-industrial-mono">%</span>
                </div>
              </div>
              <div>
                <label class="text-xs font-black text-slate-700 uppercase tracking-widest ml-1 mb-3 block">{{ 'B2B.CONFIG.TAX' | translate }}</label>
                <div class="relative">
                  <input type="number" [value]="18.5" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 font-black text-lg font-industrial-mono focus:outline-none focus:border-emerald-500 transition-all shadow-inner">
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 font-industrial-mono">%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="mt-12 flex justify-end">
          <button (click)="salvarAlteracoes()" 
                  [disabled]="isSaving"
                  class="px-10 py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-black uppercase tracking-[0.4em] rounded-[2rem] transition-all shadow-2xl shadow-blue-600/30 active:scale-95 flex items-center gap-4 min-w-[320px] justify-center">
            @if (isSaving) {
              <i class="pi pi-spinner pi-spin text-2xl"></i>
              {{ 'B2B.CONFIG.SAVING' | translate }}
            } @else {
              <i class="pi pi-save text-2xl"></i>
              {{ 'B2B.CONFIG.SAVE' | translate }}
            }
          </button>
        </div>
      </main>
    </div>
  `
})
export class ConfiguracoesGlobaisComponent {
  isSaving = false;

  salvarAlteracoes() {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
    }, 1500);
  }
}

