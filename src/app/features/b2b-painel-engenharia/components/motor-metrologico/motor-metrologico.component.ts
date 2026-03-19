import { Component, inject, DestroyRef, OnInit, signal } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrcamentoService } from '../../../../core/services/orcamento.service';
import { ProblemDetail } from '../../../../core/models/problem-detail';
import { OrcamentoResponseDTO } from '../../../../core/models/orcamento.model';
import { ArameMetalicoService } from '../../../../core/services/arame-metalico.service';
import { ArameMetalicoResponseDTO } from '../../../../core/models/arame-metalico.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-motor-metrologico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, ToastModule],
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

  orcamentoForm = this.fb.group({
    orcamentoId: ['', Validators.required],
    arameId: ['', Validators.required],
    
    // Dados Metrológicos (Engenharia)
    massaEstimadaKg: [0, [Validators.required, Validators.min(0.01)]],
    tempoArcoMinutos: [0, [Validators.required, Validators.min(0.01)]],
    tempoMortoMinutos: [0, [Validators.required, Validators.min(0)]],
    tempoPreparacaoMinutos: [60, [Validators.required, Validators.min(1)]],
    tempoRemocaoMinutos: [30, [Validators.required, Validators.min(1)]],
    
    // Serviços Adicionais
    requerProjetoCAD: [true],
    requerUsinagemFinal: [true],
    tempoUsinagemMinutos: this.fb.control({ value: 30, disabled: true }, [Validators.min(1)])
  });

  rfqSelecionado: OrcamentoResponseDTO | null = null;

  ngOnInit() {
    this.carregarDados();
    this.monitorarUsinagem();
    this.checkRouterState();
  }

  private checkRouterState() {
    // Tenta ler o RFQ vindo da fila de solicitações
    const state = window.history.state;
    if (state && state.rfq) {
      const rfq = state.rfq as OrcamentoResponseDTO;
      console.log('RFQ recebido via Navegação:', rfq);
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
      this.pendingRfqs = data.filter(r => r.status === 'PENDENTE' || r.status === 'CALCULADO');
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

        // Extrai TEMPO_ATIVO_TOTAL (em segundos)
        if (data && data.TEMPO_ATIVO_TOTAL !== undefined) {
          // Converte para minutos e arredonda para 2 casas decimais
          const valorCalculado = Number((data.TEMPO_ATIVO_TOTAL / 60).toFixed(2));
          
          this.orcamentoForm.patchValue({ 
            tempoArcoMinutos: valorCalculado 
          });

          this.uploadedFileName.set(file.name);

          this.messageService.add({ 
            severity: 'success', 
            summary: 'Sucesso', 
            detail: 'Dados metrológicos importados com sucesso' 
          });
        } else {
          this.messageService.add({ 
            severity: 'warn', 
            summary: 'Aviso', 
            detail: 'JSON lido, mas a chave TEMPO_ATIVO_TOTAL não foi encontrada' 
          });
        }
      } catch (error) {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Erro', 
          detail: 'O ficheiro JSON é inválido ou está corrompido' 
        });
      } finally {
        // Limpa o input para permitir uploads consecutivos do mesmo ficheiro
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
        this.router.navigate(['/b2b/auditoria'], { state: { rfq: res } });
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.erroApi.set(err.error?.message || 'Erro ao processar cálculo WAAM');
      }
    });
  }
}
