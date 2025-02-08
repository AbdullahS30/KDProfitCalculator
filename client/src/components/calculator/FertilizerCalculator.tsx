import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CalculatorInput } from "@shared/schema";
import { FERTILIZER_TYPES, FERTILIZER_BRANDS, COMMISSIONS } from "@shared/schema";

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

  const handleSelectChange = (field: keyof CalculatorInput) => (value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const totalBags = data.landArea * data.fertilizerBagsPerAcre;
  const totalCommission = totalBags * COMMISSIONS.FERTILIZER;

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
        <Label htmlFor="fertilizerType">Type of Fertilizer</Label>
        <Select
          value={data.fertilizerType}
          onValueChange={handleSelectChange('fertilizerType')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {FERTILIZER_TYPES.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fertilizerBrand">Brand</Label>
        <Select
          value={data.fertilizerBrand}
          onValueChange={handleSelectChange('fertilizerBrand')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {FERTILIZER_BRANDS.map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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

      <div className="mt-6 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Total Bags Required: {totalBags.toFixed(2)}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          Commission Rate: PKR {COMMISSIONS.FERTILIZER} per bag
        </div>
        <div className="text-lg font-semibold mt-2">
          Commission: PKR {totalCommission.toFixed(2)}
        </div>
      </div>
    </div>
  );
}