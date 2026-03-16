import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento-response.dto';

@Component({
  selector: 'app-dashboard-auditoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-auditoria.component.html'
})
export class DashboardAuditoriaComponent {
  private router = inject(Router);

  faseAberta: string | null = 'dc';

  toggleFase(fase: string) {
    if (this.faseAberta === fase) {
      this.faseAberta = null;
    } else {
      this.faseAberta = fase;
    }
  }

  // IA: Metodologia WAAM - Objeto Mock Estático para Prototipagem
  orcamentoMock = {
    id: 'REQ-2026-001',
    cliente: 'Indústria Aeroespacial S.A.',
    peca: 'Suporte Estrutural de Titânio',
    custoTotalCT: 4580.75,
    margemLucroAplicada: '30%',
    precoVendaFinal: 5954.97,
    fases: {
      ic: {
        titulo: 'IC - Custos Iniciais (Setup e Base)',
        subtotal: 450.00,
        detalhes: [
          { sigla: 'O10', descricao: 'Custo do Material do Substrato', valor: 250.00 },
          { sigla: 'O11', descricao: 'Preparação e Montagem (Hora-homem)', valor: 100.00 },
          { sigla: 'O12', descricao: 'Remoção da Peça e Limpeza', valor: 100.00 }
        ]
      },
      dc: {
        titulo: 'DC - Custos de Deposição (Core WAAM)',
        subtotal: 2850.25,
        detalhes: [
          { sigla: 'Cm', descricao: 'Custo do Material (Arame)', valor: 1420.50 },
          { sigla: 'Cg', descricao: 'Custo de Gás de Proteção', valor: 380.25 },
          { sigla: 'CE', descricao: 'Consumo de Energia Elétrica', valor: 150.00 },
          { sigla: 'Cmq', descricao: 'Custo Operacional da Máquina (Depreciação/Manutenção)', valor: 899.50 }
        ]
      },
      ac: {
        titulo: 'AC - Custos Adicionais (Pós-processamento)',
        subtotal: 1280.50,
        detalhes: [
          { sigla: 'AC4', descricao: 'Fatiamento CAD/CAM (Software/Engenharia)', valor: 450.00 },
          { sigla: 'AC7', descricao: 'Tratamento Térmico (Alívio de Tensões)', valor: 330.50 },
          { sigla: 'AC8', descricao: 'Usinagem de Precisão CNC', valor: 500.00 }
        ]
      }
    }
  };

  aprovarOrcamento() {
    alert('Orçamento aprovado! Proposta comercial enviada automaticamente para o Portal do Cliente.');
    this.router.navigate(['/b2b/fila']);
  }
}
