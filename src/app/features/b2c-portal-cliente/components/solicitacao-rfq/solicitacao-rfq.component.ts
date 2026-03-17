import { Component, OnInit, inject, signal } from '@angular/core';
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
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './solicitacao-rfq.component.html'
})
export class SolicitacaoRfqComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private arameService = inject(ArameMetalicoService);
  private orcamentoService = inject(OrcamentoService);

  arames: ArameMetalicoResponseDTO[] = [];
  isSending = signal(false);
  currentStep = signal(1);
  totalSteps = 3;

  rfqForm = this.fb.group({
    // Step 1: Identificação
    nomeProjeto: ['', Validators.required],
    nomeEmpresa: ['', Validators.required], // Mapeado para o backend via perfil ou manual
    finalidadePeca: ['', Validators.required],
    
    // Step 2: Envelope Físico
    dimensaoX: [null as number | null, [Validators.required, Validators.min(1)]],
    dimensaoY: [null as number | null, [Validators.required, Validators.min(1)]],
    dimensaoZ: [null as number | null, [Validators.required, Validators.min(1)]],
    quantidade: [1, [Validators.required, Validators.min(1)]],
    materialDesejadoId: ['', Validators.required],
    
    // Step 3: Requisitos
    tolerancia: ['Bruta', Validators.required],
    acabamento: ['Bruto', Validators.required],
    nivelInspecao: ['Visual', Validators.required],
    tratamentoTermico: [false, Validators.required],
    canaisInternos: [false]
  });

  ngOnInit() {
    this.carregarMateriais();
  }

  carregarMateriais() {
    this.arameService.listarTodos().subscribe((data: ArameMetalicoResponseDTO[]) => this.arames = data);
  }

  nextStep() {
    if (this.currentStep() < this.totalSteps) {
      if (this.canGoNext()) {
        this.currentStep.update(s => s + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        this.markStepAsTouched();
      }
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private canGoNext(): boolean {
    const controls = this.rfqForm.controls;
    if (this.currentStep() === 1) {
      return !!(controls.nomeProjeto.valid && controls.nomeEmpresa.valid && controls.finalidadePeca.valid);
    }
    if (this.currentStep() === 2) {
      return !!(controls.dimensaoX.valid && controls.dimensaoY.valid && controls.dimensaoZ.valid && controls.quantidade.valid && controls.materialDesejadoId.valid);
    }
    return true;
  }

  private markStepAsTouched() {
    const controls = this.rfqForm.controls;
    if (this.currentStep() === 1) {
      controls.nomeProjeto.markAsTouched();
      controls.nomeEmpresa.markAsTouched();
      controls.finalidadePeca.markAsTouched();
    }
    if (this.currentStep() === 2) {
      controls.dimensaoX.markAsTouched();
      controls.dimensaoY.markAsTouched();
      controls.dimensaoZ.markAsTouched();
      controls.quantidade.markAsTouched();
      controls.materialDesejadoId.markAsTouched();
    }
  }

  enviarSolicitacao() {
    if (this.rfqForm.invalid) {
      this.rfqForm.markAllAsTouched();
      return;
    }

    this.isSending.set(true);
    
    // Mapeamento para o DTO do backend
    const formValue = this.rfqForm.getRawValue();
    const payload = {
      nomeProjeto: formValue.nomeProjeto,
      quantidade: formValue.quantidade,
      dimensaoX: formValue.dimensaoX,
      dimensaoY: formValue.dimensaoY,
      dimensaoZ: formValue.dimensaoZ,
      tolerancia: formValue.tolerancia,
      acabamento: formValue.acabamento,
      nivelInspecao: formValue.nivelInspecao,
      tratamentoTermico: formValue.tratamentoTermico,
      finalidadePeca: formValue.finalidadePeca,
      materialDesejadoId: formValue.materialDesejadoId
    };
    
    this.orcamentoService.criar(payload as any).subscribe({
      next: () => {
        alert('Solicitação RFQ enviada com sucesso! Nossa engenharia analisará o fatiamento e retornará em breve.');
        this.isSending.set(false);
        this.router.navigate(['/cliente/dashboard']);
      },
      error: (err) => {
        console.error('Erro ao enviar RFQ:', err);
        alert('Erro ao enviar solicitação. Por favor, tente novamente.');
        this.isSending.set(false);
      }
    });
  }

  onFileSelected(event: Event) {
    // Simulação de upload para feedback visual
    console.log('Arquivo selecionado para processamento 3D');
  }
}
