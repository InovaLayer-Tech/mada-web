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
 * Reconciliado com a Planilha de Validação Industrial.
 */
export interface OrcamentoCalculoRequestDTO {
  orcamentoId: string;
  arameId: string;
  
  // Variáveis de Processo (Planilha Industrial)
  nCamadas: number;              // n
  tempoArcoTotalS1: number;      // S1 (min)
  tempoMortoTotalS2: number;     // S2 (min)
  tempoMortoIntercamadaP11: number; // P11 (min)
  velocidadeArameP9: number;     // P9 (m/min)
  vazaoGasP2: number;            // P2 (m³/min)
  
  // Parâmetros de Setup (Classe O)
  tempoPreparacaoO6: number;     // O6
  tempoDesmontagemO7: number;    // O7
  
  // Insumos Adicionais
  custoSubstratoO10: number;     // O10
  
  // Flags de Controle
  requerProjetoCAD: boolean;     // AC4
  requerUsinagemFinal: boolean;  // AC8
  tempoUsinagemMinutos?: number;
  requerTratamentoTermico?: boolean; // AC9
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
  materialDesejadoId?: string;
  
  // --- Custos Intrínsecos (IC - Stage II) ---
  ic1Arame: number;
  ic2Gas: number;
  ic3Equipamento: number;
  ic4Substrato: number;
  custoTotalIC: number;
  
  // Snapshots Cinéticos
  tempoArcoMinutos: number;
  tempoMortoMinutos: number;
  tempoTotalDeposicaoMinutos: number;
  massaEstimadaKg: number;
  
  // --- Custos Adicionais (AC - Stage III) ---
  servicosAC: ServicoAdicionalDTO[];
  custoTotalAC: number;
  
  // --- Consolidação Final ---
  custoTotalFinal: number; // TC
  margemComercialAplicadaPM: number;
  taxaImpostoTR: number;
  precoFinalSugerido: number;
  fatorRiscoGeral: number;
}
