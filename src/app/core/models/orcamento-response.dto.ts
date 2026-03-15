export interface ServicoAdicionalDTO {
  descricaoServico: string;
  quantidadeHoras: number;
  custoServico: number; // BigDecimals do Java viram numbers no JS (Formatados para exibição 2 casas decimais)
}

/**
 * Representa os dados processados e devolvidos pelo Motor de Cálculo (Backend).
 * Estrutura feita para sustentar o "Progressive Disclosure" no Painel de Auditoria.
 */
export interface OrcamentoResponseDTO {
  id: string; // UUID
  status: string;
  dataEmissao: string; // ISO DateTime

  // FASE 1: IC
  tempoPreparacaoMinutos: number;
  tempoRemocaoMinutos: number;
  custoSubstratoIC: number;
  custoPreparacaoIC: number;
  custoRemocaoIC: number;
  custoTotalIC: number;

  // FASE 2: DC
  tempoArcoMinutos: number;
  massaEstimadaKg: number;
  nomeArameMetalico: string;
  custoMaterialDC: number;
  custoGasDC: number;
  custoEnergiaDC: number;
  custoMaquinaDC: number;
  custoTotalDC: number;

  // FASE 3: AC
  servicosAC: ServicoAdicionalDTO[];
  custoTotalAC: number;

  // CONSOLIDAÇÃO FINAL
  custoDiretoFabricacao: number;
  margemComercialAplicada: number;
  impostosFaturamentoEstimados: number;
  precoFinalSugerido: number;
}
