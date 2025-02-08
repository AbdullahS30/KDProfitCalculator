import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/chart";
import type { CalculatorInput } from "@shared/schema";

interface Props {
  data: CalculatorInput;
}

export default function ResultsDisplay({ data }: Props) {
  // Calculate commissions
  const fertilizerCommission = 
    data.landArea * data.fertilizerBagsPerAcre * data.fertilizerCommissionPerUnit;
  
  const directInputsCommission = 
    data.landArea * data.directInputsSalesPerAcre * (data.directInputsCommissionPercent / 100);
  
  const productCommission = 
    data.productQuantity * data.productSalesValue * (data.productCommissionPercent / 100);
  
  const cropCommission = 
    data.landArea * data.cropYieldPerAcre * data.cropPricePerMaund * (data.cropCommissionPercent / 100);
  
  const machineCommission = 
    data.landArea * data.machineCostPerAcre * (data.machineCommissionPercent / 100);

  const totalCommission = 
    fertilizerCommission + directInputsCommission + productCommission + 
    cropCommission + machineCommission;

  const chartData = [
    {
      name: "Fertilizer",
      value: fertilizerCommission
    },
    {
      name: "Direct Inputs",
      value: directInputsCommission
    },
    {
      name: "Products",
      value: productCommission
    },
    {
      name: "Crop Sales",
      value: cropCommission
    },
    {
      name: "Machine Sales",
      value: machineCommission
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <BarChart
            data={chartData}
            index="name"
            categories={["value"]}
            colors={["chart.1"]}
            valueFormatter={(value) => `PKR ${value.toFixed(2)}`}
            yAxisWidth={100}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Fertilizer Commission:</span>
            <span>PKR {fertilizerCommission.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Direct Inputs Commission:</span>
            <span>PKR {directInputsCommission.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Product Commission:</span>
            <span>PKR {productCommission.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Crop Sales Commission:</span>
            <span>PKR {cropCommission.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Machine Sales Commission:</span>
            <span>PKR {machineCommission.toFixed(2)}</span>
          </div>
          <div className="pt-4 border-t flex justify-between font-bold">
            <span>Total Commission:</span>
            <span>PKR {totalCommission.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
