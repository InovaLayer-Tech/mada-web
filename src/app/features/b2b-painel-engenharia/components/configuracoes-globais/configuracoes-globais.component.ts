import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../../../core/services/config.service';
import { EntradaPadrao } from '../../../../core/models/entrada-padrao.model';

@Component({
  selector: 'app-configuracoes-globais',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './configuracoes-globais.component.html'
})
export class ConfiguracoesGlobaisComponent implements OnInit {
  private fb = inject(FormBuilder);
  private configService = inject(ConfigService);

  isSaving = false;
  configId: string | null = null;

  configForm = this.fb.group({
    // D1 - Regional
    moedaSimboloD1: ['R$', Validators.required],
    
    // O - Insumos e Utilidades
    custoKwhO5: [0, [Validators.required, Validators.min(0)]],
    consumoPotenciaO3: [0, [Validators.required, Validators.min(0)]],
    taxaMaoDeObraMe: [0, [Validators.required, Validators.min(0)]],
    taxaEngenheiroDe: [0, [Validators.required, Validators.min(0)]],
    taxaPlanejamentoPe: [0, [Validators.required, Validators.min(0)]],
    taxaPosProcessamentoPp: [0, [Validators.required, Validators.min(0)]],
    
    // D - Equipamento
    custoEquipamentoEc: [0, [Validators.required, Validators.min(0)]],
    vidaUtilHorasLc: [0, [Validators.required, Validators.min(0)]],
    valorResidualPrv: [0, [Validators.required, Validators.min(0)]],
    custoManutencaoAnualTmc: [0, [Validators.required, Validators.min(0)]],
    horasTrabalhadasAnoHwy: [0, [Validators.required, Validators.min(0)]],
    
    // PM e TR
    margemLucroPm: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    taxaImpostosTr: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    
    // R - Riscos
    rfMaterialRfo9: [1.0, Validators.required],
    rfGasRfo13: [1.0, Validators.required],
    rfGasSupRfo14: [1.0, Validators.required],
    rfEnergiaRfo5: [1.0, Validators.required],
    rfTempoRftdt: [1.10, Validators.required], // Valor padrão 1.10 para Risk Margin de 10%
    rfSubstratoRfo10: [1.0, Validators.required]
  });

  ngOnInit() {
    this.carregarConfiguracoes();
  }

  carregarConfiguracoes() {
    this.configService.obterConfiguracao().subscribe(config => {
      this.configId = config.id || null;
      this.configForm.patchValue(config as any);
    });
  }

  salvarAlteracoes() {
    if (this.configForm.invalid) {
        this.configForm.markAllAsTouched();
        return;
    }

    this.isSaving = true;
    const payload = {
      ...this.configForm.getRawValue(),
      id: this.configId
    } as any;

    this.configService.atualizar(payload).subscribe({
      next: () => {
        this.isSaving = false;
        alert('Entradas Padrão (Classe D/O) atualizadas com sucesso!');
        this.carregarConfiguracoes();
      },
      error: () => {
        this.isSaving = false;
        alert('Erro ao salvar entradas padrão.');
      }
    });
  }
}
