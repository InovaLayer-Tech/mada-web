import { Component, OnInit, inject } from '@angular/core';
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

  orcamento: OrcamentoResponseDTO | null = null;
  faseAberta: string | null = 'dc';

  ngOnInit() {
    const state = history.state as { rfq: OrcamentoResponseDTO };
    if (state && state.rfq) {
      this.orcamento = state.rfq;
    } else {
      this.router.navigate(['/b2b/fila']);
    }
  }

  toggleFase(fase: string) {
    if (this.faseAberta === fase) {
      this.faseAberta = null;
    } else {
      this.faseAberta = fase;
    }
  }

  aprovarOrcamento() {
    alert('Orçamento aprovado! Proposta comercial enviada automaticamente para o Portal do Cliente.');
    this.router.navigate(['/b2b/fila']);
  }
}
