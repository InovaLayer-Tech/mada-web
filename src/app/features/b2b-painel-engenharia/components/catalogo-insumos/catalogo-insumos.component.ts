import { Component } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-insumos',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="h-full w-full font-sans pb-12 overflow-y-auto bg-slate-50 text-slate-700">
      <main class="max-w-7xl mx-auto mt-12 px-8">
        <div class="mb-10 flex justify-between items-end border-b border-slate-200 pb-10">
          <div>
            <h1 class="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">{{ 'B2B.CATALOGO.TITLE' | translate }}</h1>
            <p class="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mt-3 font-industrial-mono opacity-80">{{ 'B2B.CATALOGO.SUBTITLE' | translate }}</p>
          </div>
          <button class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center gap-3">
            <i class="pi pi-plus"></i>
            {{ 'B2B.CATALOGO.NEW_BTN' | translate }}
          </button>
        </div>

        <!-- Tabela de Arames -->
        <section class="mb-16">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-2 h-6 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
            <h2 class="text-xs font-black text-slate-700 uppercase tracking-[0.3em] font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.WIRES_SECTION' | translate }}</h2>
          </div>
          
          <div class="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 bg-slate-50/50">
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.SPEC' | translate }}</th>
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.COST_KG' | translate }}</th>
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest text-center font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.DENSITY' | translate }}</th>
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest text-center font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.EFFICIENCY' | translate }}</th>
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest text-center font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.STATUS' | translate }}</th>
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest text-right font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.ACTIONS' | translate }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                @for (item of aramesMock; track item.id) {
                  <tr class="hover:bg-slate-50/80 transition-colors group">
                    <td class="px-8 py-6">
                      <p class="text-base font-black text-slate-900">{{ item.nome }}</p>
                      <p class="text-xs font-black text-slate-400 uppercase tracking-widest mt-1 font-industrial-mono">{{ item.sigla }}</p>
                    </td>
                    <td class="px-8 py-6 text-base font-black text-blue-600 font-industrial-mono">R$ {{ item.preco.toFixed(2) }}</td>
                    <td class="px-8 py-6 text-base text-center font-black text-slate-600 font-industrial-mono">{{ item.densidade.toFixed(2) }}</td>
                    <td class="px-8 py-6 text-center">
                      <span class="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-black border border-blue-100 font-industrial-mono shadow-sm">{{ item.eficiencia }}%</span>
                    </td>
                    <td class="px-8 py-6 text-center">
                      <span class="px-3 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-xl border shadow-sm font-industrial-mono"
                            [ngClass]="item.ativo ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'">
                        {{ (item.ativo ? 'B2B.CATALOGO.TABLE.ACTIVE' : 'B2B.CATALOGO.TABLE.INACTIVE') | translate }}
                      </span>
                    </td>
                    <td class="px-8 py-6 text-right">
                      <button class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-all shadow-sm mr-2"><i class="pi pi-pencil text-sm"></i></button>
                      <button class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm"><i class="pi pi-trash text-sm"></i></button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>

        <!-- Tabela de Gases -->
        <section>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-2 h-6 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]"></div>
            <h2 class="text-xs font-black text-slate-700 uppercase tracking-[0.3em] font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.GASES_SECTION' | translate }}</h2>
          </div>
          
          <div class="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 bg-slate-50/50">
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.SPEC' | translate }}</th>
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.COST_M3' | translate }}</th>
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest text-center font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.FLOW' | translate }}</th>
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest text-center font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.STATUS' | translate }}</th>
                  <th class="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest text-right font-industrial-mono">{{ 'B2B.CATALOGO.TABLE.ACTIONS' | translate }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                @for (item of gasesMock; track item.id) {
                  <tr class="hover:bg-slate-50/80 transition-colors group">
                    <td class="px-8 py-6">
                      <p class="text-base font-black text-slate-900">{{ item.nome }}</p>
                      <p class="text-xs font-black text-slate-400 uppercase tracking-widest mt-1 font-industrial-mono">{{ item.sigla }}</p>
                    </td>
                    <td class="px-8 py-6 text-base font-black text-indigo-600 font-industrial-mono">R$ {{ item.preco.toFixed(2) }}</td>
                    <td class="px-8 py-6 text-base text-center font-black text-slate-600 font-industrial-mono">{{ item.vazaoGas }}</td>
                    <td class="px-8 py-6 text-center">
                      <span class="px-3 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-xl border shadow-sm font-industrial-mono"
                            [ngClass]="item.ativo ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'">
                        {{ (item.ativo ? 'B2B.CATALOGO.TABLE.ACTIVE' : 'B2B.CATALOGO.TABLE.INACTIVE') | translate }}
                      </span>
                    </td>
                    <td class="px-8 py-6 text-right">
                      <button class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all shadow-sm mr-2"><i class="pi pi-pencil text-sm"></i></button>
                      <button class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm"><i class="pi pi-trash text-sm"></i></button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  `
})
export class CatalogoInsumosComponent {
  aramesMock = [
    { id: '1', nome: 'Aço Inoxidável 316L (ER316LSi)', sigla: 'AISI 316L / 1.4430', preco: 55.00, densidade: 8.00, eficiencia: 97.5, ativo: true },
    { id: '2', nome: 'Aço Carbono ER70S-6', sigla: 'AWS A5.18 ER70S-6', preco: 18.50, densidade: 7.85, eficiencia: 95.0, ativo: true },
    { id: '3', nome: 'Liga Aeroespacial Titanium Grade 5', sigla: 'Ti-6Al-4V', preco: 450.00, densidade: 4.43, eficiencia: 99.0, ativo: false }
  ];

  gasesMock = [
    { id: '1', nome: 'Argônio 98% + CO2 2%', sigla: 'Inel-3 (WAAM Premium)', preco: 12.40, vazaoGas: 15, ativo: true },
    { id: '2', nome: 'Argônio 100% Puro', sigla: 'Ar 5.0 Industrial', preco: 18.20, vazaoGas: 18, ativo: true }
  ];
}

