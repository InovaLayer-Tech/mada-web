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

  // KPIs atualizados para foco em Engenharia e Produção
  kpis = computed(() => {
    const todos = this.todosOrcamentos();
    const aprovados = this.listaAprovados();
    const totalValor = aprovados.reduce((acc, curr) => acc + curr.precoFinalSugerido, 0);
    // Assumindo que o tempo total venha no DTO em minutos
    const tempoTotalMada = aprovados.reduce((acc, curr) => acc + (curr.fase1IC.tempoTotalDeposicaoMinutos || 0), 0);
    
    return {
      totalGeral: todos.length,
      taxaAprovacao: todos.length > 0 ? ((aprovados.length / todos.length) * 100).toFixed(1) : 0,
      mediaValor: aprovados.length > 0 ? totalValor / aprovados.length : 0,
      tempoMedioFab: aprovados.length > 0 ? (tempoTotalMada / aprovados.length) / 60 : 0 // Convertido para horas
    };
  });

  faseAberta = signal<string | null>('ic'); // Abre IC por padrão
  carregando = signal<boolean>(false);

  // Chart.js Configuration - Estética Corporativa
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    cutout: '70%'
  };

  public doughnutChartType: 'doughnut' = 'doughnut';

  // Mapeamento estrito da Metodologia MADA (IC1, IC2, IC3, IC4, AC)
  public doughnutChartData = computed<ChartData<'doughnut'>>(() => {
    const o = this.orcamento();
    if (!o || !o.fase1IC) return { labels: [], datasets: [] };
    
    return {
      labels: [
        'Arame (IC1)', 
        'Gás (IC2)', 
        'Equipamento/Setup (IC3)', 
        'Substrato (IC4)', 
        'Serviços Adicionais (AC)'
      ],
      datasets: [
        {
          data: [
            o.fase1IC.ic1Arame || 0,
            o.fase1IC.ic2Gas || 0,
            o.fase1IC.ic3Equipamento || 0,
            o.fase1IC.ic4Substrato || 0,
            o.custoTotalAC || 0
          ],
          // Cores Sóbrias: Aço, Azul Corporativo, Ardósia, Cinza Claro, Esmeralda
          backgroundColor: ['#64748b', '#0f172a', '#3b82f6', '#cbd5e1', '#10b981'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }
      ]
    };
  });

  ngOnInit() {
    const state = history.state as { rfq: OrcamentoResponseDTO };
    if (state && state.rfq) {
      this.orcamento.set(state.rfq);
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
        console.error('Erro ao carregar dados:', err);
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
    this.faseAberta.set(this.faseAberta() === fase ? null : fase);
  }

  aprovarOrcamento() {
    const o = this.orcamento();
    if (!o) return;

    this.orcamentoService.aprovar(o.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Aprovado', detail: 'Auditoria concluída com sucesso.' });
        this.router.navigate(['/b2b/pedidos']);
      },
      error: (err) => console.error(err)
    });
  }

  downloadPDF() {
    window.print();
  }
}
