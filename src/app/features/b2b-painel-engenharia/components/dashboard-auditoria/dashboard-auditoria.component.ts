import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrcamentoService } from '../../../services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../models/orcamento.model';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-auditoria',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-auditoria.component.html',
  styles: [`
    .kpi-card { border-radius: 12px; transition: transform 0.2s; }
    .kpi-card:hover { transform: translateY(-5px); }
  `]
})
export class DashboardAuditoriaComponent implements OnInit {
  private orcamentoService = inject(OrcamentoService);
  
  orcamentos = signal<OrcamentoResponseDTO[]>([]);
  totalInvestimento = signal(0);
  massaTotalAcumulada = signal(0);
  tempoTotalProcesso = signal(0);

  public doughnutChartLabels: string[] = ['IC1: Arame', 'IC2: Gás', 'IC3: Máquina/MO', 'IC4: Substrato', 'AC: Serviços'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [0, 0, 0, 0, 0] }]
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit() {
    this.orcamentoService.listarTodos().subscribe(lista => {
      this.orcamentos.set(lista);
      this.calcularKpis(lista);
    });
  }

  private calcularKpis(lista: OrcamentoResponseDTO[]) {
    const total = lista.reduce((acc, curr) => acc + (curr.precoFinalSugerido || 0), 0);
    const massa = lista.reduce((acc, curr) => acc + (curr.fase1IC?.massaEstimadaKg || 0), 0);
    const tempo = lista.reduce((acc, curr) => acc + (curr.fase1IC?.tempoTotalDeposicaoMinutos || 0), 0);
    
    this.totalInvestimento.set(total);
    this.massaTotalAcumulada.set(massa);
    this.tempoTotalProcesso.set(tempo);

    // Atualiza gráfico com as parcelas reais do último orçamento calculado
    const ultimo = lista.find(o => o.status === 'CALCULADO');
    if (ultimo && ultimo.fase1IC) {
      const somaAC = ultimo.fase3AC ? ultimo.fase3AC.reduce((a, c) => a + (c.custoTotalAC || 0), 0) : 0;
      this.doughnutChartData.datasets[0].data = [
        ultimo.fase1IC.ic1Arame || 0,
        ultimo.fase1IC.ic2Gas || 0,
        ultimo.fase1IC.ic3Equipamento || 0,
        ultimo.fase1IC.ic4Substrato || 0,
        somaAC
      ];
    }
  }
}
