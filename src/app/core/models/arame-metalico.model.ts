export interface ArameMetalicoResponseDTO {
  id: string;
  nome: string;
  fornecedor: string;
  codigoProduto: string;
  precoUnitarioBase: number;
  ligaMetalica: string;
  diametroMm: number;
  densidadeGcm3: number;
  eficiencia: number;
  ativo: boolean;
}
