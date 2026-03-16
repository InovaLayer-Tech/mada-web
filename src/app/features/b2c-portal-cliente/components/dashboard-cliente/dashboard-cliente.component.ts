import { Component } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './dashboard-cliente.component.html'
})
export class DashboardClienteComponent {
  solicitacoesMock = [
    { id: 'RFQ-001', peca: 'Hélice Propulsora Rev A', data: '2026-03-10', status: 'Aguardando Análise', material: 'Inox 316L' },
    { id: 'RFQ-002', peca: 'Flange Industrial 20"', data: '2026-03-12', status: 'Concluído', material: 'Aço Carbono', preco: '5.954,97', prazo: '12 dias úteis', peso: '4.8kg' },
    { id: 'RFQ-003', peca: 'Suporte Motor Titânio', data: '2026-03-14', status: 'Em Produção', material: 'Titânio Gr5' }
  ];

  showProposta = false;
  selectedProposta: any = null;

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
