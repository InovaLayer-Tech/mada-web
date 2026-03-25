/**
 * Model para Arame Metálico (Classe O9, P5, P8).
 */
export interface ArameMetalicoResponseDTO {
  id: string;
  nome: string;
  fornecedor: string;
  codigoProduto: string;
  precoUnitarioBase: number; // O9
  ligaMetalica: string;
  
  // Parâmetros Físicos MADA
  diametroM: number;         // P8 (metros)
  densidadeKgM3: number;     // P5 (kg/m³)
  eficienciaP6: number;      // P6 (%)
  
  // Parâmetros de Embalagem O
  massaBobinaO1: number;     // O1 (kg)
  perdaBobinaO8: number;     // O8 (%)
  
  ativo: boolean;
}
