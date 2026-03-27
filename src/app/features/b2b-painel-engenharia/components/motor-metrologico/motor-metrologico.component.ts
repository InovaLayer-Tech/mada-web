import { Component, inject, DestroyRef, OnInit, signal } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO, OrcamentoCalculoRequestDTO } from '../../../../core/models/orcamento.model';
import { ArameMetalicoService } from '../../../../core/services/arame-metalico.service';
import { ArameMetalicoResponseDTO } from '../../../../core/models/arame-metalico.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-motor-metrologico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, ToastModule, RouterModule],
  providers: [MessageService],
  templateUrl: './motor-metrologico.component.html'
})
export class MotorMetrologicoComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private orcamentoService = inject(OrcamentoService);
  private arameService = inject(ArameMetalicoService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  arames: ArameMetalicoResponseDTO[] = [];
  pendingRfqs: OrcamentoResponseDTO[] = [];
  
  isSubmitting = signal(false);
  erroApi = signal<string | null>(null);
  uploadedFileName = signal<string | null>(null);
  orcamentoCalculado = signal<OrcamentoResponseDTO | null>(null);

  orcamentoForm = this.fb.group({
    orcamentoId: ['', Validators.required],
    arameId: ['', Validators.required],
    gasId: ['', Validators.required],
    gasSuplementarId: [''],
    
    // Variáveis Cinéticas (S e P) - BUG F1: Expansão MADA
    nCamadas: [40, [Validators.required, Validators.min(1)]],
    tempoArcoTotalS1: [0, [Validators.required, Validators.min(0)]],
    tempoMortoTotalS2: [0, [Validators.required, Validators.min(0)]],
    tempoMortoIntercamadaP11: [0, [Validators.required, Validators.min(0)]],
    velocidadeArameP9: [5.2, [Validators.required, Validators.min(0.1)]],
    vazaoGasP2: [0.015, [Validators.required, Validators.min(0)]],
    vazaoGasSuplementarP3: [0, [Validators.min(0)]],
    volumeDepositadoO2: [0, [Validators.min(0)]],
    
    // Parâmetros de Setup (O)
    tempoPreparacaoO6: [120, [Validators.required, Validators.min(0)]],
    tempoDesmontagemO7: [120, [Validators.required, Validators.min(0)]],
    custoSubstratoO10: [0, [Validators.required, Validators.min(0)]],
    custoPreparacaoO11: [0, [Validators.min(0)]],
    custoRemocaoO12: [0, [Validators.min(0)]],
    
    // Flags de Serviços (AC) - BUG F1: Detalhamento Industrial
    requerProjetoCAD: [true],
    tempoProjetoWT4: [10, [Validators.min(0)]],
    requerParametrizacaoAC7: [false],
    tempoParametrizacaoWT7: [5, [Validators.min(0)]],
    requerUsinagemFinal: [true],
    custoDiretoUsinagemAC8: [500, [Validators.min(0)]],
    requerTratamentoTermico: [false],
    custoDiretoTratamentoAC9: [300, [Validators.min(0)]],
    rfGeral: [1.0, [Validators.required, Validators.min(0.5), Validators.max(2.0)]],
    rfMaterialRfo9: [null],
    rfGasRfo13: [null],
    rfEnergiaRfo5: [null],
    rfTempoRftdt: [null],
    rfSubstratoRfo10: [null],
    estrategia_o15: ['a', Validators.required]
  });

  rfqSelecionado: OrcamentoResponseDTO | null = null;

  ngOnInit() {
    this.carregarDados();
    this.checkRouterState();
  }

  private checkRouterState() {
    const state = window.history.state;
    if (state && state.rfq) {
      const rfq = state.rfq as OrcamentoResponseDTO;
      this.rfqSelecionado = rfq;
      this.orcamentoForm.patchValue({ orcamentoId: rfq.id, arameId: rfq.materialDesejadoId || '', requerProjetoCAD: !rfq.arquivoUrl });
    }
  }

  carregarDados() {
    this.arameService.listarTodos().subscribe(data => this.arames = data);
    this.orcamentoService.listarTodos().subscribe(data => {
      this.pendingRfqs = data.filter(r => r.status === 'PENDENTE' || r.status === 'CALCULADO');
    });
  }

  onRfqChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    this.rfqSelecionado = this.pendingRfqs.find(r => r.id === id) || null;
    if (this.rfqSelecionado) this.orcamentoForm.patchValue({ orcamentoId: id, requerProjetoCAD: !this.rfqSelecionado.arquivoUrl });
  }

  onFileUpload(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        // BUG F6: Correção de unidade na importação do Slicer
        if (data && (data.TEMPO_ATIVO_TOTAL !== undefined || data.S1 !== undefined)) {
          // Se TEMPO_ATIVO_TOTAL > 1000, assumimos que está em SEGUNDOS e dividimos por 60
          const valorS1Raw = data.TEMPO_ATIVO_TOTAL || data.S1;
          const valorS1 = valorS1Raw > 5000 ? (valorS1Raw / 60) : valorS1Raw;
          this.orcamentoForm.patchValue({ tempoArcoTotalS1: Number(valorS1.toFixed(2)) });
          this.uploadedFileName.set(file.name);
          this.messageService.add({ severity: 'success', summary: 'Dados Importados', detail: 'S1 reconciliado via Slicer' });
        }
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Erro JSON', detail: 'Slicer incompatible' });
      } finally { element.value = ''; }
    };
    reader.readAsText(file);
  }

  onSubmit() {
    if (this.orcamentoForm.invalid) {
      this.orcamentoForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const formValue = this.orcamentoForm.getRawValue();
    const id = formValue.orcamentoId;

    // BUG F5: Tipagem segura de acordo com o DTO Java
    const payload: OrcamentoCalculoRequestDTO = {
      ...formValue,
      arameId: formValue.arameId,
      gasId: formValue.gasId,
      gasSuplementarId: formValue.gasSuplementarId || undefined,
      rfGeral: formValue.rfGeral,
      custoDiretoUsinagemAC8: formValue.custoDiretoUsinagemAC8,
      custoDiretoTratamentoAC9: formValue.custoDiretoTratamentoAC9
    };

    this.orcamentoService.processarCalculo(id, payload).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.orcamentoCalculado.set(res);
        this.messageService.add({ severity: 'success', summary: 'Cálculo MADA', detail: 'Reconciliação industrial concluída' });
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.erroApi.set(err.error?.message || 'Erro no motor de cálculo');
      }
    });
  }

  downloadPDF() { window.print(); }
}
