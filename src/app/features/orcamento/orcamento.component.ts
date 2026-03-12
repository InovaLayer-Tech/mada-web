import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArameMetalicoService } from '../../core/services/arame-metalico.service';
import { OrcamentoService } from '../../core/services/orcamento.service';
import { ArameMetalicoResponseDTO } from '../../core/models/arame-metalico.model';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // O motor reativo obrigatório
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  orcamentoForm!: FormGroup;
  arames: ArameMetalicoResponseDTO[] = [];
  resultado: any = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private arameService: ArameMetalicoService,
    private orcamentoService: OrcamentoService
  ) { }

 ngOnInit(): void {
    this.initForm();
    this.carregarArames();

    // Injeção de Observabilidade: Rastreia cada tecla digitada e imprime no console do navegador
    this.orcamentoForm.valueChanges.subscribe(valores => {
      console.log('Sincronização Reativa (Memória):', valores);
    });
  }

  private initForm(): void {
    // Estas chaves (arameId, tempoArcoMinutos, massaEstimadaKg) são o contrato de estado.
    this.orcamentoForm = this.fb.group({
      arameId: ['', Validators.required],
      tempoArcoMinutos: [null, [Validators.required, Validators.min(0.1)]],
      massaEstimadaKg: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  carregarArames(): void {
    this.arameService.listarTodos().subscribe({
      next: (dados) => this.arames = dados,
      error: (err) => console.error('Falha ao carregar catálogo da API:', err)
    });
  }

  onSubmit(): void {
    if (this.orcamentoForm.valid) {
      this.loading = true;
      this.orcamentoService.calcular(this.orcamentoForm.value).subscribe({
        next: (res) => {
          this.resultado = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao processar cálculo:', err);
          this.loading = false;
        }
      });
    }
  }
}
