export interface GasProtecaoResponseDTO {
  id: string;
  nome: string;
  fabricante: string;
  codigoProduto: string;
  precoUnitarioBase: number;
  tipoGas: string;
  vazaoPadrao: number;
  ativo: boolean;
}
