import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowLeft, Edit } from "lucide-react";
import type { CalculatorInput } from "@shared/schema";
import { COMMISSIONS } from "@shared/schema";

export default function ScenarioDetails() {
  const [match, params] = useRoute("/scenarios/:id");
  const [, setLocation] = useLocation();
  const [data, setData] = useState<CalculatorInput | null>(null);
  const [scenarioName, setScenarioName] = useState<string>("");

  useEffect(() => {
    if (!match || !params?.id) return;

    const scenarios = JSON.parse(localStorage.getItem("scenarios") || "[]");
    const scenario = scenarios.find((s: any) => s.id === params.id);

    if (scenario) {
      setData(scenario.data);
      setScenarioName(scenario.name);
    }
  }, [match, params?.id]);

  const handleEdit = () => {
    if (!data || !params?.id) return;
    
    // Store the current scenario in sessionStorage for editing
    sessionStorage.setItem("editingScenario", JSON.stringify({
      id: params.id,
      name: scenarioName,
      data: data
    }));
    
    // Navigate to calculator with edit mode
    setLocation("/calculator?mode=edit");
  };

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
    <div className="container px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setLocation("/scenarios")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{scenarioName}</h1>
        </div>
        <Button onClick={handleEdit} className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Scenario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scenario Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] sm:h-[400px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                <XAxis 
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  fontSize={12}
                  tickFormatter={(value) => `PKR ${value.toLocaleString()}`}
                  tickLine={false}
                  axisLine={false}
                  width={50}
                />
                <Tooltip
                  formatter={(value: number) => [`PKR ${value.toLocaleString()}`, "Commission"]}
                  cursor={{ fill: "hsl(var(--muted))" }}
                />
                <Bar 
                  dataKey="value"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`hsl(var(--chart-${index + 1}))`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <span className="text-sm sm:text-base">Fertilizer Commission:</span>
              <span className="font-medium">PKR {fertilizerCommission.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <span className="text-sm sm:text-base">Direct Inputs Commission:</span>
              <span className="font-medium">PKR {directInputsCommission.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <span className="text-sm sm:text-base">Product Commission:</span>
              <span className="font-medium">PKR {productCommission.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <span className="text-sm sm:text-base">Crop Sales Commission:</span>
              <span className="font-medium">PKR {cropCommission.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <span className="text-sm sm:text-base">Machine Sales Commission:</span>
              <span className="font-medium">PKR {machineCommission.toFixed(2)}</span>
            </div>
            <div className="pt-4 border-t flex flex-col sm:flex-row justify-between gap-2 font-bold">
              <span className="text-sm sm:text-base">Total Commission:</span>
              <span>PKR {totalCommission.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
