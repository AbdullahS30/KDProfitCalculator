import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorInput } from "@shared/schema";

interface Props {
  data: CalculatorInput;
  onChange: (data: CalculatorInput) => void;
}

export default function ProductBasedCalculator({ data, onChange }: Props) {
  const handleChange = (field: keyof CalculatorInput) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...data,
      [field]: parseFloat(e.target.value) || 0
    });
  };

  const totalSales = data.productQuantity * data.productSalesValue;
  const totalCommission = totalSales * (data.productCommissionPercent / 100);

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min="0"
          value={data.productQuantity || ''}
          onChange={handleChange('productQuantity')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="salesValue">Sales Value per Unit (PKR)</Label>
        <Input
          id="salesValue"
          type="number"
          min="0"
          value={data.productSalesValue || ''}
          onChange={handleChange('productSalesValue')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="commissionPercent">Commission Percentage (%)</Label>
        <Input
          id="commissionPercent"
          type="number"
          min="0"
          max="100"
          value={data.productCommissionPercent || ''}
          onChange={handleChange('productCommissionPercent')}
        />
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Total Sales: PKR {totalSales.toFixed(2)}
        </div>
        <div className="text-lg font-semibold mt-2">
          Commission: PKR {totalCommission.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
