/**
 * Model para Gás de Proteção (Classe O13).
 */
export interface GasProtecaoResponseDTO {
  id: string;
  nome: string;
  fornecedor: string;
  codigoProduto: string;
  precoUnitarioBase: number; // O13
  tipoGas: string;           // Descrição da mistura
  ativo: boolean;
}
