import { Routes } from '@angular/router';
import { OrcamentoComponent } from './features/orcamento/orcamento.component';

export const routes: Routes = [
  { path: 'orcamento', component: OrcamentoComponent },
  { path: '', redirectTo: 'orcamento', pathMatch: 'full' }
];
