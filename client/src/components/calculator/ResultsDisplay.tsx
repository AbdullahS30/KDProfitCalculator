import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { CalculatorInput } from "@shared/schema";
import { COMMISSIONS } from "@shared/schema";

interface Props {
  data: CalculatorInput;
}

export default function ResultsDisplay({ data }: Props) {
  // Calculate total commission for each category
  const fertilizerCommission = data.fertilizerEntries.reduce((total, entry) => {
    const totalBags = entry.landArea * entry.bagsPerAcre;
    return total + (totalBags * COMMISSIONS.FERTILIZER);
  }, 0);

  const directInputsCommission = data.directInputEntries.reduce((total, entry) => {
    const totalSales = entry.landArea * entry.salesPerAcre;
    const commissionRate = COMMISSIONS.DIRECT_INPUTS[entry.type.toUpperCase().replace(' ', '_') as keyof typeof COMMISSIONS.DIRECT_INPUTS];
    return total + (totalSales * commissionRate / 100);
  }, 0);

  const productCommission = data.productEntries.reduce((total, entry) => {
    const totalSales = entry.quantity * entry.salesValue;
    const commissionRate = COMMISSIONS.PRODUCT[entry.type.toUpperCase().replace(' ', '_') as keyof typeof COMMISSIONS.PRODUCT];
    return total + (totalSales * commissionRate / 100);
  }, 0);

  const cropCommission = data.cropEntries.reduce((total, entry) => {
    const totalYield = entry.landArea * entry.yieldPerAcre;
    const commissionRate = COMMISSIONS.CROP[entry.type.toUpperCase() as keyof typeof COMMISSIONS.CROP];
    return total + (totalYield * entry.pricePerMaund * commissionRate);
  }, 0);

  const machineCommission = data.machineEntries.reduce((total, entry) => {
    const commissionRate = COMMISSIONS.MACHINE[entry.type.toUpperCase().replace(' ', '_') as keyof typeof COMMISSIONS.MACHINE];
    const machineCosts = {
      HARVESTER: 8000,
      THRESHER: 4500,
      TROLLEY: 3000,
      RICE_PLANTER: 5000
    };
    const costPerAcre = machineCosts[entry.type.toUpperCase().replace(' ', '_') as keyof typeof machineCosts] || 0;
    const totalCost = entry.landArea * costPerAcre;
    return total + (totalCost * commissionRate / 100);
  }, 0);

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
        <div className="h-[400px] sm:h-[400px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
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
              />
              <Tooltip
                formatter={(value: number) => [`PKR ${value.toLocaleString()}`, "Commission"]}
                cursor={{ fill: "hsl(var(--muted))" }}
              />
              <Bar 
                dataKey="value"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                fillOpacity={0.9}
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