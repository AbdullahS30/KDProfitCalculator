import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalculatorResults } from "@shared/schema";

type Props = {
  results: CalculatorResults;
};

export default function CommissionBreakdown({ results }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Fertilizer</span>
          <span className="font-medium">PKR {results.fertilizer.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Direct Inputs</span>
          <span className="font-medium">PKR {results.directInputs.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Products</span>
          <span className="font-medium">PKR {results.products.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Crop Sales</span>
          <span className="font-medium">PKR {results.cropSales.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Machine Sales</span>
          <span className="font-medium">PKR {results.machineSales.toLocaleString()}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-bold">
            <span>Total Commission</span>
            <span>PKR {results.total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
