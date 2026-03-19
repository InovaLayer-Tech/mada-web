import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { ArameMetalicoService } from '../../../../core/services/arame-metalico.service';
import { GasProtecaoService } from '../../../../core/services/gas-protecao.service';
import { ArameMetalicoResponseDTO } from '../../../../core/models/arame-metalico.model';
import { GasProtecaoResponseDTO } from '../../../../core/models/gas-protecao.model';

@Component({
  selector: 'app-catalogo-insumos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './catalogo-insumos.component.html'
})
export class CatalogoInsumosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private arameService = inject(ArameMetalicoService);
  private gasService = inject(GasProtecaoService);
  
  showModal = false;
  tipoInsumo: 'arame' | 'gas' = 'arame';
  editingId: string | null = null;

  arames: ArameMetalicoResponseDTO[] = [];
  gases: GasProtecaoResponseDTO[] = [];

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.arameService.listarTodos().subscribe((data) => this.arames = data);
    this.gasService.listarTodos().subscribe((data) => this.gases = data);
  }

  insumoForm = this.fb.group({
    nome: ['', Validators.required],
    codigoProduto: ['', Validators.required],
    fornecedor: ['', Validators.required],
    precoUnitarioBase: [0, [Validators.required, Validators.min(0.01)]],
    densidadeGcm3: [0], 
    eficiencia: [100], 
    vazaoPadrao: [0], 
    ativo: [true],
    tipoGas: [''],
    ligaMetalica: [''],
    tipoMaterial: ['']
  });

  abrirModal() {
    this.editingId = null;
    this.showModal = true;
    this.insumoForm.reset({ 
      nome: '',
      codigoProduto: '',
      fornecedor: '',
      precoUnitarioBase: 0, 
      densidadeGcm3: 0, 
      eficiencia: 100, 
      vazaoPadrao: 0, 
      ativo: true,
      tipoGas: '',
      ligaMetalica: '',
      tipoMaterial: ''
    });
  }

  fecharModal() {
    this.showModal = false;
    this.editingId = null;
  }

  setTipo(tipo: 'arame' | 'gas') {
    if (this.editingId) return; // Não mudar tipo ao editar
    this.tipoInsumo = tipo;
  }

  editarInsumo(item: any, tipo: 'arame' | 'gas') {
    this.editingId = item.id;
    this.tipoInsumo = tipo;
    this.showModal = true;
    this.insumoForm.patchValue(item);
  }

  toggleStatus(id: string, tipo: 'arame' | 'gas') {
    const service: any = tipo === 'arame' ? this.arameService : this.gasService;
    service.alterarStatus(id).subscribe(() => this.carregarDados());
  }

  excluirInsumo(id: string, tipo: 'arame' | 'gas') {
    if (confirm('Deseja realmente excluir este insumo?')) {
      const service: any = tipo === 'arame' ? this.arameService : this.gasService;
      service.excluir(id).subscribe(() => this.carregarDados());
    }
  }

  salvarInsumo() {
    if (this.insumoForm.invalid) {
      this.insumoForm.markAllAsTouched();
      return;
    }

    const dados = this.insumoForm.value;
    const service: any = this.tipoInsumo === 'arame' ? this.arameService : this.gasService;

    if (this.editingId) {
      service.atualizar(this.editingId, dados).subscribe(() => {
        this.carregarDados();
        this.fecharModal();
      });
    } else {
      service.salvar(dados).subscribe(() => {
        this.carregarDados();
        this.fecharModal();
      });
    }
  }
}
