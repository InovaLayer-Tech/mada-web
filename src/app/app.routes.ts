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

export const routes: Routes = [
  // Rotas Públicas (Sem Sidebar)
  { path: '', component: LandingPagePolishedComponent },
  { path: 'login', component: LoginComponent },

  // Área Autenticada B2C
  { 
    path: 'cliente', 
    component: B2cLayoutComponent,
    children: [
      { path: 'rfq', component: SolicitacaoRfqComponent },
      { path: 'dashboard', component: DashboardClienteComponent },
      { path: 'perfil', component: PerfilClienteComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Área Autenticada B2B (Back-Office)
  { 
    path: 'b2b', 
    component: B2bLayoutComponent,
    children: [
      { path: 'pedidos', component: FilaSolicitacoesComponent },
      { path: 'motor', component: MotorMetrologicoComponent },
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
