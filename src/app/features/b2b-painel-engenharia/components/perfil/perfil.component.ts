import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full w-full font-sans pb-12 overflow-y-auto bg-slate-50 text-slate-700">
      <main class="max-w-4xl mx-auto mt-12 px-8">
        <div class="bg-white rounded-[3.5rem] shadow-sm overflow-hidden border border-slate-200 relative group">
          <!-- Premium Banner Light -->
          <div class="h-64 bg-slate-100 relative overflow-hidden border-b border-slate-200">
            <div class="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
            
            <div class="absolute -bottom-24 left-12 flex items-end gap-10">
              <div class="w-44 h-44 bg-white rounded-[3rem] p-4 shadow-xl border border-slate-100">
                <div class="w-full h-full bg-slate-50 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group/avatar border border-slate-100">
                  <span class="text-6xl text-slate-900 font-black tracking-tighter">VR</span>
                  <div class="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                </div>
              </div>
              
              <div class="mb-10">
                <h1 class="text-5xl font-black text-slate-900 tracking-tighter">Vinicius Rafael</h1>
                <div class="flex items-center gap-4 mt-3">
                  <span class="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] font-mono bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">Founder & CEO</span>
                  <span class="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                  <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono">InovaLayer 3D</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Content Light -->
          <div class="px-16 pt-32 pb-16">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div class="space-y-8">
                <div>
                   <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 font-mono">Bio Corporativa</h3>
                   <p class="text-sm text-slate-500 leading-relaxed italic font-medium">
                     Liderando a revolução da manufatura aditiva 4.0, focado em levar sistemas de deposição WAAM de alta taxa para a indústria pesada global.
                   </p>
                </div>
                
                <div class="flex gap-4">
                  <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex-1 text-center shadow-inner">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-mono">Patentes</span>
                    <span class="text-xl font-black text-slate-900 font-mono">08</span>
                  </div>
                  <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex-1 text-center shadow-inner">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-mono">Papers</span>
                    <span class="text-xl font-black text-slate-900 font-mono">24</span>
                  </div>
                </div>
              </div>

              <div class="space-y-8">
                <div class="p-8 bg-slate-900 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-slate-900/10">
                  <div class="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                  <p class="text-white text-base font-black italic relative z-10 text-center tracking-tight leading-relaxed">
                    "Nossa missão é democratizar a alta performance na deposição metálica, unindo precisão metrológica e eficiência operacional."
                  </p>
                </div>
              </div>
            </div>

            <!-- Team Divider Light -->
            <div class="mt-20 pt-10 border-t border-slate-100">
              <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 text-center font-mono font-bold">Liderança Executiva</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] flex items-center gap-6 hover:border-blue-500/30 transition-all cursor-pointer group/co shadow-sm hover:shadow-lg">
                   <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-2xl font-black text-slate-900 border border-slate-200 group-hover/co:scale-105 transition-transform">RI</div>
                   <div>
                     <p class="text-lg font-black text-slate-900 tracking-tight">Rafael Inova</p>
                     <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1 font-mono">Founder & Technical Specialist</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class PerfilComponent {}
