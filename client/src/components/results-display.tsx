import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { CalculationResult } from "@/lib/calculate";

interface ResultsDisplayProps {
  results: CalculationResult;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const chartData = [
    { name: "Fertilizer", value: results.fertilizerCommission, fill: "hsl(var(--chart-1))" },
    { name: "Direct Inputs", value: results.directInputsCommission, fill: "hsl(var(--chart-2))" },
    { name: "Products", value: results.productCommission, fill: "hsl(var(--chart-3))" },
    { name: "Crops", value: results.cropCommission, fill: "hsl(var(--chart-4))" },
    { name: "Machines", value: results.machineCommission, fill: "hsl(var(--chart-5))" }
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
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
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
