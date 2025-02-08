import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorInput } from "@shared/schema";

interface Props {
  data: CalculatorInput;
  onChange: (data: CalculatorInput) => void;
}

export default function CropSalesCalculator({ data, onChange }: Props) {
  const handleChange = (field: keyof CalculatorInput) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...data,
      [field]: parseFloat(e.target.value) || 0
    });
  };

  const totalYield = data.landArea * data.cropYieldPerAcre;
  const totalValue = totalYield * data.cropPricePerMaund;
  const totalCommission = totalValue * (data.cropCommissionPercent / 100);

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
        <Label htmlFor="yieldPerAcre">Yield per Acre (Maunds)</Label>
        <Input
          id="yieldPerAcre"
          type="number"
          min="0"
          value={data.cropYieldPerAcre || ''}
          onChange={handleChange('cropYieldPerAcre')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pricePerMaund">Price per Maund (PKR)</Label>
        <Input
          id="pricePerMaund"
          type="number"
          min="0"
          value={data.cropPricePerMaund || ''}
          onChange={handleChange('cropPricePerMaund')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="commissionPercent">Commission Percentage (%)</Label>
        <Input
          id="commissionPercent"
          type="number"
          min="0"
          max="100"
          value={data.cropCommissionPercent || ''}
          onChange={handleChange('cropCommissionPercent')}
        />
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Total Yield: {totalYield.toFixed(2)} Maunds
        </div>
        <div className="text-sm text-muted-foreground">
          Total Value: PKR {totalValue.toFixed(2)}
        </div>
        <div className="text-lg font-semibold mt-2">
          Commission: PKR {totalCommission.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
