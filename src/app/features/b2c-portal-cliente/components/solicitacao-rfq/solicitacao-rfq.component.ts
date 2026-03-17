import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArameMetalicoService } from '../../../../core/services/arame-metalico.service';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { ArameMetalicoResponseDTO } from '../../../../core/models/arame-metalico.model';

@Component({
  selector: 'app-solicitacao-rfq',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterLink],
  templateUrl: './solicitacao-rfq.component.html'
})
export class SolicitacaoRfqComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private arameService = inject(ArameMetalicoService);
  private orcamentoService = inject(OrcamentoService);

  arames: ArameMetalicoResponseDTO[] = [];
  isSending = false;

  rfqForm = this.fb.group({
    empresa: ['', Validators.required],
    contato: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    quantidade: [1, [Validators.required, Validators.min(1)]],
    arquivo3d: [null as File | null],
    
    // Configurações Técnicas
    arameId: ['', Validators.required],
    finalidade: ['', Validators.required],
    
    // Requisitos de Precisão
    tolerancia: ['Bruta', Validators.required],
    canaisInternos: [false],
    
    // Qualidade e Pós-Processamento
    nivelInspecao: ['Visual', Validators.required],
    acabamento: ['Bruto', Validators.required],
    tratamentoTermico: [false],
    
    // Envelope de Trabalho (Dimensões)
    dimensaoX: [null as number | null, [Validators.required, Validators.min(1)]],
    dimensaoY: [null as number | null, [Validators.required, Validators.min(1)]],
    dimensaoZ: [null as number | null, [Validators.required, Validators.min(1)]],
    
    // Condições Adicionais
    condicoesTrabalho: [''],
    
    // Campos necessários para o cálculo mas não no formulário visual direto
    tempoPreparacaoMinutos: [30],
    tempoRemocaoMinutos: [15],
    tempoArcoMinutos: [120],
    massaEstimadaKg: [1.5],
    tempoUsinagemMinutos: [60]
  });

  ngOnInit() {
    this.carregarMateriais();
  }

  carregarMateriais() {
    this.arameService.listarTodos().subscribe(data => this.arames = data);
  }

  enviarSolicitacao() {
    if (this.rfqForm.invalid) {
      this.rfqForm.markAllAsTouched();
      return;
    }

    this.isSending = true;
    
    const request = this.rfqForm.getRawValue();
    // In Angular getRawValue will contain number for number inputs
    // We need to ensure we match the OrcamentoRequestDTO interface
    
    this.orcamentoService.criarOrcamento(request as any).subscribe({
      next: () => {
        alert('Solicitação RFQ enviada com sucesso! Nossa engenharia analisará o fatiamento e retornará em breve.');
        this.isSending = false;
        this.router.navigate(['/cliente/dashboard']);
      },
      error: (err) => {
        console.error('Erro ao enviar RFQ:', err);
        alert('Erro ao enviar solicitação. Por favor, tente novamente.');
        this.isSending = false;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.rfqForm.patchValue({ arquivo3d: file });
    }
  }
}
