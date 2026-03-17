import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento.model';

@Component({
  selector: 'app-dashboard-auditoria',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './dashboard-auditoria.component.html'
})
export class DashboardAuditoriaComponent implements OnInit {
  private router = inject(Router);
  private orcamentoService = inject(OrcamentoService);

  orcamento = signal<OrcamentoResponseDTO | null>(null);
  faseAberta = signal<string | null>('dc');

  // SVG Chart Utils
  circunferencia = 2 * Math.PI * 40; // R=40 para viewBox 100x100
  
  chartData = computed(() => {
    const o = this.orcamento();
    if (!o) return { ic: 0, dc: 0, ac: 0 };
    const total = (o.custoTotalIC || 0) + (o.custoTotalDC || 0) + (o.custoTotalAC || 0);
    if (total === 0) return { ic: 0, dc: 0, ac: 0 };
    
    return {
      ic: (o.custoTotalIC / total) * this.circunferencia,
      dc: (o.custoTotalDC / total) * this.circunferencia,
      ac: (o.custoTotalAC / total) * this.circunferencia,
      total: total
    };
  });

  offsets = computed(() => {
    const d = this.chartData();
    return {
      ic: 0,
      dc: -d.ic,
      ac: -(d.ic + d.dc)
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
    alert('Orçamento aprovado! Proposta comercial enviada automaticamente para o Portal do Cliente.');
    this.router.navigate(['/b2b/fila']);
  }
}
