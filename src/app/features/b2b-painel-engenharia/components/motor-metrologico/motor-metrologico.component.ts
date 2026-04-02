import { Component, inject, DestroyRef, OnInit, signal } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { OrcamentoResponseDTO, OrcamentoCalculoRequestDTO } from '../../../../core/models/orcamento.model';
import { ArameMetalicoService } from '../../../../core/services/arame-metalico.service';
import { ArameMetalicoResponseDTO } from '../../../../core/models/arame-metalico.model';
import { GasProtecaoService } from '../../../../core/services/gas-protecao.service';
import { GasProtecaoResponseDTO } from '../../../../core/models/gas-protecao.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfigService } from '../../../../core/services/config.service';
import { EntradaPadrao } from '../../../../core/models/entrada-padrao.model';

@Component({
  selector: 'app-motor-metrologico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, ToastModule, RouterModule, InputNumberModule],
  providers: [MessageService],
  templateUrl: './motor-metrologico.component.html'
})
export class MotorMetrologicoComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private orcamentoService = inject(OrcamentoService);
  private arameService = inject(ArameMetalicoService);
  private gasService = inject(GasProtecaoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);
  private configService = inject(ConfigService);

  arames: ArameMetalicoResponseDTO[] = [];
  gases: GasProtecaoResponseDTO[] = [];
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
    
    // Variáveis Cinéticas (S e P)
    nCamadas: [null as number | null, [Validators.required, Validators.min(1)]],
    tempoArcoTotalS1: [null as number | null, [Validators.required, Validators.min(0)]],
    tempoMortoTotalS2: [null as number | null, [Validators.required, Validators.min(0)]],
    tempoMortoIntercamadaP11: [null as number | null, [Validators.required, Validators.min(0)]],
    velocidadeArameP9: [null as number | null, [Validators.required, Validators.min(0.1)]],
    vazaoGasP2: [null as number | null, [Validators.required, Validators.min(0)]],
    vazaoGasSuplementarP3: [null as number | null, [Validators.min(0)]],
    volumeDepositadoO2: [null as number | null, [Validators.min(0)]],
    
    // Parâmetros de Setup (O)
    tempoPreparacaoO6: [null as number | null, [Validators.required, Validators.min(0)]],
    tempoDesmontagemO7: [null as number | null, [Validators.required, Validators.min(0)]],
    custoSubstratoO10: [null as number | null, [Validators.required, Validators.min(0)]],
    custoPreparacaoO11: [null as number | null, [Validators.min(0)]],
    custoRemocaoO12: [null as number | null, [Validators.min(0)]],
    
    // Flags de Serviços (AC)
    requerProjetoCAD: [false],
    tempoProjetoWT4: [null as number | null, [Validators.min(0)]],
    requerParametrizacaoAC7: [false],
    tempoParametrizacaoWT7: [null as number | null, [Validators.min(0)]],
    requerUsinagemFinal: [false],
    custoDiretoUsinagemAC8: [null as number | null, [Validators.min(0)]],
    requerTratamentoTermico: [false],
    custoDiretoTratamentoAC9: [null as number | null, [Validators.min(0)]],
    rfGeral: [1.0, [Validators.required, Validators.min(0.5), Validators.max(2.0)]],
    rfMaterialRfo9: [{ value: null as number | null, disabled: true }],
    rfGasRfo13: [{ value: null as number | null, disabled: true }],
    rfEnergiaRfo5: [{ value: null as number | null, disabled: true }],
    rfTempoRftdt: [{ value: null as number | null, disabled: true }],
    rfSubstratoRfo10: [{ value: null as number | null, disabled: true }],
    estrategia_o15: ['a'] 
  });

  rfqSelecionado: OrcamentoResponseDTO | null = null;

  ngOnInit() {
    this.carregarDados();
    this.checkRouterState();
    this.checkDirectViewRoute();
  }

  private checkDirectViewRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
       this.orcamentoService.buscarPorId(id).subscribe({
          next: (res) => {
             this.orcamentoCalculado.set(res);
             this.rfqSelecionado = res;
             // Ensure names resolve correctly
             this.orcamentoForm.patchValue({
                orcamentoId: res.id,
                arameId: res.materialDesejadoId || ''
             });
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Orçamento não encontrado' })
       });
    }
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
    this.gasService.listarTodos().subscribe(data => this.gases = data);
    this.orcamentoService.listarTodos().subscribe(data => {
      this.pendingRfqs = data.filter(r => r.status === 'PENDENTE' || r.status === 'CALCULADO');
    });
    this.configService.obterConfiguracao().subscribe(config => {
      this.orcamentoForm.patchValue({
        rfMaterialRfo9: config.rfMaterialRfo9,
        rfGasRfo13: config.rfGasRfo13,
        rfEnergiaRfo5: config.rfEnergiaRfo5,
        rfTempoRftdt: config.rfTempoRftdt,
        rfSubstratoRfo10: config.rfSubstratoRfo10
      });
    });
  }

  onRfqChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    this.rfqSelecionado = this.pendingRfqs.find(r => r.id === id) || null;
    if (this.rfqSelecionado) {
       this.orcamentoForm.patchValue({ 
          orcamentoId: id, 
          requerProjetoCAD: !this.rfqSelecionado.arquivoUrl,
          arameId: this.rfqSelecionado.materialDesejadoId || '',
          requerTratamentoTermico: !!this.rfqSelecionado.tratamentoTermico
       });
    }
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

    // BUG F5/F6 Resolvidos: Tipagem segura e conversão de unidades
    const payload: OrcamentoCalculoRequestDTO = {
      ...formValue,
      numeroCamadas: formValue.nCamadas ?? undefined,
      arameId: formValue.arameId as string,
      gasId: formValue.gasId as string,
      gasSuplementarId: formValue.gasSuplementarId || undefined,
      
      // CONVERSÕES DIMENSIONAIS OBRIGATÓRIAS (Front -> Back)
      tempoPreparacaoO6: formValue.tempoPreparacaoO6 ? (formValue.tempoPreparacaoO6 / 60) : 0, // Minutos para Horas
      tempoDesmontagemO7: formValue.tempoDesmontagemO7 ? (formValue.tempoDesmontagemO7 / 60) : 0, // Minutos para Horas
      volumeDepositadoO2: formValue.volumeDepositadoO2 ? (formValue.volumeDepositadoO2 / 1000000) : undefined, // cm³ para m³
      
      rfGeral: formValue.rfGeral,
      custoDiretoUsinagemAC8: formValue.custoDiretoUsinagemAC8 ?? undefined,
      custoDiretoTratamentoAC9: formValue.custoDiretoTratamentoAC9 ?? undefined
    } as OrcamentoCalculoRequestDTO;

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

  getArameName(): string {
    const id = this.orcamentoForm.get('arameId')?.value || this.orcamentoCalculado()?.materialDesejadoId;
    const a = this.arames.find(x => x.id === id);
    return a ? a.ligaMetalica : 'LIGA METÁLICA (RFQ)';
  }

  getGasName(): string {
    const id = this.orcamentoForm.get('gasId')?.value;
    const g = this.gases.find(x => x.id === id);
    return g ? g.nome : 'MISTURA PADRÃO INOVALAYER';
  }

  downloadPDF() { window.print(); }
}
