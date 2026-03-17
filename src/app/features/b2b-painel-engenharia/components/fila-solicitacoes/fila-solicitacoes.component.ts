import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrcamentoService } from '../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../core/models/orcamento.model';

@Component({
  selector: 'app-fila-solicitacoes',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './fila-solicitacoes.component.html'
})
export class FilaSolicitacoesComponent implements OnInit {
  private orcamentoService = inject(OrcamentoService);
  private router = inject(Router);

  rfqs: OrcamentoResponseDTO[] = [];

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.orcamentoService.listarTodos().subscribe(data => {
      this.rfqs = data;
    });
  }

  iniciarMetrologia(rfq: OrcamentoResponseDTO) {
    this.router.navigate(['/b2b/motor'], { state: { rfq } });
  }
}
