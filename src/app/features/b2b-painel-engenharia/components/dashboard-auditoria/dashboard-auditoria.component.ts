import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO, Fase3ACDTO } from '../../../../core/models/orcamento.model';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-auditoria',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard-auditoria.component.html',
  styles: [`
    .kpi-card { border-radius: 12px; transition: transform 0.2s; }
    .kpi-card:hover { transform: translateY(-5px); }
  `]
})
export class DashboardAuditoriaComponent implements OnInit {
  private orcamentoService = inject(OrcamentoService);
  private router = inject(Router);
  
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

  public doughnutChartLabels: string[] = ['IC1: Arame', 'IC2: Gás', 'IC3: Máquina/MO', 'IC4: Substrato', 'AC: Serviços'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [0, 0, 0, 0, 0], backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'] }]
  };
  public doughnutChartType: ChartType = 'doughnut';

  orcamentoSelecionado = signal<OrcamentoResponseDTO | null>(null);

  ngOnInit() {
    this.orcamentoService.listarTodos().subscribe((lista: OrcamentoResponseDTO[]) => {
      this.orcamentos.set(lista);
      this.calcularKpis(lista);
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
    this.router.navigate(['/b2b/resumo', o.id]);
  }

  aprovar(id: string, event?: Event) {
    if (event) event.stopPropagation();
    this.orcamentoService.aprovar(id).subscribe(() => {
      this.orcamentoService.listarTodos().subscribe(lista => {
        this.orcamentos.set(lista);
        this.calcularKpis(lista);
      });
    });
  }
}
