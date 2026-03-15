import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-insumos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full w-full font-sans pb-12 overflow-y-auto bg-slate-950 text-slate-300">
      <main class="max-w-7xl mx-auto mt-12 px-8">
        <div class="mb-12 flex justify-between items-end">
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter">Catálogo de Insumos</h1>
            <p class="text-slate-500 mt-1 italic">Gestão de matérias-primas e gases para deposição WAAM.</p>
          </div>
          <button class="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-blue-600/20 active:translate-y-0.5 transition-all flex items-center gap-2">
            <i class="pi pi-plus text-xs"></i>
            Novo Insumo
          </button>
        </div>

        <!-- Tabela de Arames Dark -->
        <section class="mb-16">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>
            <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono">Consumíveis (Arames Metálicos)</h2>
          </div>
          
          <div class="bg-slate-900 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-white/5 bg-white/5">
                  <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Especificação Técnica</th>
                  <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Custo (R$/kg)</th>
                  <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center font-mono">Densidade</th>
                  <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center font-mono">Taxa Perda</th>
                  <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right font-mono">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr class="hover:bg-white/5 transition-colors group">
                  <td class="px-8 py-6">
                    <p class="text-sm font-black text-white">Aço Inoxidável 316L (ER316LSi)</p>
                    <p class="text-[10px] font-bold text-slate-500 uppercase font-mono">AISI 316L / 1.4430</p>
                  </td>
                  <td class="px-8 py-6 text-sm font-black text-blue-400 font-mono">R$ 55,00</td>
                  <td class="px-8 py-6 text-sm text-center font-bold text-slate-400 italic">8.00</td>
                  <td class="px-8 py-6 text-center">
                    <span class="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md text-[10px] font-black border border-blue-500/20">2.5%</span>
                  </td>
                  <td class="px-8 py-6 text-right">
                    <button class="text-slate-500 hover:text-blue-400 transition-colors p-2"><i class="pi pi-pencil"></i></button>
                    <button class="text-slate-500 hover:text-red-400 transition-colors p-2"><i class="pi pi-trash"></i></button>
                  </td>
                </tr>
                <tr class="hover:bg-white/5 transition-colors group">
                  <td class="px-8 py-6">
                    <p class="text-sm font-black text-white">Aço Carbono ER70S-6</p>
                    <p class="text-[10px] font-bold text-slate-500 uppercase font-mono">AWS A5.18 ER70S-6</p>
                  </td>
                  <td class="px-8 py-6 text-sm font-black text-blue-400 font-mono">R$ 18,50</td>
                  <td class="px-8 py-6 text-sm text-center font-bold text-slate-400 italic">7.85</td>
                  <td class="px-8 py-6 text-center">
                    <span class="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md text-[10px] font-black border border-blue-500/20">3.0%</span>
                  </td>
                  <td class="px-8 py-6 text-right">
                    <button class="text-slate-500 hover:text-blue-400 transition-colors p-2"><i class="pi pi-pencil"></i></button>
                    <button class="text-slate-500 hover:text-red-400 transition-colors p-2"><i class="pi pi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Tabela de Gases Dark -->
        <section>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1.5 h-6 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono">Proteção (Gases Atmosféricos)</h2>
          </div>
          
          <div class="bg-slate-900 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-white/5 bg-white/5">
                  <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Mistura / Gás</th>
                  <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Custo (R$/m³)</th>
                  <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center font-mono">Vazão (L/min)</th>
                  <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right font-mono">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr class="hover:bg-white/5 transition-colors group">
                  <td class="px-8 py-6">
                    <p class="text-sm font-black text-white">Argônio 98% + CO2 2%</p>
                    <p class="text-[10px] font-bold text-slate-500 uppercase font-mono">Inel-3 (WAAM Premium)</p>
                  </td>
                  <td class="px-8 py-6 text-sm font-black text-emerald-400 font-mono">R$ 12,40</td>
                  <td class="px-8 py-6 text-sm text-center font-bold text-slate-400 italic">15</td>
                  <td class="px-8 py-6 text-right">
                    <button class="text-slate-500 hover:text-blue-400 transition-colors p-2"><i class="pi pi-pencil"></i></button>
                    <button class="text-slate-500 hover:text-red-400 transition-colors p-2"><i class="pi pi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  `
})
export class CatalogoInsumosComponent {}
