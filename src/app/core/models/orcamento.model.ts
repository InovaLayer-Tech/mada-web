export interface OrcamentoRequestDTO {
  id?: string;
  clienteId: string;
  nomeProjeto: string;
  descricao?: string;
  finalidadePeca?: string;
  geometriaComplexa?: boolean;
  
  // Envelope Físico
  dimensaoXmm: number;
  dimensaoYmm: number;
  dimensaoZmm: number;
  quantidadeRequerida: number;

  // Requisitos Técnicos
  materialDesejadoId: string;
  toleranciaDesejada?: string;
  acabamentoSuperficial?: string;
  necessitaUsinagem?: boolean;
  necessitaTratamentoTermico?: boolean;

  // Dados calculados (Preenchido pela Engenharia no B2B)
  massaEstimadaKg?: number;
  tempoArcoMinutos?: number;
  tempoSetupMinutos?: number;
  
  status?: string; // PENDENTE, CALCULADO, APROVADO, REJEITADO
}

export interface OrcamentoResponseDTO {
  id: string;
  nomeProjeto: string;
  dataEmissao: string;
  status: string;
  
  // Peça e Material
  nomeArameMetalico: string;
  quantidadeRequerida: number;
  dimensaoXmm: number;
  dimensaoYmm: number;
  dimensaoZmm: number;
  
  // Dados Técnicos (Resultados do Cálculo)
  massaEstimadaKg: number;
  tempoArcoMinutos: number;

  // Custos IC
  custoTotalIC: number;
  custoSubstratoIC: number;
  custoPreparacaoIC: number;
  custoRemocaoIC: number;

  // Custos DC
  custoTotalDC: number;
  custoMaterialDC: number;
  custoGasDC: number;
  custoEnergiaDC: number;
  custoMaquinaDC: number;

  // Custos AC
  custoTotalAC: number;
  servicosAC: number;

  // Final
  margemComercialAplicada: number;
  custoDiretoFabricacao: number;
  precoFinalSugerido: number;
}
