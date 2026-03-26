/**
 * DTO para solicitação inicial do Cliente (Classe C - Stage I).
 * Alinhado com as 13 siglas de entradas do cliente.
 */
export interface OrcamentoRequestDTO {
  id?: string;
  nomeProjeto: string;
  nomeEmpresa: string;
  quantidade: number; // C1
  aplicacaoPeca: string; // C2
  solicitacaoMecanica: string; // C3
  solicitacaoAmbiental?: string; // C4
  tolerancia?: string; // C5
  acabamento?: string; // C6
  criteriosAceitacao?: string; // C7
  normasTecnicas?: string; // C8
  tempoEntregaC9?: string; // C9
  economiaPerdaLucroC10?: number; // C10
  dimensaoX: number; // C11
  dimensaoY: number;
  dimensaoZ: number;
  arquivoUrl?: string; // C12
  detalhesInspecao?: string; // C13
  materialDesejadoId: string;
  tratamentoTermico?: boolean;
}

/**
 * DTO para a fase de Processamento Metrológico (Stage II/III).
 * Reconciliado com a Planilha de Validação Industrial e Relatório de Aderência.
 */
export interface OrcamentoCalculoRequestDTO {
  orcamentoId: string; // UUID mapeado como string no TS
  arameId: string;     // UUID mapeado como string no TS
  
  // Variáveis Cinéticas e de Processo (Classe S e P)
  nCamadas: number;                 // n
  tempoArcoTotalS1: number;         // S1 (Minutos)
  tempoMortoTotalS2: number;        // S2 (Minutos)
  tempoMortoIntercamadaP11: number;  // P11 (Minutos)
  velocidadeArameP9: number;        // P9 (m/min)
  vazaoGasP2: number;               // P2 (m³/min)
  
  // Parâmetros de Setup (Classe O)
  tempoPreparacaoO6: number;        // O6 (Minutos)
  tempoDesmontagemO7: number;       // O7 (Minutos)
  
  // Custos de Insumos Adicionais
  custoSubstratoO10: number;        // O10 (R$)
  
  // Flags de Serviços Adicionais (AC)
  requerProjetoCAD: boolean;        // AC4
  requerUsinagemFinal: boolean;     // AC8
  tempoUsinagemMinutos: number;     // Tempo p/ AC8
  requerTratamentoTermico: boolean; // AC9
}

export interface ServicoAdicionalDTO {
  descricaoServico: string;
  quantidadeHoras: number;
  taxaAplicadaSnapshot: number;
  custoTotalAC: number;
}

/**
 * DTO de Saída unificado para a metodologia MADA.
 */
/**
 * DTO de Saída unificado para a metodologia MADA.
 * Reflete as 3 Etapas e os Custos IC/AC de forma aninhada.
 */
export interface OrcamentoResponseDTO {
  id: string;
  status: string;
  dataEmissao: string;
  
  // --- Entradas do Cliente (Classe C) ---
  nomeProjeto: string;
  nomeEmpresa: string;
  quantidade: number;
  aplicacaoPeca: string;
  solicitacaoMecanica: string;
  solicitacaoAmbiental: string;
  tolerancia: string;
  acabamento: string;
  criteriosAceitacao: string;
  normasTecnicas: string;
  tempoEntregaC9: string;
  economiaPerdaLucroC10: number;
  dimensaoX: number;
  dimensaoY: number;
  dimensaoZ: number;
  arquivoUrl: string;
  detalhesInspecao: string;
  materialDesejadoId: string;
  
  // --- Agrupamentos Metodológicos (Nest) ---
  fase1IC: Fase1ICDTO;
  fase3AC: Fase3ACDTO[];
  
  // --- Aliases de Compatibilidade (Legado/Atalhos) ---
  tempoArcoMinutos: number;
  tempoMortoMinutos: number;
  tempoTotalDeposicaoMinutos: number;
  massaEstimadaKg: number;
  ic1Arame: number;
  ic2Gas: number;
  ic3Equipamento: number;
  ic4Substrato: number;

  // --- Consolidação Final ---
  custoTotalIC: number;
  custoTotalAC: number;
  custoTotalFinal: number; // TC
  margemComercialAplicadaPM: number;
  taxaImpostoTR: number;
  precoFinalSugerido: number;
  fatorRiscoGeral: number;
}

export interface Fase1ICDTO {
  ic1Arame: number;
  ic2Gas: number;
  ic3Equipamento: number;
  ic4Substrato: number;
  custoTotalIC: number;
  tempoArcoMinutos: number;
  tempoMortoMinutos: number;
  tempoTotalDeposicaoMinutos: number;
  massaEstimadaKg: number;
  taxaMaoDeObraSnapshot: number;
  taxaEngenheiroSnapshot: number;
  taxaEnergiaSnapshot: number;
  aramePrecoKgSnapshot: number;
  gasPrecoM3Snapshot: number;
}

export interface Fase3ACDTO {
  id?: number;
  descricaoServico: string;
  quantidadeHoras: number;
  taxaAplicadaSnapshot: number;
  custoTotalAC: number;
}
