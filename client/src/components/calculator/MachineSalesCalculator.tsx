import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorInput } from "@shared/schema";

interface Props {
  data: CalculatorInput;
  onChange: (data: CalculatorInput) => void;
}

export default function MachineSalesCalculator({ data, onChange }: Props) {
  const handleChange = (field: keyof CalculatorInput) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...data,
      [field]: parseFloat(e.target.value) || 0
    });
  };

  const totalCost = data.landArea * data.machineCostPerAcre;
  const totalCommission = totalCost * (data.machineCommissionPercent / 100);

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
        <Label htmlFor="costPerAcre">Cost per Acre (PKR)</Label>
        <Input
          id="costPerAcre"
          type="number"
          min="0"
          value={data.machineCostPerAcre || ''}
          onChange={handleChange('machineCostPerAcre')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="commissionPercent">Commission Percentage (%)</Label>
        <Input
          id="commissionPercent"
          type="number"
          min="0"
          max="100"
          value={data.machineCommissionPercent || ''}
          onChange={handleChange('machineCommissionPercent')}
        />
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Total Cost: PKR {totalCost.toFixed(2)}
        </div>
        <div className="text-lg font-semibold mt-2">
          Commission: PKR {totalCommission.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
