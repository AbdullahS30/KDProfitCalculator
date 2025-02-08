import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CalculatorInput } from "@shared/schema";
import { CROP_TYPES, COMMISSIONS } from "@shared/schema";

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

  const handleCropChange = (value: string) => {
    onChange({
      ...data,
      cropType: value
    });
  };

  const getCommissionRate = () => {
    const cropType = data.cropType.toUpperCase() as keyof typeof COMMISSIONS.CROP;
    return COMMISSIONS.CROP[cropType] || 0;
  };

  const totalYield = data.landArea * data.cropYieldPerAcre;
  const commissionRate = getCommissionRate();
  const totalCommission = totalYield * commissionRate;

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="cropType">Crop Type</Label>
        <Select
          value={data.cropType}
          onValueChange={handleCropChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent>
            {CROP_TYPES.map(crop => (
              <SelectItem key={crop} value={crop}>{crop}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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

      <div className="mt-6 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Total Yield: {totalYield.toFixed(2)} Maunds
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          Commission Rate: {(commissionRate * 100).toFixed(2)}%
        </div>
        <div className="text-lg font-semibold mt-2">
          Commission: PKR {totalCommission.toFixed(2)}
        </div>
      </div>
    </div>
  );
}