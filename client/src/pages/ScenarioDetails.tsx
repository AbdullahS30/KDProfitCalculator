import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/chart";
import type { CalculatorInput } from "@shared/schema";
import { COMMISSIONS } from "@shared/schema";

export default function ScenarioDetails() {
  const [match, params] = useRoute("/scenarios/:id");
  const [data, setData] = useState<CalculatorInput | null>(null);

  useEffect(() => {
    if (!match || !params?.id) return;

    const scenarios = JSON.parse(localStorage.getItem("scenarios") || "[]");
    const scenario = scenarios.find((s: any) => s.id === params.id);

    if (scenario) {
      setData(scenario.data);
    }
  }, [match, params?.id]);

  if (!data) {
    return <p className="text-center text-gray-500">No data found for this scenario.</p>;
  }

  // Commission Calculations
  const fertilizerCommission = data.fertilizerEntries.reduce(
    (total, entry) => total + entry.landArea * entry.bagsPerAcre * COMMISSIONS.FERTILIZER, 0
  );

  const directInputsCommission = data.directInputEntries.reduce((total, entry) => {
    const totalSales = entry.landArea * entry.salesPerAcre;
    const commissionRate = COMMISSIONS.DIRECT_INPUTS[entry.type.toUpperCase().replace(" ", "_") as keyof typeof COMMISSIONS.DIRECT_INPUTS] || 0;
    return total + (totalSales * commissionRate) / 100;
  }, 0);

  const productCommission = data.productEntries.reduce((total, entry) => {
    const totalSales = entry.quantity * entry.salesValue;
    const commissionRate = COMMISSIONS.PRODUCT[entry.type.toUpperCase().replace(" ", "_") as keyof typeof COMMISSIONS.PRODUCT] || 0;
    return total + (totalSales * commissionRate) / 100;
  }, 0);

  const cropCommission = data.cropEntries.reduce((total, entry) => {
    const totalYield = entry.landArea * entry.yieldPerAcre;
    const commissionRate = COMMISSIONS.CROP[entry.type.toUpperCase() as keyof typeof COMMISSIONS.CROP] || 0;
    return total + totalYield * entry.pricePerMaund * commissionRate;
  }, 0);

  const machineCommission = data.machineEntries.reduce((total, entry) => {
    const commissionRate = COMMISSIONS.MACHINE[entry.type.toUpperCase().replace(" ", "_") as keyof typeof COMMISSIONS.MACHINE] || 0;
    const machineCosts: Record<string, number> = {
      HARVESTER: 8000,
      THRESHER: 4500,
      TROLLEY: 3000,
      RICE_PLANTER: 5000,
    };
    const costPerAcre = machineCosts[entry.type.toUpperCase().replace(" ", "_")] || 0;
    return total + (entry.landArea * costPerAcre * commissionRate) / 100;
  }, 0);

  const totalCommission = fertilizerCommission + directInputsCommission + productCommission + cropCommission + machineCommission;

  const chartData = [
    { name: "Fertilizer", value: fertilizerCommission },
    { name: "Direct Inputs", value: directInputsCommission },
    { name: "Products", value: productCommission },
    { name: "Crop Sales", value: cropCommission },
    { name: "Machine Sales", value: machineCommission },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Details</CardTitle>
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
          <div className="flex justify-between"><span>Fertilizer Commission:</span><span>PKR {fertilizerCommission.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Direct Inputs Commission:</span><span>PKR {directInputsCommission.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Product Commission:</span><span>PKR {productCommission.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Crop Sales Commission:</span><span>PKR {cropCommission.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Machine Sales Commission:</span><span>PKR {machineCommission.toFixed(2)}</span></div>
          <div className="pt-4 border-t flex justify-between font-bold">
            <span>Total Commission:</span>
            <span>PKR {totalCommission.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
