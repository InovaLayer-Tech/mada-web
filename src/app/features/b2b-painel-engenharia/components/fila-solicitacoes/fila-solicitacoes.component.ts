import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-fila-solicitacoes',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './fila-solicitacoes.component.html'
})
export class FilaSolicitacoesComponent implements OnInit {
  private orcamentoService = inject(OrcamentoService);
  private router = inject(Router);
  protected authService = inject(AuthService);
  private pollingId: any;
  rfqs = signal<OrcamentoResponseDTO[]>([]);
  todosOrcamentos = signal<OrcamentoResponseDTO[]>([]);
  
  // KPIs do Dashboard Auditoria também aqui
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

  // KPIs dinâmicos baseados no estado atual
  totalPendentes = computed(() => this.rfqs().filter(r => r.status === 'PENDENTE').length);
  
  pipelineEstimado = computed(() => {
    const total = this.rfqs()
      .filter(r => r.status === 'CALCULADO' || r.status === 'APROVADO')
      .reduce((acc, rfq) => acc + (rfq.precoFinalSugerido || 0), 0);
    return total > 1000 ? `R$ ${(total/1000).toFixed(0)}k` : `R$ ${total.toFixed(0)}`;
  });

  novosHoje = computed(() => {
    return this.rfqs().length > 0 ? (this.rfqs().length < 10 ? `0${this.rfqs().length}` : `${this.rfqs().length}`) : '00';
  });

  leadTimeMedio = computed(() => {
    if (this.rfqs().length === 0) return '0.0h';
    const totalMinutos = this.rfqs().reduce((acc, rfq) => acc + (rfq.tempoArcoMinutos || 0), 0);
    const mediaHoras = (totalMinutos / (this.rfqs().length * 60)) + 1.2; 
    return `${mediaHoras.toFixed(1)}h`;
  });

  taxaConversao = computed(() => {
    if (this.rfqs().length === 0) return '0%';
    const aprovados = this.rfqs().filter(r => r.status === 'APROVADO').length;
    const taxa = (aprovados / this.rfqs().length) * 100;
    return `${taxa.toFixed(0)}%`; 
  });

  ngOnInit() {
    this.carregarDados();
    // Atualiza automaticamente a cada 30 segundos
    this.pollingId = setInterval(() => this.carregarDados(), 30000);
  }

  ngOnDestroy() {
    if (this.pollingId) clearInterval(this.pollingId);
  }

  carregarDados() {
    this.orcamentoService.listarTodos().subscribe((data: OrcamentoResponseDTO[]) => {
      this.todosOrcamentos.set(data);
      // Filtramos para a fila apenas o que é acionável: PENDENTE (novo) e CALCULADO (aguarda revisão)
      const filaAtiva = data.filter(o => o.status === 'PENDENTE' || o.status === 'CALCULADO');
      this.rfqs.set(filaAtiva);
    });
  }

  iniciarMetrologia(rfq: OrcamentoResponseDTO) {
    this.router.navigate(['/b2b/motor'], { state: { rfq } });
  }

  excluirOrcamento(id: string) {
    if (confirm('Deseja realmente excluir esta solicitação? Esta ação é irreversível.')) {
      this.orcamentoService.excluir(id).subscribe({
        next: () => {
          this.carregarDados();
        },
        error: (err) => {
          console.error('Erro ao excluir orçamento:', err);
          alert('Erro ao excluir. Verifique se tem permissão.');
        }
      });
    }
  }
}
