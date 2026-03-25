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
    precoUnitarioBase: [0, [Validators.required, Validators.min(0.01)]], // O9 ou O13
    
    // CAMPOS MADA RECONCILIADOS
    diametroM: [0.0012, [Validators.min(0.0001)]],      // P8
    densidadeKgM3: [7750, [Validators.min(1000)]],     // P5
    eficienciaP6: [90, [Validators.min(10), Validators.max(100)]], // P6
    massaBobinaO1: [15, [Validators.min(1)]],         // O1
    perdaBobinaO8: [0.03, [Validators.min(0), Validators.max(1)]], // O8 (decimal)
    
    ativo: [true],
    tipoGas: [''],
    ligaMetalica: ['']
  });

  abrirModal() {
    this.editingId = null;
    this.showModal = true;
    this.insumoForm.reset({ 
      nome: '',
      codigoProduto: '',
      fornecedor: '',
      precoUnitarioBase: 0, 
      diametroM: 0.0012,
      densidadeKgM3: 7750,
      eficienciaP6: 90,
      massaBobinaO1: 15,
      perdaBobinaO8: 0.03,
      ativo: true,
      tipoGas: '',
      ligaMetalica: ''
    });
  }

  fecharModal() {
    this.showModal = false;
    this.editingId = null;
  }

  setTipo(tipo: 'arame' | 'gas') {
    if (this.editingId) return;
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

    const { ...dados } = this.insumoForm.getRawValue();
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
