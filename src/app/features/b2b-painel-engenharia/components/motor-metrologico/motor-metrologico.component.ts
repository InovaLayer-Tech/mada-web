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
  margemExibicao = signal<number>(0);

  orcamentoForm = this.fb.group({
    orcamentoId: ['', Validators.required],
    arameId: ['', Validators.required],
    
    // Variáveis Cinéticas (S e P) - Sincronizado com a Planilha INDUSTRIAL
    nCamadas: [1, [Validators.required, Validators.min(1)]],           // n
    tempoArcoTotalS1: [0, [Validators.required, Validators.min(0.01)]], // S1 (min)
    tempoMortoTotalS2: [0, [Validators.required, Validators.min(0)]],    // S2 (min)
    tempoMortoIntercamadaP11: [0, [Validators.required, Validators.min(0)]], // P11 (min)
    velocidadeArameP9: [5.2, [Validators.required, Validators.min(0.1)]], // P9 (m/min)
    vazaoGasP2: [0.015, [Validators.required, Validators.min(0)]],      // P2 (m³/min)
    
    // Parâmetros de Setup (O)
    tempoPreparacaoO6: [120, [Validators.required, Validators.min(1)]], // O6 (min)
    tempoDesmontagemO7: [120, [Validators.required, Validators.min(1)]], // O7 (min)
    
    // Insumos Adicionais
    custoSubstratoO10: [0, [Validators.required, Validators.min(0)]],   // O10 (R$)
    
    // Flags de Serviços (AC)
    requerProjetoCAD: [true],            // AC4
    requerUsinagemFinal: [true],         // AC8
    tempoUsinagemMinutos: [30, [Validators.min(1)]],
    requerTratamentoTermico: [false]     // AC9
  });

  rfqSelecionado: OrcamentoResponseDTO | null = null;

  ngOnInit() {
    this.carregarDados();
    this.monitorarUsinagem();
    this.checkRouterState();
  }

  private checkRouterState() {
    const state = window.history.state;
    if (state && state.rfq) {
      const rfq = state.rfq as OrcamentoResponseDTO;
      this.rfqSelecionado = rfq;
      this.orcamentoForm.patchValue({ 
        orcamentoId: rfq.id,
        arameId: rfq.materialDesejadoId || '',
        requerProjetoCAD: !rfq.arquivoUrl
      });
    }
  }

  carregarDados() {
    this.arameService.listarTodos().subscribe(data => this.arames = data);
    this.orcamentoService.listarTodos().subscribe(data => {
      this.pendingRfqs = data.filter(r => r.status === 'PENDENTE' || r.status === 'CALCULADO' || r.status === 'INCOMPLETE_RFQ');
    });
  }

  onRfqChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    this.rfqSelecionado = this.pendingRfqs.find(r => r.id === id) || null;
    if (this.rfqSelecionado) {
       this.orcamentoForm.patchValue({ 
         orcamentoId: id,
         requerProjetoCAD: !this.rfqSelecionado.arquivoUrl
       });
    }
  }

  private monitorarUsinagem() {
    this.orcamentoForm.controls.requerUsinagemFinal.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(active => {
        const ctrl = this.orcamentoForm.controls.tempoUsinagemMinutos;
        active ? ctrl.enable() : ctrl.disable();
      });
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

        // Se o JSON contiver P0/S1 consolidados
        if (data && (data.TEMPO_ATIVO_TOTAL !== undefined || data.S1 !== undefined)) {
          const valorS1 = data.TEMPO_ATIVO_TOTAL ? (data.TEMPO_ATIVO_TOTAL / 60) : data.S1;
          this.orcamentoForm.patchValue({ 
            tempoArcoTotalS1: Number(valorS1.toFixed(2))
          });
          this.uploadedFileName.set(file.name);
          this.messageService.add({ severity: 'success', summary: 'Dados de Trajetória', detail: 'S1 importado via Slicer' });
        }
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Erro JSON', detail: 'Script incompatível' });
      } finally {
        element.value = '';
      }
    };
    reader.readAsText(file);
  }

  onSubmit() {
    if (this.orcamentoForm.invalid) {
      this.orcamentoForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const id = this.orcamentoForm.getRawValue().orcamentoId;
    const payload = this.orcamentoForm.getRawValue();

    this.orcamentoService.processarCalculo(id, payload as any).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.orcamentoCalculado.set(res);
        this.messageService.add({ severity: 'success', summary: 'Síntese MADA', detail: 'Cálculo reconciliado com sucesso' });
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.erroApi.set(err.error?.message || 'Erro no Motor Metrológico');
      }
    });
  }

  downloadPDF() {
    window.print();
  }
}
