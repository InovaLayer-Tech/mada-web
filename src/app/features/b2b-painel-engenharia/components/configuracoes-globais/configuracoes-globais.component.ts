import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuracoes-globais',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full w-full font-sans pb-20 overflow-y-auto bg-slate-50 text-slate-700">
      <main class="max-w-7xl mx-auto mt-12 px-8">
        <div class="mb-12 border-b border-slate-200 pb-10">
          <h1 class="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Regras e Taxas Globais</h1>
          <p class="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mt-3 font-industrial-mono opacity-80">Parâmetros operacionais e financeiros do motor metrológico.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <!-- Energia Elétrica -->
          <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
            <h3 class="text-[11px] font-black text-amber-500 uppercase tracking-[0.3em] mb-8 font-industrial-mono flex items-center gap-4">
              <i class="pi pi-bolt"></i> Energia Elétrica
            </h3>
            <div class="space-y-6">
              <div>
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Custo por kWh (Tarifa)</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400 font-industrial-mono">R$</span>
                  <input type="number" [value]="0.80" class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-4 text-slate-900 font-black text-base font-industrial-mono focus:outline-none focus:border-amber-500 transition-all">
                </div>
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">kW Base (Máquina)</label>
                <div class="relative">
                   <input type="number" [value]="15.5" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-black text-base font-industrial-mono focus:outline-none focus:border-amber-500 transition-all">
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 font-industrial-mono">kW</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Mão de Obra -->
          <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
            <h3 class="text-[11px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-8 font-industrial-mono flex items-center gap-4">
              <i class="pi pi-users"></i> Mão de Obra
            </h3>
            <div class="space-y-6">
              <div>
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Hora Engenheiro</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400 font-industrial-mono">R$</span>
                  <input type="number" [value]="220.00" class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-4 text-slate-900 font-black text-base font-industrial-mono focus:outline-none focus:border-indigo-500 transition-all">
                </div>
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Hora Operador</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400 font-industrial-mono">R$</span>
                  <input type="number" [value]="85.00" class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-4 text-slate-900 font-black text-base font-industrial-mono focus:outline-none focus:border-indigo-500 transition-all">
                </div>
              </div>
            </div>
          </div>

          <!-- Metodologia AC -->
          <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
            <h3 class="text-[11px] font-black text-rose-500 uppercase tracking-[0.3em] mb-8 font-industrial-mono flex items-center gap-4">
              <i class="pi pi-cog"></i> Metodologia AC (Pós-Processamento)
            </h3>
            <div class="space-y-6">
              <div>
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Custo Base Usinagem CNC (Hora)</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400 font-industrial-mono">R$</span>
                  <input type="number" [value]="150.00" class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-4 text-slate-900 font-black text-base font-industrial-mono focus:outline-none focus:border-rose-500 transition-all">
                </div>
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Custo Base Tratamento Térmico (Hora)</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400 font-industrial-mono">R$</span>
                  <input type="number" [value]="120.00" class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-4 text-slate-900 font-black text-base font-industrial-mono focus:outline-none focus:border-rose-500 transition-all">
                </div>
              </div>
            </div>
          </div>

          <!-- Financeiro -->
          <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
            <h3 class="text-[11px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8 font-industrial-mono flex items-center gap-4">
              <i class="pi pi-chart-line"></i> Financeiro
            </h3>
            <div class="space-y-6">
              <div>
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Margem de Lucro Industrial</label>
                <div class="relative">
                  <input type="number" [value]="35" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-black text-base font-industrial-mono focus:outline-none focus:border-emerald-500 transition-all">
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 font-industrial-mono">%</span>
                </div>
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Taxa de Impostos (Média)</label>
                <div class="relative">
                  <input type="number" [value]="18.5" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-black text-base font-industrial-mono focus:outline-none focus:border-emerald-500 transition-all">
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 font-industrial-mono">%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="mt-12 flex justify-end">
          <button (click)="salvarAlteracoes()" 
                  [disabled]="isSaving"
                  class="px-10 py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center gap-4 min-w-[280px] justify-center">
            @if (isSaving) {
              <i class="pi pi-spinner pi-spin text-lg"></i>
              SALVANDO DADOS...
            } @else {
              <i class="pi pi-save text-lg"></i>
              SALVAR ALTERAÇÕES
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

