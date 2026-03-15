import { Routes } from '@angular/router';
import { FormularioRequisicaoComponent } from './features/orcamento/components/formulario-requisicao/formulario-requisicao.component';
import { AuditoriaOrcamentoComponent } from './features/orcamento/components/auditoria-orcamento/auditoria-orcamento.component';

export const routes: Routes = [
  { path: 'orcamento/novo', component: FormularioRequisicaoComponent },
  { path: 'orcamentos/auditoria/:id', component: AuditoriaOrcamentoComponent },
  { path: '', redirectTo: 'orcamento/novo', pathMatch: 'full' }
];
