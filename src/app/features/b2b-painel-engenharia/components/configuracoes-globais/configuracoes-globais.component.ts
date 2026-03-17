import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../../../core/services/config.service';
import { ParametroGlobal } from '../../../../core/models/parametro-global.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-configuracoes-globais',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './configuracoes-globais.component.html'
})
export class ConfiguracoesGlobaisComponent implements OnInit {
  private fb = inject(FormBuilder);
  private configService = inject(ConfigService);
  private destroyRef = inject(DestroyRef);

  isSaving = false;
  configId: string | null = null;

  configForm = this.fb.group({
    custoKwh: [0, [Validators.required, Validators.min(0)]],
    consumoPotenciaKw: [0, [Validators.required, Validators.min(0)]],
    taxaEngenheiroHora: [0, [Validators.required, Validators.min(0)]],
    taxaMaoDeObraHora: [0, [Validators.required, Validators.min(0)]],
    taxaUsinagemHora: [0, [Validators.required, Validators.min(0)]],
    custoTratamentoTermicoFixo: [0, [Validators.required, Validators.min(0)]],
    margemLucroPercentual: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    taxaDepreciacaoMaquinaHora: [0, [Validators.required, Validators.min(0)]],
    fatorRiscoK1: [1.2, [Validators.required, Validators.min(1)]],
    fatorRiscoK2: [1.1, [Validators.required, Validators.min(1)]],
  });

  ngOnInit() {
    this.carregarConfiguracoes();
  }

  carregarConfiguracoes() {
    this.configService.obterConfiguracao().subscribe(config => {
      this.configId = config.id;
      this.configForm.patchValue(config);
    });
  }

  salvarAlteracoes() {
    if (this.configForm.invalid) return;

    this.isSaving = true;
    const payload = {
      ...this.configForm.getRawValue(),
      id: this.configId
    } as ParametroGlobal;

    this.configService.atualizar(payload).subscribe({
      next: () => {
        this.isSaving = false;
        alert('Configurações salvas com sucesso!');
      },
      error: () => {
        this.isSaving = false;
        alert('Erro ao salvar configurações.');
      }
    });
  }
}
