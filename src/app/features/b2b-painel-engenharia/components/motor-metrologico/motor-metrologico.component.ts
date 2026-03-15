import { Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { ProblemDetail } from '../../../../core/models/problem-detail';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento-response.dto';
import { OrcamentoRequestDTO } from '../../../../core/models/orcamento-request.dto';

@Component({
  selector: 'app-motor-metrologico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './motor-metrologico.component.html'
})
export class MotorMetrologicoComponent {
  private fb = inject(NonNullableFormBuilder);
  private orcamentoService = inject(OrcamentoService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef); // Gerenciamento automático de assinaturas (Angular 16+)

  // Strict Typed Reactive Form + NonNullable
  orcamentoForm = this.fb.group({
    // Dados Descritivos
    identificacaoPeca: ['', Validators.required],
    quantidadeRequerida: [1, [Validators.required, Validators.min(1)]],
    aplicacaoComponente: [''],

    // Entrada JSON Inteligente
    jsonInput: [''],

    // Variáveis Físicas Mínimas (Phase 1 e 2)
    tempoPreparacaoMinutos: [0, [Validators.required, Validators.min(0.1)]],
    tempoRemocaoMinutos: [0, [Validators.required, Validators.min(0.1)]],
    tempoArcoMinutos: [0, [Validators.required, Validators.min(0.1)]],
    massaEstimadaKg: [0, [Validators.required, Validators.min(0.1)]],
    arameId: ['', Validators.required], // UUID Obrigatório (Init vazio para forçar select)

    // Intenções (Phase 3 AC)
    requerProjetoCAD: [false],
    requerUsinagemFinal: [false],
    
    // Campo condicional (disabled by default)
    tempoUsinagemMinutos: this.fb.control(
      { value: 0, disabled: true }, 
      { validators: [Validators.min(0.1)] }
    )
  });

  erroApi: ProblemDetail | null = null;
  isSubmitting = false;

  constructor() {
    this.monitorarMudancasServicos();
    this.monitorarEntradaJson();
  }

  private monitorarEntradaJson() {
    this.orcamentoForm.controls.jsonInput.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((jsonStr) => {
        try {
          if (!jsonStr) return;
          const data = JSON.parse(jsonStr);
          
          // Mapeamento Inteligente dos campos do fatiador Python para o formulário
          this.orcamentoForm.patchValue({
            massaEstimadaKg: data.massa_kg || data.mass_kg || data.massa || 0,
            tempoArcoMinutos: data.tempo_arco_min || data.arc_time_min || data.tempo_arco || 0,
            tempoPreparacaoMinutos: data.tempo_setup_min || data.setup_time || 0,
            identificacaoPeca: data.nome_peca || data.part_name || ''
          });

          console.log('Dados do JSON aplicados ao formulário com sucesso.');
        } catch (e) {
          // Silent error - o usuário pode estar no meio da digitação
          console.warn('Erro ao processar JSON: Formato inválido.');
        }
      });
  }

  private monitorarMudancasServicos() {
    this.orcamentoForm.controls.requerUsinagemFinal.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ativo) => {
        const field = this.orcamentoForm.controls.tempoUsinagemMinutos;
        if (ativo) {
          field.enable();
          field.setValidators([Validators.required, Validators.min(0.1)]);
        } else {
          field.disable();
          field.clearValidators();
          field.setValue(0);
        }
        field.updateValueAndValidity();
      });
  }

  onSubmit() {
    if (this.orcamentoForm.invalid) {
      this.orcamentoForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.erroApi = null;

    // Extrai o DTO validado
    const payload: OrcamentoRequestDTO = this.orcamentoForm.getRawValue() as unknown as OrcamentoRequestDTO;

    this.orcamentoService.submeterOrcamento(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: OrcamentoResponseDTO) => {
          console.log('Orçamento Gerado com Sucesso', response.id);
          this.isSubmitting = false;
          // Navegação com passagem de estado (Router State) para o Dashboard de Auditoria
          this.router.navigate(['/b2b/auditoria'], { state: { orcamento: response } });
        },
        error: (err: ProblemDetail) => {
          console.error('Falha de Regra de Negócio (RFC 7807):', err);
          this.erroApi = err;
          this.isSubmitting = false;
        }
      });
  }
}
