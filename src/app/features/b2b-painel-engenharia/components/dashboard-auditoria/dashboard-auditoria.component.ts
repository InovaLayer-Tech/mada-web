import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import 'chart.js/auto';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dashboard-auditoria',
  standalone: true,
  imports: [CommonModule, TranslateModule, BaseChartDirective, ToastModule],
  providers: [MessageService],
  templateUrl: './dashboard-auditoria.component.html'
})
export class DashboardAuditoriaComponent implements OnInit {
  private router = inject(Router);
  private orcamentoService = inject(OrcamentoService);
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);

  orcamento = signal<OrcamentoResponseDTO | null>(null);
  todosOrcamentos = signal<OrcamentoResponseDTO[]>([]);
  
  listaAprovados = computed(() => 
    this.todosOrcamentos().filter(o => o.status === 'APROVADO')
  );

  kpis = computed(() => {
    const todos = this.todosOrcamentos();
    const aprovados = todos.filter(o => o.status === 'APROVADO');
    const totalValor = aprovados.reduce((acc, curr) => acc + curr.precoFinalSugerido, 0);
    
    return {
      totalGeral: todos.length,
      totalAprovados: aprovados.length,
      mediaValor: aprovados.length > 0 ? totalValor / aprovados.length : 0
    };
  });
  faseAberta = signal<string | null>('dc');
  carregando = signal<boolean>(false);

  // Chart.js Configuration
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData = computed<ChartData<'doughnut'>>(() => {
    const o = this.orcamento();
    if (!o) return { labels: [], datasets: [] };
    
    return {
      labels: [
        'IC - Intrínsecos',
        'AC - Adicionais',
        'PM/TR - Lucro/Imp.'
      ],
      datasets: [
        {
          data: [
            o.custoTotalIC || 0, 
            o.custoTotalAC || 0, 
            (o.precoFinalSugerido - (o.custoTotalIC + o.custoTotalAC)) || 0
          ],
          backgroundColor: ['#94a3b8', '#10b981', '#2563eb'],
          hoverBackgroundColor: ['#64748b', '#059669', '#1d4ed8'],
          borderWidth: 0,
          weight: 12,
          cutout: '75%'
        }
      ]
    };
  });

  ngOnInit() {
    if (typeof window !== 'undefined' && window.history.state && window.history.state.rfq) {
      this.orcamento.set(window.history.state.rfq);
    } else {
      this.carregarAprovados();
    }
  }

  carregarAprovados() {
    this.carregando.set(true);
    this.orcamentoService.listarTodos().subscribe({
      next: (data) => {
        this.todosOrcamentos.set(data);
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar aprovados:', err);
        this.carregando.set(false);
      }
    });
  }

  selecionarOrcamento(o: OrcamentoResponseDTO) {
    this.orcamento.set(o);
  }

  voltarLista() {
    this.orcamento.set(null);
    this.carregarAprovados();
  }

  toggleFase(fase: string) {
    if (this.faseAberta() === fase) {
      this.faseAberta.set(null);
    } else {
      this.faseAberta.set(fase);
    }
  }

  aprovarOrcamento() {
    const o = this.orcamento();
    if (!o) return;

    this.orcamentoService.aprovar(o.id).subscribe({
      next: () => {
        alert(this.translate.instant('B2B.AUDIT.APPROVE_SUCCESS'));
        this.router.navigate(['/b2b/pedidos']);
      },
      error: (err) => {
        console.error('Erro ao aprovar orçamento:', err);
        alert('Erro ao aprovar orçamento. Verifique os logs.');
      }
    });
  }

  excluirOrcamento(id: string, event: Event) {
    event.stopPropagation();
    if (confirm('Tem certeza que deseja excluir este orçamento permanentemente?')) {
      this.orcamentoService.excluir(id).subscribe({
        next: () => {
          this.carregarAprovados();
          this.messageService?.add({ severity: 'success', summary: 'Excluído', detail: 'Orçamento removido com sucesso' });
        },
        error: (err) => console.error('Erro ao excluir:', err)
      });
    }
  }

  downloadPDF() {
    window.print();
  }
}
