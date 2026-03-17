import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { ArameMetalicoService } from '../../../core/services/arame-metalico.service';
import { GasProtecaoService } from '../../../core/services/gas-protecao.service';
import { ArameMetalicoResponseDTO } from '../../../core/models/arame-metalico.model';
import { GasProtecaoResponseDTO } from '../../../core/models/gas-protecao.model';

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

  arames: ArameMetalicoResponseDTO[] = [];
  gases: GasProtecaoResponseDTO[] = [];

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.arameService.listarTodos().subscribe(data => this.arames = data);
    this.gasService.listarTodos().subscribe(data => this.gases = data);
  }

  insumoForm = this.fb.group({
    nome: ['', Validators.required],
    sigla: ['', Validators.required],
    preco: [0, [Validators.required, Validators.min(0.01)]],
    densidade: [0], // Solo para Arame
    eficiencia: [100], // Solo para Arame
    vazaoGas: [15], // Solo para Gás
    ativo: [true]
  });

  abrirModal() {
    this.showModal = true;
    this.insumoForm.reset({ preco: 0, densidade: 0, eficiencia: 100, vazaoGas: 15, ativo: true });
  }

  fecharModal() {
    this.showModal = false;
  }

  setTipo(tipo: 'arame' | 'gas') {
    this.tipoInsumo = tipo;
  }

  salvarInsumo() {
    if (this.insumoForm.invalid) {
      this.insumoForm.markAllAsTouched();
      return;
    }

    // Por enquanto mantemos a lógica de push para feedback visual imediato, 
    // mas o ideal seria chamar o serviço de persistência.
    // TODO: Implementar métodos de criação nos serviços (POST)
    this.fecharModal();
  }
}
