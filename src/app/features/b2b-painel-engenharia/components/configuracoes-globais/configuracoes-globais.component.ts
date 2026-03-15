import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuracoes-globais',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full w-full font-sans pb-20 overflow-y-auto bg-slate-950 text-slate-300">
      <main class="max-w-7xl mx-auto mt-12 px-8">
        <div class="mb-12">
          <h1 class="text-4xl font-black text-white tracking-tighter">Regras e Taxas Globais</h1>
          <p class="text-slate-500 mt-1 italic">Parâmetros operacionais e financeiros do motor metrológico.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <!-- Taxas Operacionais Dark -->
          <div class="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
            <div class="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-all"></div>
            
            <h3 class="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-10 font-mono flex items-center gap-3 relative z-10">
              <span class="w-6 h-px bg-blue-500/30"></span>
              P1: Índices de Custo
            </h3>

            <div class="space-y-8 relative z-10">
              <div class="space-y-2 group/field">
                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 font-mono transition-colors group-focus-within/field:text-blue-400">Tarifa de Energia (kWh)</label>
                <div class="relative">
                  <input type="number" 
                         [value]="0.80"
                         class="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-white font-black focus:outline-none focus:border-blue-500/50 transition-all">
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-600 font-mono">BRL</span>
                </div>
              </div>

              <div class="space-y-2 group/field">
                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 font-mono transition-colors group-focus-within/field:text-emerald-400">Taxa de Engenharia (Hora)</label>
                <div class="relative">
                  <input type="number" 
                         [value]="220.00"
                         class="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-white font-black focus:outline-none focus:border-emerald-500/50 transition-all">
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-600 font-mono">BRL</span>
                </div>
              </div>

              <div class="space-y-2 group/field">
                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 font-mono transition-colors group-focus-within/field:text-amber-400">Manutenção Preventiva (Sistêmica)</label>
                <div class="relative">
                  <input type="number" 
                         [value]="145.00"
                         class="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-white font-black focus:outline-none focus:border-amber-500/50 transition-all">
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-600 font-mono">BRL</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Multiplicadores Dark -->
          <div class="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
            <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-600/5 rounded-full blur-3xl group-hover:bg-emerald-600/10 transition-all"></div>
            
            <h3 class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-10 font-mono flex items-center gap-3 relative z-10">
              <span class="w-6 h-px bg-emerald-500/30"></span>
              P2: Margens e Risks
            </h3>

            <div class="space-y-8 relative z-10">
              <div class="space-y-2 group/field">
                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 font-mono transition-colors group-focus-within/field:text-emerald-400">Markup Industrial (%)</label>
                <div class="relative">
                  <input type="number" 
                         [value]="35"
                         class="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-white font-black focus:outline-none focus:border-emerald-500/50 transition-all">
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-600 font-mono">X</span>
                </div>
              </div>

              <div class="space-y-2 group/field">
                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 font-mono transition-colors group-focus-within/field:text-amber-400">Fator de Complexidade Geométrica</label>
                <div class="relative">
                  <input type="number" 
                         [value]="1.15"
                         class="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-white font-black focus:outline-none focus:border-amber-500/50 transition-all">
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-600 font-mono">INDEX</span>
                </div>
              </div>

              <div class="pt-6 relative z-10">
                <button class="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 active:translate-y-1">
                  <i class="pi pi-save text-lg"></i>
                  ATUALIZAR PARÂMETROS GLOBAIS
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 p-8 bg-slate-900/50 border border-white/5 rounded-[2rem] flex items-center gap-6">
           <div class="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
             <i class="pi pi-info-circle text-slate-400"></i>
           </div>
           <p class="text-[10px] font-black text-slate-500 uppercase leading-relaxed tracking-wider font-mono">As alterações nestas taxas afetarão todos os novos cálculos gerados a partir da confirmação. Cálculos antigos permanecerão com as taxas do momento da criação.</p>
        </div>
      </main>
    </div>
  `,
})
export class ConfiguracoesGlobaisComponent {}
