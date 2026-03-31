import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LogService } from '../../../../core/services/log.service';

@Component({
  selector: 'app-dashboard-auditoria',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './dashboard-auditoria.component.html',
  styles: [`
    .kpi-card { border-radius: 12px; transition: transform 0.2s; }
    .kpi-card:hover { transform: translateY(-5px); }
  `]
})
export class DashboardAuditoriaComponent implements OnInit {
  private orcamentoService = inject(OrcamentoService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private log = inject(LogService);
  
  orcamentos = signal<OrcamentoResponseDTO[]>([]);
  totalInvestimento = signal(0);
  massaTotalAcumulada = signal(0);
  tempoTotalProcesso = signal(0);
  
  filtroStatus = signal<string>('TODOS');
  orcamentosFiltrados = computed(() => {
    const lista = this.orcamentos();
    const filtro = this.filtroStatus();
    if (filtro === 'TODOS') return lista;
    return lista.filter(o => o.status === filtro);
  });

  orcamentoSelecionado = signal<OrcamentoResponseDTO | null>(null);

  // Estado do Modal de Devolução
  modalDevolucaoAberto = signal(false);
  orcamentoDevolucao = signal<OrcamentoResponseDTO | null>(null);
  motivoDevolucao = '';
  isDevolving = signal(false);

  ngOnInit() {
    this.carregarOrcamentos();
  }

  private carregarOrcamentos() {
    this.orcamentoService.listarTodos().subscribe({
      next: (lista: OrcamentoResponseDTO[]) => {
        this.orcamentos.set(lista);
        this.calcularKpis(lista);
        this.log.info('DashboardAuditoria', `${lista.length} orçamentos carregados`);
      },
      error: (err) => this.log.error('DashboardAuditoria', 'Erro ao carregar orçamentos', err)
    });
  }

  private calcularKpis(lista: OrcamentoResponseDTO[]) {
    const total = lista.reduce((acc: number, curr: OrcamentoResponseDTO) => acc + (curr.precoFinalSugerido || 0), 0);
    const massa = lista.reduce((acc: number, curr: OrcamentoResponseDTO) => acc + (curr.fase1IC?.massaEstimadaKg || 0), 0);
    const tempo = lista.reduce((acc: number, curr: OrcamentoResponseDTO) => acc + (curr.fase1IC?.tempoTotalDeposicaoMinutos || 0), 0);
    
    this.totalInvestimento.set(total);
    this.massaTotalAcumulada.set(massa);
    this.tempoTotalProcesso.set(tempo);
  }

  abrirDetalhes(o: OrcamentoResponseDTO) {
    this.log.info('DashboardAuditoria', `Abrindo detalhes | orcamentoId=${o.id}`);
    this.router.navigate(['/b2b/resumo', o.id]);
  }

  aprovar(id: string, event?: Event) {
    if (event) event.stopPropagation();
    this.log.info('DashboardAuditoria', `Aprovando orçamento | id=${id}`);
    this.orcamentoService.aprovar(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Aprovado', detail: 'Orçamento aprovado com sucesso.' });
        this.carregarOrcamentos();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao aprovar o orçamento.' });
        this.log.error('DashboardAuditoria', 'Erro ao aprovar', err);
      }
    });
  }

  abrirModalDevolucao(o: OrcamentoResponseDTO, event?: Event) {
    if (event) event.stopPropagation();
    this.orcamentoDevolucao.set(o);
    this.motivoDevolucao = '';
    this.modalDevolucaoAberto.set(true);
  }

  fecharModalDevolucao() {
    this.modalDevolucaoAberto.set(false);
    this.orcamentoDevolucao.set(null);
    this.motivoDevolucao = '';
  }

  confirmarDevolucao() {
    const o = this.orcamentoDevolucao();
    if (!o || this.motivoDevolucao.length < 10) return;

    this.isDevolving.set(true);
    this.log.info('DashboardAuditoria', `Devolvendo orçamento | id=${o.id}`);

    this.orcamentoService.devolverParaCliente(o.id.toString(), this.motivoDevolucao).subscribe({
      next: () => {
        this.isDevolving.set(false);
        this.messageService.add({ severity: 'warn', summary: 'Devolvido', detail: 'Orçamento devolvido ao cliente com motivo registrado.' });
        this.fecharModalDevolucao();
        this.carregarOrcamentos();
      },
      error: (err) => {
        this.isDevolving.set(false);
        const msg = err.error?.message || 'Erro ao devolver o orçamento.';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });
        this.log.error('DashboardAuditoria', 'Erro ao devolver', err);
      }
    });
  }
}
