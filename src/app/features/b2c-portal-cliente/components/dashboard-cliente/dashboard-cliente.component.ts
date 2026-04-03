import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento.model';
import { MessageService } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule, TranslateModule, ToastModule, RouterModule, ToastModule],
  templateUrl: './dashboard-cliente.component.html'
})
export class DashboardClienteComponent implements OnInit {
  private orcamentoService = inject(OrcamentoService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  rfqs: OrcamentoResponseDTO[] = [];
  
  // KPIs do Dashboard
  solicitacoesAndamento = 0;
  pecasFinalizadas = 0;
  economiaTotal = 0;

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.orcamentoService.listarTodos().subscribe((data: OrcamentoResponseDTO[]) => {
      this.rfqs = data;
      this.circularKpis();
    });
  }

  private circularKpis() {
    this.solicitacoesAndamento = this.rfqs.filter(r => r.status !== 'CONCLUIDO' && r.status !== 'ENTREGUE').length;
    this.pecasFinalizadas = this.rfqs.reduce((acc, current) => {
        if (current.status === 'CONCLUIDO' || current.status === 'ENTREGUE') {
            return acc + (current.quantidade || 1);
        }
        return acc;
    }, 0);
    
    this.economiaTotal = this.rfqs.reduce((acc, curr) => acc + (curr.economiaPerdaLucroC10 || 0), 0);
  }

  getStatusClass(status: string): string {
    const s = status?.toUpperCase();
    if (s === 'PENDENTE' || s === 'SOLICITADO') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (s === 'CALCULADO' || s === 'PROPOSTA_ENVIADA') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (s === 'APROVADO' || s === 'EM_PRODUCAO') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (s === 'CONCLUIDO' || s === 'ENTREGUE') return 'bg-slate-100 text-slate-700 border-slate-200';
    return 'bg-slate-100 text-slate-500 border-slate-200';
  }

  abrirProposta(item: OrcamentoResponseDTO) {
    this.router.navigate(['/cliente/proposta', item.id]);
  }

  baixarProposta(id: string) {
    this.messageService.add({ 
        severity: 'info', 
        summary: 'Download Iniciado', 
        detail: `Gerando PDF da proposta comercial para o pedido ${id}...` 
    });
  }
}
