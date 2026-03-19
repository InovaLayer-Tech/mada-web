export interface OrcamentoRequestDTO {
  id?: string;
  nomeProjeto: string;
  nomeEmpresa: string;
  finalidadePeca?: string;
  arquivoUrl?: string;
  materialDesejadoId: string;
  
  // Envelope Físico
  dimensaoX: number;
  dimensaoY: number;
  dimensaoZ: number;
  quantidade: number;

  // Requisitos Técnicos
  tolerancia?: string;
  acabamento?: string;
  nivelInspecao?: string;
  tratamentoTermico?: boolean;

  // Dados Metrológicos (Motor B2B)
  arameId?: string;
  massaEstimadaKg?: number;
  tempoArcoMinutos?: number;
  tempoMortoMinutos?: number;
  tempoPreparacaoMinutos?: number;
  tempoRemocaoMinutos?: number;
  requerProjetoCAD?: boolean;
  requerUsinagemFinal?: boolean;
  tempoUsinagemMinutos?: number;
}

export interface ServicoAdicionalDTO {
  descricaoServico: string;
  quantidadeHoras: number;
  custoServico: number;
}

export interface OrcamentoResponseDTO {
  id: string;
  status: string;
  dataEmissao: string;

  // Identificação (B2C)
  nomeProjeto: string;
  nomeEmpresa: string;
  finalidadePeca: string;
  arquivoUrl: string;
  materialDesejadoId: string;
  quantidade: number;

  // Envelope Físico (B2C)
  dimensaoX: number;
  dimensaoY: number;
  dimensaoZ: number;
  tolerancia: string;
  acabamento: string;
  nivelInspecao: string;
  tratamentoTermico: boolean;

  // FASE 1: IC
  tempoPreparacaoMinutos: number;
  tempoRemocaoMinutos: number;
  custoSubstratoIC: number;
  custoPreparacaoIC: number;
  custoRemocaoIC: number;
  custoEngenhariaIC: number;
  custoTotalIC: number;

  // FASE 2: DC
  tempoArcoMinutos: number;
  tempoMortoMinutos: number;
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
