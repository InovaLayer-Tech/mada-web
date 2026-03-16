import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitacao-rfq',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitacao-rfq.component.html'
})
export class SolicitacaoRfqComponent {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  rfqForm = this.fb.group({
    empresa: ['', Validators.required],
    contato: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    materialDesejado: ['', Validators.required],
    finalidade: ['', Validators.required],
    tratamentoTermico: [false],
    acabamento: ['', Validators.required],
    urgencia: ['Padrao', Validators.required],
    condicoesTrabalho: [''],
    requisitosTecnicos: [''],
    arquivo3d: [null as File | null]
  });

  isSending = false;

  enviarSolicitacao() {
    if (this.rfqForm.invalid) {
      this.rfqForm.markAllAsTouched();
      return;
    }

    this.isSending = true;
    
    // Simulação de Sucesso (Mock)
    setTimeout(() => {
      alert('Solicitação RFQ enviada com sucesso! Nossa engenharia analisará o fatiamento e retornará em breve.');
      this.isSending = false;
      this.router.navigate(['/b2c/dashboard']);
    }, 1500);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.rfqForm.patchValue({ arquivo3d: file });
    }
  }
}
