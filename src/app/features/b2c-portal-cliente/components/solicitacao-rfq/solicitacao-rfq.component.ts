import { Component, OnInit, inject, signal } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ArameMetalicoService } from '../../../../core/services/arame-metalico.service';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { ArameMetalicoResponseDTO } from '../../../../core/models/arame-metalico.model';
import { LogService } from '../../../../core/services/log.service';
import { OrcamentoRequestDTO } from '../../../../core/models/orcamento-request.dto';

interface RFQFormModel {
  nomeProjeto: FormControl<string>;
  nomeEmpresa: FormControl<string>;
  aplicacaoPeca: FormControl<string>;
  solicitacaoMecanica: FormControl<string>;
  solicitacaoAmbiental: FormControl<string>;
  dimensaoX: FormControl<number | null>;
  dimensaoY: FormControl<number | null>;
  dimensaoZ: FormControl<number | null>;
  quantidade: FormControl<number>;
  materialDesejadoId: FormControl<string>;
  tolerancia: FormControl<string>;
  acabamento: FormControl<string>;
  criteriosAceitacao: FormControl<string>;
  detalhesInspecao: FormControl<string>;
  tratamentoTermico: FormControl<boolean>;
  arquivoUrl: FormControl<string>;
  normasTecnicas: FormControl<string>;
  tempoEntregaC9: FormControl<string>;
  economiaPerdaLucroC10: FormControl<number>;
}

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
  private log = inject(LogService);

  arames: ArameMetalicoResponseDTO[] = [];
  isSending = signal(false);
  currentStep = signal(1);
  totalSteps = 3;
  
  /**
   * Formulário com tipagem estrita via NonNullableFormBuilder.
   * Garante que os valores nunca sejam null indefinidamente (exceto dimensões conforme regra atual).
   */
  rfqForm: FormGroup<RFQFormModel> = this.fb.group({
    nomeProjeto: ['', [Validators.required]],
    nomeEmpresa: [''], 
    aplicacaoPeca: ['', [Validators.required]],
    solicitacaoMecanica: ['', [Validators.required]],
    solicitacaoAmbiental: [''],
    
    // Step 2: Envelope Físico (MM)
    dimensaoX: [null as number | null, [Validators.required, Validators.min(1)]],
    dimensaoY: [null as number | null, [Validators.required, Validators.min(1)]],
    dimensaoZ: [null as number | null, [Validators.required, Validators.min(1)]],
    quantidade: [1, [Validators.required, Validators.min(1)]],
    materialDesejadoId: ['', [Validators.required]],
    
    // Step 3: Requisitos Técnicos
    tolerancia: [''],
    acabamento: [''],
    criteriosAceitacao: [''],
    detalhesInspecao: [''],
    tratamentoTermico: [false],
    arquivoUrl: [''],
    normasTecnicas: [''],
    tempoEntregaC9: [''],
    economiaPerdaLucroC10: [0]
  });

  selectedFile = signal<File | null>(null);
  selectedFileName = signal<string>('');

  ngOnInit() {
    this.carregarMateriais();
  }

  private carregarMateriais() {
    this.arameService.listarTodos().subscribe({
      next: (data) => this.arames = data,
      error: (err) => this.log.error('SolicitacaoRfq', 'Erro ao carregar catálogo de arames', err)
    });
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

  /**
   * Envio da solicitação com mapeamento rígido para OrcamentoRequestDTO.
   * Garante Single Source of Truth e conformidade com o Back-end.
   */
  enviarSolicitacao() {
    if (this.rfqForm.invalid) {
      this.log.warn('SolicitacaoRfq', 'Tentativa de envio de formulário inválido');
      return;
    }

    this.isSending.set(true);
    
    const formValue = this.rfqForm.getRawValue();

    // Mapeamento explícito para o DTO de contrato
    const payload: OrcamentoRequestDTO = {
      nomeProjeto: formValue.nomeProjeto,
      nomeEmpresa: formValue.nomeEmpresa,
      quantidadeRequerida: formValue.quantidade,
      aplicacaoPeca: formValue.aplicacaoPeca,
      solicitacaoMecanica: formValue.solicitacaoMecanica,
      solicitacaoAmbiental: formValue.solicitacaoAmbiental,
      dimensaoX: formValue.dimensaoX ?? 0,
      dimensaoY: formValue.dimensaoY ?? 0,
      dimensaoZ: formValue.dimensaoZ ?? 0,
      arameId: formValue.materialDesejadoId,
      tolerancia: formValue.tolerancia,
      acabamento: formValue.acabamento,
      criteriosAceitacao: formValue.criteriosAceitacao,
      detalhesInspecao: formValue.detalhesInspecao,
      tratamentoTermico: formValue.tratamentoTermico,
      arquivoUrl: formValue.arquivoUrl,
      normasTecnicas: formValue.normasTecnicas,
      tempoEntregaC9Dias: formValue.tempoEntregaC9,
      economiaPerdaLucroC10: formValue.economiaPerdaLucroC10,
      // Injeção estática da estratégia industrial para conformidade com o motor de cálculo
      estrategiaO15: 'SINGLE'
    };
    
    this.orcamentoService.criar(payload).subscribe({
      next: (response) => {
        this.log.info('SolicitacaoRfq', `RFQ criado com sucesso: ${response.id}`);
        alert('Solicitação RFQ enviada com sucesso! Nossa engenharia analisará o fatiamento e retornará em breve.');
        this.isSending.set(false);
        this.router.navigate(['/cliente/dashboard']);
      },
      error: (err) => {
        this.log.error('SolicitacaoRfq', 'Falha crítica ao enviar RFQ', err);
        alert('Erro ao enviar solicitação. Por favor, tente novamente.');
        this.isSending.set(false);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);
      this.selectedFileName.set(file.name);
      
      // Simulação de upload para arquivoUrl
      // Em produção, aqui iria a lógica de upload para o S3/GCP
      this.rfqForm.patchValue({ arquivoUrl: `uploads/3d/${file.name}` });
      this.log.info('SolicitacaoRfq', `Arquivo selecionado: ${file.name}`);
    }
  }

  triggerFileSelect() {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
