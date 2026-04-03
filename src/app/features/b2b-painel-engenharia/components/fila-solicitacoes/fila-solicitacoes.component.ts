import { Component, OnInit, inject, computed, signal, OnDestroy } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-fila-solicitacoes',
  standalone: true,
  imports: [CommonModule, TranslateModule, ConfirmDialogModule, ToastModule],
  templateUrl: './fila-solicitacoes.component.html'
})
export class FilaSolicitacoesComponent implements OnInit, OnDestroy {
  private orcamentoService = inject(OrcamentoService);
  private router = inject(Router);
  protected authService = inject(AuthService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  
  private pollingId: any;
  rfqs = signal<OrcamentoResponseDTO[]>([]);
  todosOrcamentos = signal<OrcamentoResponseDTO[]>([]);
  
  kpisAuditoria = computed(() => {
    const todos = this.todosOrcamentos();
    const aprovados = todos.filter(o => o.status === 'APROVADO');
    const totalValor = aprovados.reduce((acc, curr) => acc + curr.precoFinalSugerido, 0);
    return {
      totalGeral: todos.length,
      totalAprovados: aprovados.length,
      mediaValor: aprovados.length > 0 ? totalValor / aprovados.length : 0
    };
  });

  totalPendentes = computed(() => this.rfqs().filter(r => r.status === 'PENDENTE').length);
  
  pipelineEstimado = computed(() => {
    return this.rfqs()
      .filter(r => r.status === 'CALCULADO' || r.status === 'APROVADO')
      .reduce((acc, rfq) => acc + (rfq.precoFinalSugerido || 0), 0);
  });

  novosHoje = computed(() => {
    const count = this.rfqs().length;
    return count > 0 ? (count < 10 ? `0${count}` : `${count}`) : '00';
  });

  leadTimeMedio = computed(() => {
    if (this.rfqs().length === 0) return '0.0h';
    const totalMinutos = this.rfqs().reduce((acc, rfq) => acc + (rfq.tempoArcoMinutos || 0), 0);
    const mediaHoras = (totalMinutos / (this.rfqs().length * 60)) + 1.2; 
    return `${mediaHoras.toFixed(1)}h`;
  });

  taxaConversao = computed(() => {
    const todos = this.todosOrcamentos();
    if (todos.length === 0) return '0%';
    const aprovados = todos.filter(r => r.status === 'APROVADO').length;
    const taxa = (aprovados / todos.length) * 100;
    return `${taxa.toFixed(0)}%`; 
  });

  ngOnInit() {
    this.carregarDados();
    this.pollingId = setInterval(() => this.carregarDados(), 30000);
  }

  ngOnDestroy() {
    if (this.pollingId) clearInterval(this.pollingId);
  }

  carregarDados() {
    this.orcamentoService.listarTodos().subscribe((data: OrcamentoResponseDTO[]) => {
      this.todosOrcamentos.set(data);
      const filaAtiva = data.filter(o => o.status === 'PENDENTE' || o.status === 'CALCULADO');
      this.rfqs.set(filaAtiva);
    });
  }

  iniciarMetrologia(rfq: OrcamentoResponseDTO) {
    this.router.navigate(['/b2b/motor'], { state: { rfq } });
  }

  excluirOrcamento(id: string) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir esta solicitação? Esta ação é irreversível.',
      header: 'Excluir Solicitação',
      icon: 'pi pi-trash',
      acceptLabel: 'Confirmar Exclusão',
      rejectLabel: 'Manter Solicitação',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.orcamentoService.excluir(id).subscribe({
          next: () => {
            this.carregarDados();
            this.messageService.add({ severity: 'success', summary: 'Excluído', detail: 'Solicitação removida da base de dados.' });
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir orçamento.' });
          }
        });
      }
    });
  }
}
