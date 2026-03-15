import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { ProblemDetail } from '../../../../core/models/problem-detail';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento-response.dto';

@Component({
  selector: 'app-formulario-requisicao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-requisicao.component.html'
})
export class FormularioRequisicaoComponent {
  private fb = inject(FormBuilder);
  private orcamentoService = inject(OrcamentoService);
  private router = inject(Router);

  // Progressive Disclosure via Strict Typings
  orcamentoForm: FormGroup = this.fb.group({
    // ID do Projeto
    identificacaoPeca: ['', Validators.required],
    quantidadeRequerida: [1, [Validators.required, Validators.min(1)]],
    aplicacaoComponente: [''],

    // Requisitos Mecânicos (Apenas Física)
    solicitacaoMecanicaServico: ['', Validators.required],
    solicitacaoAmbientalOperacional: [''],
    toleranciaDimensionalExigidaMm: ['', Validators.required],
    acabamentoSuperficialMm: [''],

    // Escopo de Serviços Adicionais (Intenções)
    requerProjetoCAD: [false],
    requerUsinagemFinal: [false],
    tempoUsinagemMinutos: [{ value: 0, disabled: true }],

    // Entradas Ocultas (Simuladas pelo Arquiteto para o Teste - Seriam do CAD)
    tempoPreparacaoMinutos: [120],
    tempoRemocaoMinutos: [30],
    tempoArcoMinutos: [450],
    massaEstimadaKg: [12.5],
    arameId: [1], // Mock DB
    gasId: [1]    // Mock DB
  });

  erroApi: ProblemDetail | null = null;
  isSubmitting = false;

  constructor() {
    this.monitorarMudancasServicos();
  }

  // Ativa inputs colaterais dinamicamente.
  private monitorarMudancasServicos() {
    this.orcamentoForm.get('requerUsinagemFinal')?.valueChanges.subscribe(ativo => {
      const field = this.orcamentoForm.get('tempoUsinagemMinutos');
      if (ativo) {
        field?.enable();
        field?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        field?.disable();
        field?.clearValidators();
      }
      field?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.orcamentoForm.invalid) {
      this.orcamentoForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.erroApi = null;

    const payload = this.orcamentoForm.getRawValue(); // Pega inclusive desabilitados (tempos Mocks)

    this.orcamentoService.submeterOrcamento(payload).subscribe({
      next: (response: OrcamentoResponseDTO) => {
        console.log('Orçamento Gerado com Sucesso', response.id);
        this.isSubmitting = false;
        // Navega para a tela de Drill-Down do Orçamento Gerado
        this.router.navigate(['/orcamentos/auditoria', response.id]);
      },
      error: (err: ProblemDetail) => {
        console.error('Falha de Regra de Negócio (RFC 7807):', err);
        this.erroApi = err;
        this.isSubmitting = false;
      }
    });
  }
}
