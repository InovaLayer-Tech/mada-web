import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento.model';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './dashboard-cliente.component.html'
})
export class DashboardClienteComponent implements OnInit {
  private orcamentoService = inject(OrcamentoService);

  rfqs: OrcamentoResponseDTO[] = [];
  showProposta = false;
  selectedProposta: OrcamentoResponseDTO | null = null;

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.orcamentoService.listarTodos().subscribe(data => {
      this.rfqs = data;
    });
  }

  abrirProposta(item: any) {
    this.selectedProposta = item;
    this.showProposta = true;
  }

  fecharProposta() {
    this.showProposta = false;
    this.selectedProposta = null;
  }

  baixarProposta(id: string) {
    alert(`Iniciando download da proposta comercial PDF para o pedido ${id}...`);
  }
}
