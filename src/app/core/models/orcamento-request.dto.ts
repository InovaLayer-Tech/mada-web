/**
 * Representa a carga útil (Payload) estrita que o Front-end envia para o Back-end.
 * De acordo com as diretrizes do Blueprint da InovaLayer 3D, NENHUM DADO FINANCEIRO
 * transita neste DTO, garantindo Single Source of Truth (SSOT).
 */
export interface OrcamentoRequestDTO {
  // Dados Descritivos (Identificação)
  identificacaoPeca?: string;
  quantidadeRequerida?: number;
  aplicacaoComponente?: string;
  solicitacaoMecanicaServico?: string;
  solicitacaoAmbientalOperacional?: string;
  toleranciaDimensionalExigidaMm?: number | string;
  acabamentoSuperficialMm?: string;

  // Fase 1: Physical Variables (IC)
  tempoPreparacaoMinutos: number;
  tempoRemocaoMinutos: number;

  // Fase 2: Physical Variables (DC)
  tempoArcoMinutos: number;
  massaEstimadaKg: number;
  arameId: number;
  gasId: number;

  // Fase 3: Intentions (AC)
  requerProjetoCAD: boolean;
  requerUsinagemFinal: boolean;
  tempoUsinagemMinutos?: number;
}
