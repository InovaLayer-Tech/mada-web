import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metodologia',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-7xl mx-auto p-4 lg:p-8 animate-fade-in relative z-10">
      <div class="mb-12">
        <h1 class="text-4xl font-black text-slate-900 tracking-tight italic">
          METODOLOGIA <span class="text-blue-600 not-italic">MADA</span>
        </h1>
        <p class="text-slate-500 mt-2 font-mono text-sm uppercase tracking-[0.3em]">
          GLOSSÁRIO TÉCNICO E NOMENCLATURAS WAAM (LAPROSOLDA/INOVALAYER)
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- CLASSE C: CLIENTE -->
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
          <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <span class="font-black text-xl">C</span>
          </div>
          <h3 class="text-xl font-black text-slate-800 mb-4 uppercase tracking-widest">CLASSE C: CLIENTE</h3>
          <ul class="space-y-4 text-sm font-bold text-slate-600">
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">C1</span> QUANTIDADE DE PEÇAS</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">C11</span> ENVELOPE (X, Y, Z)</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">C9</span> DATA DE ENTREGA</li>
          </ul>
        </div>

        <!-- CLASSE P: PARÂMETROS -->
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
          <div class="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all">
            <span class="font-black text-xl">P</span>
          </div>
          <h3 class="text-xl font-black text-slate-800 mb-4 uppercase tracking-widest">CLASSE P: CINÉTICA</h3>
          <ul class="space-y-4 text-sm font-bold text-slate-600">
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">P5</span> LIGA METALICA (ARAME)</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">P9</span> VELOCIDADE DE ALIMENTAÇÃO</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">P2</span> VAZÃO DO GÁS DE PROTEÇÃO</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">P11</span> TEMPO MORTO INTERCAMADA</li>
          </ul>
        </div>

        <!-- CLASSE S: SLICER/TEMPOS -->
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
          <div class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
            <span class="font-black text-xl">S</span>
          </div>
          <h3 class="text-xl font-black text-slate-800 mb-4 uppercase tracking-widest">CLASSE S: TEMPOS</h3>
          <ul class="space-y-4 text-sm font-bold text-slate-600">
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">S1</span> TEMPO DE ARCO ABERTO</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">S2</span> TEMPO DE POSICIONAMENTO</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">n</span> NÚMERO DE CAMADAS</li>
          </ul>
        </div>

        <!-- CLASSE O: OPERACIONAIS -->
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
          <div class="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <span class="font-black text-xl">O</span>
          </div>
          <h3 class="text-xl font-black text-slate-800 mb-4 uppercase tracking-widest">CLASSE O: OPERACIONAL</h3>
          <ul class="space-y-4 text-sm font-bold text-slate-600">
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">O6</span> TEMPO DE SETUP/PREPARAÇÃO</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">O7</span> TEMPO DE DESMONTAGEM</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">O10</span> CUSTO DO SUBSTRATO</li>
          </ul>
        </div>

        <!-- CLASSE RF: RISCOS -->
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
          <div class="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
            <span class="font-black text-xl">RF</span>
          </div>
          <h3 class="text-xl font-black text-slate-800 mb-4 uppercase tracking-widest">CLASSE RF: RISCOS</h3>
          <ul class="space-y-4 text-sm font-bold text-slate-600">
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">Rfo9</span> RISCO DE MATERIAL</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">Rfo13</span> RISCO DO GÁS</li>
            <li class="flex items-center gap-3"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono">Rftdt</span> RISCO DE TEMPO/MÁQUINA</li>
          </ul>
        </div>

        <!-- CLASSE AC/FC: CUSTOS FINAIS -->
        <div class="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl transition-all group">
          <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6">
            <span class="font-black text-xl">FC</span>
          </div>
          <h3 class="text-xl font-black text-white mb-4 uppercase tracking-widest">FINANCEIRO</h3>
          <ul class="space-y-4 text-sm font-bold text-slate-400">
            <li class="flex items-center gap-3"><span class="bg-white/10 px-2 py-1 rounded text-[10px] font-mono text-white">AC</span> ATIVIDADES COMPLEMENTARES</li>
            <li class="flex items-center gap-3"><span class="bg-white/10 px-2 py-1 rounded text-[10px] font-mono text-white">TC</span> CUSTO TOTAL (INDUSTRIAL)</li>
            <li class="flex items-center gap-3"><span class="bg-green-500/20 px-2 py-1 rounded text-[10px] font-mono text-green-400">FC</span> PREÇO FINAL SUGERIDO</li>
          </ul>
        </div>
      </div>

      <div class="mt-12 bg-blue-600 rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
         <div class="absolute -right-20 -top-20 text-white opacity-10 rotate-12">
            <i class="pi pi-briefcase text-[300px]"></i>
         </div>
         <div class="relative z-10">
            <h2 class="text-3xl font-black mb-6 uppercase tracking-tighter">O ALGORITMO MADA</h2>
            <p class="text-xl font-bold text-blue-100 leading-relaxed max-w-4xl tracking-tight">
              Desenvolvido no Laboratório <span class="text-white underline">Laprosolda (UFU)</span>, o motor MADA reconcilia dados de pré-processamento (slicer) com variáveis de setup industrial para garantir que cada centímetro cúbico de WAAM seja orçado com precisão técnica e segurança metalúrgica.
            </p>
         </div>
      </div>
    </section>
  `,
  styles: []
})
export class MetodologiaComponent {}
