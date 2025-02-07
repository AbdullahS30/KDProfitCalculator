export interface CalculationResult {
  fertilizerCommission: number;
  directInputsCommission: number;
  productCommission: number;
  cropCommission: number;
  machineCommission: number;
  totalCommission: number;
}

export function calculateCommissions(values: Record<string, number>): CalculationResult {
  const fertilizerCommission = 
    values.landArea * values.fertilizerPerAcre * values.fertilizerCommission;

  const directInputsCommission = 
    values.landArea * values.directInputsSales * (values.directInputsCommission / 100);

  const productCommission = 
    values.productQuantity * values.productValue * (values.productCommission / 100);

  const cropCommission = 
    values.landArea * values.cropYieldPerAcre * values.cropPricePerMaund * 
    (values.cropCommission / 100);

  const machineCommission = 
    values.landArea * values.machineCostPerAcre * (values.machineCommission / 100);

  const totalCommission = 
    fertilizerCommission + 
    directInputsCommission + 
    productCommission + 
    cropCommission + 
    machineCommission;

  return {
    fertilizerCommission,
    directInputsCommission,
    productCommission,
    cropCommission,
    machineCommission,
    totalCommission
  };
}
