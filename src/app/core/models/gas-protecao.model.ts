export interface GasProtecaoResponseDTO {
  id: string;
  nome: string;
  fornecedor: string;
  codigoProduto: string;
  precoUnitarioBase: number;
  tipoGas: string;
  vazaoPadrao: number;
  ativo: boolean;
}
