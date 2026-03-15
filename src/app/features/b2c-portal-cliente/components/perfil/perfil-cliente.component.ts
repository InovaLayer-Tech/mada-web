import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto mt-12 px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div class="mb-10">
        <h1 class="text-4xl font-black text-slate-900 tracking-tight">Meu Perfil</h1>
        <p class="text-slate-500 mt-2">Gerencie suas informações corporativas e preferências de contato.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <!-- Sidebar Perfil -->
        <div class="md:col-span-4 space-y-6">
          <div class="text-center">
            <img src="assets/images/inovalayer-circulada.png" alt="Logo InovaLayer" class="w-32 h-32 mx-auto mb-6 object-contain">
            <h2 class="text-2xl font-black text-slate-900 leading-tight">AeroParts Brazil</h2>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Cliente VIP</p>
          </div>

          <div class="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-600/30">
            <h3 class="font-black text-lg mb-2">Suporte Prioritário</h3>
            <p class="text-blue-100 text-xs leading-relaxed mb-6">Como cliente VIP, você tem acesso direto à nossa linha de engenharia 24/7.</p>
            <button class="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Abrir chamado</button>
          </div>
        </div>

        <!-- Formulário (Mock) -->
        <div class="md:col-span-8">
          <div class="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
            <section>
              <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Dados da Empresa</h3>
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Razão Social</label>
                  <input type="text" readonly value="AeroParts Brazil Soluções Aeroespaciais S.A." class="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 focus:outline-none">
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">CNPJ</label>
                    <input type="text" readonly value="12.345.678/0001-90" class="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Setor</label>
                    <input type="text" readonly value="Aeroespacial" class="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 focus:outline-none">
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Configurações de Conta</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                      <i class="pi pi-bell text-blue-600"></i>
                    </div>
                    <div>
                      <p class="text-sm font-black text-slate-800">Notificações por E-mail</p>
                      <p class="text-[10px] font-bold text-slate-400 uppercase">Alertas de status de RFQ</p>
                    </div>
                  </div>
                  <div class="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                      <i class="pi pi-globe text-blue-600"></i>
                    </div>
                    <div>
                      <p class="text-sm font-black text-slate-800">Idioma da Interface</p>
                      <p class="text-[10px] font-bold text-slate-400 uppercase">Português (Brasil)</p>
                    </div>
                  </div>
                  <button class="text-[10px] font-black text-blue-600 uppercase tracking-widest">Alterar</button>
                </div>
              </div>
            </section>

            <div class="pt-6">
              <button class="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-xl shadow-slate-900/20 text-sm">Salvar Alterações</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PerfilClienteComponent {}
