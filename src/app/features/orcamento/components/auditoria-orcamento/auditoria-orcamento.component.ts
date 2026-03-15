import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento-response.dto';

@Component({
  selector: 'app-auditoria-orcamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auditoria-orcamento.component.html'
})
export class AuditoriaOrcamentoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orcamentoService = inject(OrcamentoService);

  orcamentoId: string | null = null;
  orcamento: OrcamentoResponseDTO | null = null;
  erro: string | null = null;
  isLoading = true;

  ngOnInit(): void {
    // Escuta a rota ex: /orcamentos/auditoria/123e4567-e89b-12d3...
    this.route.paramMap.subscribe(params => {
      this.orcamentoId = params.get('id');
      if (this.orcamentoId) {
        this.carregarOrcamento(this.orcamentoId);
      } else {
        this.erro = "ID do Orçamento não fornecido na URL.";
        this.isLoading = false;
      }
    });
  }

  carregarOrcamento(id: string) {
    this.orcamentoService.getOrcamento(id).subscribe({
      next: (data: OrcamentoResponseDTO) => {
        this.orcamento = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        // Fallback básico caso o DTO não seja ProblemDetail perfeito
        this.erro = err.title || "Orçamento não localizado. Verifique se a URL está correta e tente novamente.";
        this.isLoading = false;
      }
    });
  }

  // Helper para template HTML (Fase 3 dinâmica)
  get temServicosAC(): boolean {
    return !!this.orcamento?.servicosAC && this.orcamento.servicosAC.length > 0;
  }
}
