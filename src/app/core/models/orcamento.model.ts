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
 *
 * LINGUAGEM UBÍQUA MADA: Todos os campos refletem as siglas matemáticas
 * da metodologia para facilitar debugging financeiro sem consulta a docs externos.
 */
export interface OrcamentoCalculoRequestDTO {
  orcamentoId: string;
  arameId: string;
  
  // ─── Classe S: Variáveis de Trajetória (provenientes do Slicer) ──────────
  nCamadas: number;                  // n  — Número de camadas
  tempoArcoTotalS1: number;          // S1 — Tempo TOTAL de arco ativo (min) — JÁ CONSOLIDADO (n × tempo/camada)
  tempoMortoTotalS2: number;         // S2 — Tempo TOTAL morto (partidas/paradas) (min) — JÁ CONSOLIDADO
  tempoMortoIntercamadaP11: number;  // P11 — Tempo morto intercamada por camada (min)

  // ─── Classe P: Parâmetros do Processo ────────────────────────────────────
  velocidadeArameP9: number;         // P9 — Velocidade de alimentação do arame (m/min)
  vazaoGasP2: number;                // P2 — Vazão do gás de proteção (m³/min) — Backend usa m³/min

  // ─── Classe O: Parâmetros de Setup e Insumos ─────────────────────────────
  tempoPreparacaoO6: number;         // O6 — Tempo de preparação/setup (min)
  tempoDesmontagemO7: number;        // O7 — Tempo de desmontagem/remoção (min)
  custoSubstratoO10: number;         // O10 — Custo direto do substrato (R$)
  
  // ─── Flags de Controle — Serviços Adicionais (AC) ────────────────────────
  requerProjetoCAD: boolean;         // AC4 — Desenvolvimento CAD/CAM
  requerUsinagemFinal: boolean;      // AC8 — Usinagem geométrica final
  tempoUsinagemMinutos?: number;     // Tempo estimado para AC8
  requerTratamentoTermico?: boolean; // AC9 — Tratamento Térmico pós-deposição
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
