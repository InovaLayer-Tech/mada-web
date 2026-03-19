import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import 'chart.js/auto';

@Component({
  selector: 'app-dashboard-auditoria',
  standalone: true,
  imports: [CommonModule, TranslateModule, BaseChartDirective],
  templateUrl: './dashboard-auditoria.component.html'
})
export class DashboardAuditoriaComponent implements OnInit {
  private router = inject(Router);
  private orcamentoService = inject(OrcamentoService);
  private translate = inject(TranslateService);

  orcamento = signal<OrcamentoResponseDTO | null>(null);
  faseAberta = signal<string | null>('dc');

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
        this.translate.instant('B2B.AUDIT.DESC_IC'),
        this.translate.instant('B2B.AUDIT.DESC_DC'),
        this.translate.instant('B2B.AUDIT.DESC_AC')
      ],
      datasets: [
        {
          data: [o.custoTotalIC || 0, o.custoTotalDC || 0, o.custoTotalAC || 0],
          backgroundColor: ['#94a3b8', '#2563eb', '#10b981'],
          hoverBackgroundColor: ['#64748b', '#1d4ed8', '#059669'],
          borderWidth: 0,
          weight: 12,
          cutout: '75%'
        }
      ]
    };
  });

  ngOnInit() {
    const state = history.state as { rfq: OrcamentoResponseDTO };
    if (state && state.rfq) {
      this.orcamento.set(state.rfq);
    } else {
      this.router.navigate(['/b2b/pedidos']);
    }
  }

  toggleFase(fase: string) {
    if (this.faseAberta() === fase) {
      this.faseAberta.set(null);
    } else {
      this.faseAberta.set(fase);
    }
  }

  aprovarOrcamento() {
    alert(this.translate.instant('B2B.AUDIT.APPROVE_SUCCESS'));
    this.router.navigate(['/b2b/fila']);
  }
}
