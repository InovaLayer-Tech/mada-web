/**
 * Contrato de Solicitação de Orçamento (RFQ) - MADA
 * Padrão: Industrialização e Integração Distribuída
 */
export type EstrategiaMada = 'SINGLE' | 'ARRAY_SAME' | 'ARRAY_DIFF' | 'SUBSTRATE_ONLY';

export interface OrcamentoRequestDTO {
  /** Nome do projeto (C14) */
  nomeProjeto: string;

  /** Nome da empresa solicitante (C0) */
  nomeEmpresa?: string;

  /** C1 - Quantidade de peças físicas requeridas no pedido */
  quantidadeRequerida: number;

  /** C2 - Aplicação final da peça (ex: Protótipo, Ferramental) */
  aplicacaoPeca: string;

  /** C3 - Requisitos de esforço mecânico (ex: HRC, Tensile) */
  solicitacaoMecanica: string;

  /** C4 - Condições de operação (Corrosão, Temperatura) */
  solicitacaoAmbiental?: string;

  /** C5 - Tolerância dimensional mínima requerida (ex: fine, +/- 0.1) */
  tolerancia?: string;

  /** C6 - Acabamento superficial esperado (ex: as-built, machined) */
  acabamento?: string;

  /** C7 - Critérios para inspeção industrial */
  criteriosAceitacao?: string;

  /** C8 - Normas técnicas aplicáveis (ex: AWS D20.1) */
  normasTecnicas?: string;

  /** C9 - Prazo máximo aceitável para entrega física */
  tempoEntregaC9Dias?: string;

  /** C10 - Impacto financeiro estimado de perda/lucro cessante */
  economiaPerdaLucroC10?: number;

  /** C11 - Envelope X (mm) */
  dimensaoX: number;

  /** C11 - Envelope Y (mm) */
  dimensaoY: number;

  /** C11 - Envelope Z (mm) */
  dimensaoZ: number;

  /** C12 - Link do arquivo 3D (.zip/.step) no storage */
  arquivoUrl?: string;

  /** C13 - Requisitos de ensaios específicos */
  detalhesInspecao?: string;

  /** Identificador do material (arame metálico) selecionado */
  arameId: string;

  /** Indica se requer tratamento térmico pós-deposição */
  tratamentoTermico: boolean;

  /** O15 - Estratégia de arranjo industrial (Fixo 'SINGLE' nesta Etapa) */
  estrategiaO15: 'SINGLE';
}
