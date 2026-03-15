import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-cliente.component.html'
})
export class DashboardClienteComponent {
  solicitacoesMock = [
    { id: 'RFQ-001', peca: 'Hélice Propulsora Rev A', data: '2026-03-10', status: 'Aguardando Análise', material: 'Inox 316L' },
    { id: 'RFQ-002', peca: 'Flange Industrial 20"', data: '2026-03-12', status: 'Orçamento Disponível', material: 'Aço Carbono' },
    { id: 'RFQ-003', peca: 'Suporte Motor Titânio', data: '2026-03-14', status: 'Em Produção', material: 'Titânio Gr5' }
  ];

  baixarProposta(id: string) {
    alert(`Iniciando download da proposta comercial PDF para o pedido ${id}...`);
  }
}
