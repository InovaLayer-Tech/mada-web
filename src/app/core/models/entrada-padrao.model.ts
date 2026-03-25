/**
 * Model para Entradas Padrão (Classe D e R).
 */
export interface EntradaPadrao {
  id?: string;
  moedaSimboloD1: string;
  custoKwhO5: number;
  taxaMaoDeObraMe: number;
  taxaEngenheiroDe: number;
  taxaPlanejamentoPe: number;
  taxaPosProcessamentoPp: number;
  consumoPotenciaO3: number;
  
  // Equipamento
  custoEquipamentoEc: number;
  vidaUtilHorasLc: number;
  valorResidualPrv: number;
  custoManutencaoAnualTmc: number;
  horasTrabalhadasAnoHwy: number;
  
  // Margens e Impostos
  margemLucroPm: number;
  taxaImpostosTr: number;
  
  // Fatores de Risco Metodológicos (Classe R)
  rfMaterialRfo9: number;
  rfGasRfo13: number;
  rfGasSupRfo14: number;
  rfEnergiaRfo5: number;
  rfTempoRftdt: number;
  rfSubstratoRfo10: number;
}
