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

@Component({
  selector: 'app-motor-metrologico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './motor-metrologico.component.html'
})
export class MotorMetrologicoComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private orcamentoService = inject(OrcamentoService);
  private arameService = inject(ArameMetalicoService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  arames: ArameMetalicoResponseDTO[] = [];
  pendingRfqs: OrcamentoResponseDTO[] = [];
  
  isSubmitting = signal(false);
  erroApi = signal<string | null>(null);

  orcamentoForm = this.fb.group({
    orcamentoId: ['', Validators.required],
    arameId: ['', Validators.required],
    
    // Dados Metrológicos (Engenharia)
    massaEstimadaKg: [0, [Validators.required, Validators.min(0.01)]],
    tempoArcoMinutos: [0, [Validators.required, Validators.min(0.01)]],
    tempoPreparacaoMinutos: [60, [Validators.required, Validators.min(1)]],
    tempoRemocaoMinutos: [30, [Validators.required, Validators.min(1)]],
    
    // Serviços Adicionais
    requerProjetoCAD: [true],
    requerUsinagemFinal: [false],
    tempoUsinagemMinutos: this.fb.control({ value: 0, disabled: true }, [Validators.min(1)]),
    
    // Auxiliar para JSON
    jsonInput: ['']
  });

  rfqSelecionado: OrcamentoResponseDTO | null = null;

  ngOnInit() {
    this.carregarDados();
    this.monitorarUsinagem();
    this.monitorarJson();
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
       this.orcamentoForm.patchValue({ orcamentoId: id });
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

  private monitorarJson() {
    this.orcamentoForm.controls.jsonInput.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => {
        try {
          if (!val) return;
          const data = JSON.parse(val);
          this.orcamentoForm.patchValue({
            massaEstimadaKg: data.massa || data.mass_kg || data.weight || 0,
            tempoArcoMinutos: data.tempo_arco || data.arc_time || 0,
            tempoPreparacaoMinutos: data.setup_time || 60
          });
        } catch(e) {}
      });
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
