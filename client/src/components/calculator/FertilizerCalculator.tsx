import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorInput } from "@shared/schema";

interface Props {
  data: CalculatorInput;
  onChange: (data: CalculatorInput) => void;
}

export default function FertilizerCalculator({ data, onChange }: Props) {
  const handleChange = (field: keyof CalculatorInput) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...data,
      [field]: parseFloat(e.target.value) || 0
    });
  };

  const totalBags = data.landArea * data.fertilizerBagsPerAcre;
  const totalCommission = totalBags * data.fertilizerCommissionPerUnit;

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="landArea">Land Area (Acres)</Label>
        <Input
          id="landArea"
          type="number"
          min="0"
          value={data.landArea || ''}
          onChange={handleChange('landArea')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bagsPerAcre">Bags per Acre</Label>
        <Input
          id="bagsPerAcre"
          type="number"
          min="0"
          value={data.fertilizerBagsPerAcre || ''}
          onChange={handleChange('fertilizerBagsPerAcre')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="commissionPerUnit">Commission per Bag (PKR)</Label>
        <Input
          id="commissionPerUnit"
          type="number"
          min="0"
          value={data.fertilizerCommissionPerUnit || ''}
          onChange={handleChange('fertilizerCommissionPerUnit')}
        />
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Total Bags Required: {totalBags.toFixed(2)}
        </div>
        <div className="text-lg font-semibold mt-2">
          Commission: PKR {totalCommission.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
