import { Routes } from '@angular/router';
import { LandingPagePolishedComponent } from './features/b2c-portal-cliente/components/landing-page/landing-page.component';
import { SolicitacaoRfqComponent } from './features/b2c-portal-cliente/components/solicitacao-rfq/solicitacao-rfq.component';
import { DashboardClienteComponent } from './features/b2c-portal-cliente/components/dashboard-cliente/dashboard-cliente.component';
import { FilaSolicitacoesComponent } from './features/b2b-painel-engenharia/components/fila-solicitacoes/fila-solicitacoes.component';
import { MotorMetrologicoComponent } from './features/b2b-painel-engenharia/components/motor-metrologico/motor-metrologico.component';
import { DashboardAuditoriaComponent } from './features/b2b-painel-engenharia/components/dashboard-auditoria/dashboard-auditoria.component';
import { CatalogoInsumosComponent } from './features/b2b-painel-engenharia/components/catalogo-insumos/catalogo-insumos.component';
import { B2cLayoutComponent } from './features/b2c-portal-cliente/layout/b2c-layout.component';
import { B2bLayoutComponent } from './features/b2b-painel-engenharia/layout/b2b-layout.component';
import { LoginComponent } from './features/shared/login/login.component';
import { PerfilComponent } from './features/b2b-painel-engenharia/components/perfil/perfil.component';
import { PerfilClienteComponent } from './features/b2c-portal-cliente/components/perfil/perfil-cliente.component';
import { ConfiguracoesGlobaisComponent } from './features/b2b-painel-engenharia/components/configuracoes-globais/configuracoes-globais.component';
import { CadastroClienteComponent } from './features/b2c-portal-cliente/components/cadastro-cliente/cadastro-cliente.component';
import { DetalhePropostaComponent } from './features/b2c-portal-cliente/components/detalhe-proposta/detalhe-proposta.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Rotas Públicas (Sem Sidebar)
  { path: '', component: LandingPagePolishedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroClienteComponent },

  // Área Autenticada B2C
  { 
    path: 'cliente', 
    component: B2cLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'rfq', component: SolicitacaoRfqComponent },
      { path: 'dashboard', component: DashboardClienteComponent },
      { path: 'perfil', component: PerfilClienteComponent },
      { path: 'proposta/:id', component: DetalhePropostaComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Área Autenticada B2B (Back-Office)
  { 
    path: 'b2b', 
    component: B2bLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'pedidos', component: FilaSolicitacoesComponent },
      { path: 'motor', component: MotorMetrologicoComponent },
      { path: 'resumo/:id', component: MotorMetrologicoComponent },
      { path: 'auditoria', component: DashboardAuditoriaComponent },
      { path: 'perfil', component: PerfilComponent },

      { path: 'catalogo', component: CatalogoInsumosComponent },
      { path: 'taxas', component: ConfiguracoesGlobaisComponent },
      { path: '', redirectTo: 'pedidos', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: '' }
];
