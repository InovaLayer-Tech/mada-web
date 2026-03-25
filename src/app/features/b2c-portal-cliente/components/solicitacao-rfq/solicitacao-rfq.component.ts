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
    // Tudo opcional conforme orientação: Validação é feita pela engenharia depois
    nomeProjeto: [''],
    nomeEmpresa: [''], 
    finalidadePeca: [''],
    
    // Step 2: Envelope Físico
    dimensaoX: [null as number | null],
    dimensaoY: [null as number | null],
    dimensaoZ: [null as number | null],
    quantidade: [1],
    materialDesejadoId: [''],
    
    // Step 3: Requisitos
    tolerancia: [''],
    acabamento: [''],
    criteriosAceitacao: [''],
    detalhesInspecao: [''],
    tratamentoTermico: [false],
    arquivoUrl: [''],
    aplicacaoPeca: [''],
    solicitacaoMecanica: [''],
    solicitacaoAmbiental: [''],
    normasTecnicas: [''],
    tempoEntregaC9: [''],
    economiaPerdaLucroC10: [0]
  });

  selectedFile = signal<File | null>(null);
  selectedFileName = signal<string>('');

  ngOnInit() {
    this.carregarMateriais();
  }

  carregarMateriais() {
    this.arameService.listarTodos().subscribe((data: ArameMetalicoResponseDTO[]) => this.arames = data);
  }

  nextStep() {
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private canGoNext(): boolean {
    return true; // Navegação livre conforme orientação do usuário
  }

  private markStepAsTouched() {
    const controls = this.rfqForm.controls;
    if (this.currentStep() === 1) {
      controls.nomeProjeto.markAsTouched();
      controls.nomeEmpresa.markAsTouched();
      controls.finalidadePeca.markAsTouched();
      controls.aplicacaoPeca.markAsTouched();
      controls.solicitacaoMecanica.markAsTouched();
      controls.solicitacaoAmbiental.markAsTouched();
    }
    if (this.currentStep() === 2) {
      controls.dimensaoX.markAsTouched();
      controls.dimensaoY.markAsTouched();
      controls.dimensaoZ.markAsTouched();
      controls.quantidade.markAsTouched();
      controls.materialDesejadoId.markAsTouched();
    }
    if (this.currentStep() === 3) {
      controls.tolerancia.markAsTouched();
      controls.acabamento.markAsTouched();
      controls.detalhesInspecao.markAsTouched();
      controls.criteriosAceitacao.markAsTouched();
    }
  }

  enviarSolicitacao() {
    this.isSending.set(true);
    
    // Mapeamento para o DTO do backend
    const formValue = this.rfqForm.getRawValue();
    const payload = {
      nomeProjeto: formValue.nomeProjeto,
      nomeEmpresa: formValue.nomeEmpresa,
      quantidade: formValue.quantidade,
      dimensaoX: formValue.dimensaoX || 0,
      dimensaoY: formValue.dimensaoY || 0,
      dimensaoZ: formValue.dimensaoZ || 0,
      tolerancia: formValue.tolerancia,
      acabamento: formValue.acabamento,
      detalhesInspecao: formValue.detalhesInspecao,
      criteriosAceitacao: formValue.criteriosAceitacao,
      tempoEntregaC9: formValue.tempoEntregaC9,
      economiaPerdaLucroC10: formValue.economiaPerdaLucroC10,
      tratamentoTermico: formValue.tratamentoTermico,
      finalidadePeca: formValue.finalidadePeca,
      arquivoUrl: formValue.arquivoUrl,
      materialDesejadoId: formValue.materialDesejadoId === 'HELP' ? null : formValue.materialDesejadoId,
      aplicacaoPeca: formValue.aplicacaoPeca,
      solicitacaoMecanica: formValue.solicitacaoMecanica,
      solicitacaoAmbiental: formValue.solicitacaoAmbiental,
      normasTecnicas: formValue.normasTecnicas
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
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Restrição para ZIP conforme solicitado
      if (!file.name.toLowerCase().endsWith('.zip')) {
        alert('Por favor, envie o projeto no formato .ZIP para garantir a integridade dos arquivos 3D.');
        input.value = '';
        this.selectedFile.set(null);
        this.selectedFileName.set('');
        return;
      }

      this.selectedFile.set(file);
      this.selectedFileName.set(file.name);
      
      // Simulação de preenchimento do path (em prod seria o retorno do S3/Blob Storage)
      this.rfqForm.patchValue({ arquivoUrl: `uploads/3d/${file.name}` });
      
      console.log('Arquivo ZIP selecionado e validado:', file.name);
    }
  }
}
