import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fila-solicitacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fila-solicitacoes.component.html'
})
export class FilaSolicitacoesComponent {
  rfqsMock = [
    { id: 'RFQ-001', cliente: 'AeroParts Brazil', peca: 'Hélice Propulsora', material: 'Inox 316L', data: '2026-03-10', urgencia: 'Normal' },
    { id: 'RFQ-002', cliente: 'PetroMaster S.A.', peca: 'Flange Industrial 20"', material: 'Aço Carbono', data: '2026-03-12', urgencia: 'Urgente' },
    { id: 'RFQ-003', cliente: 'TitanSpace Inc', peca: 'Suporte Motor', material: 'Titânio Gr5', data: '2026-03-14', urgencia: 'Normal' }
  ];

  constructor(private router: Router) {}

  iniciarMetrologia(rfq: any) {
    // Simula a navegação para o motor metrológico carregando os dados do RFQ
    this.router.navigate(['/b2b/motor-metrologico'], { state: { rfq } });
  }
}
