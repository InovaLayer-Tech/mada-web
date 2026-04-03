import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento.model';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalhe-proposta',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ToastModule],
  providers: [MessageService],
  template: `
    <div class="min-h-screen bg-slate-50 font-sans pb-24 animate-in fade-in duration-700" *ngIf="proposta">
      <!-- Top Navigation / Breadcrumb -->
      <div class="max-w-7xl mx-auto pt-10 px-8 flex justify-between items-center">
         <div class="flex items-center gap-4">
            <button routerLink="/cliente/dashboard" class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 border border-slate-200 transition-all hover:shadow-lg active:scale-90">
               <i class="pi pi-arrow-left text-lg"></i>
            </button>
            <div class="flex flex-col">
               <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Voltar ao Painel</span>
               <span class="text-sm font-black text-slate-900 tracking-tight">Detalhamento Técnico</span>
            </div>
         </div>
         
         <div class="flex gap-4">
            <button (click)="baixarProposta()" class="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95 flex items-center gap-3">
               <i class="pi pi-copy text-blue-600"></i>
               Duplicar Requisição
            </button>
            <button (click)="baixarProposta()" class="px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3 active:scale-95">
               <i class="pi pi-file-pdf"></i>
               Gerar Memorial (PDF)
            </button>
         </div>
      </div>

      <div class="max-w-7xl mx-auto mt-12 px-8">
        <!-- Hero Header Industrial -->
        <div class="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative overflow-hidden mb-12">
            <!-- Background Decorative WAAM Icon -->
            <div class="absolute -right-40 -top-40 opacity-[0.03] rotate-12 pointer-events-none">
               <i class="pi pi-verified text-[35rem] text-blue-600"></i>
            </div>

            <div class="flex flex-col lg:flex-row justify-between items-start gap-12 relative z-10">
               <div class="flex-1">
                  <div class="flex items-center gap-3 mb-6">
                     <span class="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                       PROTOCOLO MADA II/III
                     </span>
                     <span class="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200">
                       IDENTIFICADOR: {{ proposta.id.substring(0,8).toUpperCase() }}
                     </span>
                  </div>
                  
                  <h1 class="text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] italic mb-6">
                    {{ proposta.nomeProjeto }}
                  </h1>
                  
                  <div class="flex items-center gap-6">
                     <div class="flex items-center gap-2 text-slate-400 font-mono text-[11px] font-black uppercase tracking-widest">
                        <i class="pi pi-calendar"></i>
                        Emitido em: {{ proposta.dataEmissao | date:'dd/MM/yyyy' }}
                     </div>
                     <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                     <div class="flex items-center gap-2 text-emerald-600 font-mono text-[11px] font-black uppercase tracking-widest">
                        <i class="pi pi-shield"></i>
                        Validação Industrial Certificada
                     </div>
                  </div>
               </div>

               <div class="w-full lg:w-96 bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <div class="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 transition-transform">
                     <i class="pi pi-money-bill text-[12rem] text-emerald-400"></i>
                  </div>
                  <p class="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Investimento Total do Projeto</p>
                  <p class="text-6xl font-black text-white tracking-tighter italic leading-none mb-4">{{ proposta.precoFinalSugerido | currency:'BRL':'symbol':'1.2-2' }}</p>
                  <div class="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 w-fit">
                     <i class="pi pi-chart-line text-emerald-400 text-xs"></i>
                     <span class="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Economia C10: {{ proposta.economiaPerdaLucroC10 | currency:'BRL':'symbol':'1.2-2' }}</span>
                  </div>
               </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           <!-- Coluna da Esquerda: Geometria e Parâmetros -->
           <div class="lg:col-span-8 space-y-12">
              <div class="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm">
                 <h2 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                    <span class="w-10 h-px bg-slate-200"></span>
                    Geometria e Manufatura Aditiva
                 </h2>

                 <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="space-y-8">
                       <div class="flex flex-col gap-2">
                          <label class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Volume de Deposição Estimado</label>
                          <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                             <div class="flex items-center gap-4">
                               <i class="pi pi-box text-blue-600 text-xl"></i>
                               <b class="text-2xl font-black text-slate-900 font-mono tracking-tight">{{ proposta.massaEstimadaKg }} <span class="text-sm font-bold text-slate-400 italic">kg</span></b>
                             </div>
                             <span class="text-[10px] font-black text-blue-500 uppercase italic opacity-0 group-hover:opacity-100 transition-opacity">WAAM Mass</span>
                          </div>
                       </div>
                       
                       <div class="flex flex-col gap-2">
                          <label class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Lead Time de Produção</label>
                          <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                             <div class="flex items-center gap-4">
                               <i class="pi pi-clock text-blue-600 text-xl"></i>
                               <b class="text-2xl font-black text-slate-900 font-mono tracking-tight">{{ proposta.tempoEntregaC9 || '7-10' }} <span class="text-sm font-bold text-slate-400 italic">DIAS</span></b>
                             </div>
                             <span class="text-[10px] font-black text-blue-500 uppercase italic opacity-0 group-hover:opacity-100 transition-opacity">Cycle Time</span>
                          </div>
                       </div>
                    </div>

                    <div class="bg-slate-100/50 rounded-[3rem] p-8 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                       <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
                          <i class="pi pi-image text-3xl text-slate-300"></i>
                       </div>
                       <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest max-w-[200px]">Simulação Geométrica Indisponível no momento.</p>
                       <span class="mt-4 text-[9px] text-slate-300 font-mono">Envolvente: {{ proposta.dimensaoX }}x{{ proposta.dimensaoY }}x{{ proposta.dimensaoZ }} mm</span>
                    </div>
                 </div>

                 <div class="mt-12 pt-12 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div class="flex flex-col gap-1">
                       <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tolerância</span>
                       <b class="text-slate-900 font-mono italic">+/- {{ proposta.tolerancia || '1.0' }} mm</b>
                    </div>
                    <div class="flex flex-col gap-1">
                       <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Processo</span>
                       <b class="text-slate-900 uppercase">DMLS/WAAM C</b>
                    </div>
                    <div class="flex flex-col gap-1">
                       <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Acabamento</span>
                       <b class="text-slate-900 uppercase">{{ proposta.acabamento || 'Bruto' }}</b>
                    </div>
                    <div class="flex flex-col gap-1">
                       <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Norma Ref.</span>
                       <b class="text-blue-600 uppercase">ISO 17296-3</b>
                    </div>
                 </div>
              </div>

              <div class="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm">
                 <h2 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span class="w-10 h-px bg-slate-200"></span>
                    Memorial Descritivo e Requisitos
                 </h2>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="space-y-4">
                       <span class="text-[9px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                          <i class="pi pi-info-circle"></i> Critérios de Aceitação
                       </span>
                       <p class="text-[13px] text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
                         {{ proposta.criteriosAceitacao || 'Nenhum critério específico fornecido. O projeto segue os padrões de integridade estrutural MADA.' }}
                       </p>
                    </div>
                    <div class="space-y-4">
                       <span class="text-[9px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                          <i class="pi pi-file-shield"></i> Normas Técnicas Aplicáveis
                       </span>
                       <p class="text-[13px] text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
                         {{ proposta.normasTecnicas || 'Não foram declaradas normas adicionais para este projeto.' }}
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Coluna da Direita: Status e Documentação -->
           <div class="lg:col-span-4 space-y-8">
              <div class="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                 <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-100 pb-4">Fluxo de Validação</h3>
                 
                 <div class="space-y-8 relative">
                    <div class="absolute left-4 top-2 h-[80%] w-0.5 bg-slate-100 border-l border-dashed border-slate-300"></div>
                    
                    <div class="flex items-start gap-6 relative z-10">
                       <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs shadow-lg shadow-blue-100"><i class="pi pi-check"></i></div>
                       <div class="flex flex-col">
                          <span class="text-[11px] font-black text-slate-900 uppercase">Solicitação do Cliente</span>
                          <span class="text-[10px] text-slate-400 italic">Recebida em {{ proposta.dataEmissao | date:'dd/MM/yyyy' }}</span>
                       </div>
                    </div>

                    <div class="flex items-start gap-6 relative z-10">
                       <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs shadow-lg shadow-blue-100"><i class="pi pi-check"></i></div>
                       <div class="flex flex-col">
                          <span class="text-[11px] font-black text-slate-900 uppercase">Cálculo Metrológico</span>
                          <span class="text-[10px] text-slate-400 italic">Protocolo MADA Stage II</span>
                       </div>
                    </div>

                    <div class="flex items-start gap-6 relative z-10">
                       <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-inner"
                            [ngClass]="proposta.status === 'APROVADO' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-300'">
                          <i class="pi" [class]="proposta.status === 'APROVADO' ? 'pi-check' : 'pi-lock'"></i>
                       </div>
                       <div class="flex flex-col">
                          <span class="text-[11px] font-black uppercase" [ngClass]="proposta.status === 'APROVADO' ? 'text-slate-900' : 'text-slate-300'">Aprovação Comercial</span>
                          <span class="text-[10px] text-slate-400 italic">{{ proposta.status === 'APROVADO' ? 'Aprovado pelo Gestor' : 'Aguardando validação final' }}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div class="bg-blue-600 p-10 rounded-[3rem] shadow-2xl shadow-blue-200 relative overflow-hidden group">
                 <div class="absolute -right-8 -top-8 opacity-10 group-hover:rotate-12 transition-transform">
                    <i class="pi pi-cloud-download text-[12rem] text-white"></i>
                 </div>
                 <h3 class="text-[11px] font-black text-blue-200 uppercase tracking-widest mb-4">Pack de Manufatura</h3>
                 <p class="text-white text-lg font-black leading-snug mb-8">Baixe o pack completo de documentação para aprovação interna.</p>
                 <button (click)="baixarProposta()" class="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 flex items-center justify-center gap-3 active:scale-95">
                    <i class="pi pi-download"></i>
                    Baixar MADA Pack (ZIP)
                 </button>
              </div>

              <div class="bg-slate-100/50 p-10 rounded-[3rem] border border-slate-200/60">
                 <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Suporte à Engenharia</h3>
                 <p class="text-[11px] text-slate-400 leading-relaxed mb-6">Dúvidas sobre a metodologia de cálculo ou material utilizado? Fale com o especialista MADA responsável.</p>
                 <button class="text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
                    Abrir Chat Técnico
                    <i class="pi pi-arrow-right"></i>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div *ngIf="!proposta && !loading" class="min-h-screen flex items-center justify-center bg-slate-50">
       <div class="text-center p-20 bg-white rounded-[3rem] border border-slate-200 shadow-xl">
          <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
             <i class="pi pi-search text-3xl text-slate-300"></i>
          </div>
          <h2 class="text-2xl font-black text-slate-900 tracking-tight mb-2">Proposta não encontrada</h2>
          <p class="text-slate-400 text-sm mb-8">O protocolo solicitado pode ter sido expirado ou não existe.</p>
          <button routerLink="/cliente/dashboard" class="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
             Voltar ao Dashboard
          </button>
       </div>
    </div>

    <p-toast></p-toast>
  `,
  styles: [`
    :host ::ng-deep .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    :host ::ng-deep .custom-scrollbar::-webkit-scrollbar-track {
      background: #f8fafc;
    }
    :host ::ng-deep .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #e2e8f0;
      border-radius: 10px;
    }
    :host ::ng-deep .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #cbd5e1;
    }
  `]
})
export class DetalhePropostaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orcamentoService = inject(OrcamentoService);
  private messageService = inject(MessageService);
  
  proposta: OrcamentoResponseDTO | null = null;
  loading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarProposta(id);
    } else {
      this.loading = false;
    }
  }

  carregarProposta(id: string) {
    this.loading = true;
    this.orcamentoService.buscarPorId(id).subscribe({
      next: (data) => {
        this.proposta = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar proposta', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar os detalhes da proposta.' });
        this.loading = false;
      }
    });
  }

  baixarProposta() {
    this.messageService.add({ severity: 'info', summary: 'Processando', detail: 'O Memorial Descritivo está sendo gerado e o download iniciará em segundos.' });
    // TODO: Implementar lógica real de PDF/Download no backend
  }
}
