import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { CalculationResult } from "@/lib/calculate";

interface ResultsDisplayProps {
  results: CalculationResult;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const chartData = [
    { name: "Fertilizer", value: results.fertilizerCommission },
    { name: "Direct Inputs", value: results.directInputsCommission },
    { name: "Products", value: results.productCommission },
    { name: "Crops", value: results.cropCommission },
    { name: "Machines", value: results.machineCommission }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Commission: PKR {results.totalCommission.toLocaleString()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {chartData.map((item) => (
          <Card key={item.name}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                PKR {item.value.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
