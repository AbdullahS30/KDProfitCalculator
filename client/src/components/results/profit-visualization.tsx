import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { CalculatorResults } from "@shared/schema";

type Props = {
  results: CalculatorResults;
};

export default function ProfitVisualization({ results }: Props) {
  const data = [
    {
      name: "Fertilizer",
      commission: results.fertilizer,
      color: "hsl(var(--chart-1))"
    },
    {
      name: "Direct Inputs",
      commission: results.directInputs,
      color: "hsl(var(--chart-2))"
    },
    {
      name: "Products",
      commission: results.products,
      color: "hsl(var(--chart-3))"
    },
    {
      name: "Crop Sales",
      commission: results.cropSales,
      color: "hsl(var(--chart-4))"
    },
    {
      name: "Machine Sales",
      commission: results.machineSales,
      color: "hsl(var(--chart-5))"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
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
                dataKey="commission"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
