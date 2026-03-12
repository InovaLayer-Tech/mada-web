export interface ArameMetalicoResponseDTO {
  id: string; // UUID
  nome: string;
  fabricante: string;
  codigoProduto: string;
  precoUnitarioBase: number;
  ligaMetalica: string;
  diametroMm: number;
  densidadeGCm3: number;
}
