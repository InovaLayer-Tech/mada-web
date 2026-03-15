import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div class="w-full max-w-md bg-white rounded-[2.5rem] p-12 shadow-2xl">
        <div class="text-center mb-10">
          <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
            <i class="pi pi-lock text-white text-3xl"></i>
          </div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Acesso ao Sistema</h1>
          <p class="text-slate-400 mt-2 font-medium italic text-sm">Bem-vindo ao ecossistema InovaLayer 3D</p>
        </div>

        <div class="space-y-4">
          <button (click)="login('cliente')" class="w-full py-4 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-2xl text-slate-600 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3">
            <i class="pi pi-user"></i>
            Entrar como Cliente
          </button>
          <button (click)="login('b2b')" class="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3">
            <i class="pi pi-briefcase"></i>
            Entrar como Engenheiro
          </button>
        </div>
        
        <p class="text-center mt-10 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">InovaLayer 3D &copy; 2026</p>
      </div>
    </div>
  `
})
export class LoginComponent {
  constructor(private router: Router) {}
  login(type: string) {
    if (type === 'cliente') this.router.navigate(['/cliente/dashboard']);
    else this.router.navigate(['/b2b/fila']);
  }
}
