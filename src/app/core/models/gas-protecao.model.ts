export interface GasProtecaoResponseDTO {
    id: string;
    nome: string;
    fabricante: string;
    codigoProduto: string;
    tipoGas: string;
    precoUnitarioBase: number;
    ativo: boolean;
    vazaoPadrao: number;
}
