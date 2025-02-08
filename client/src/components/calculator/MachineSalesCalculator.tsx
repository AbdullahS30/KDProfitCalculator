import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CalculatorInput } from "@shared/schema";
import { MACHINE_TYPES, COMMISSIONS } from "@shared/schema";

interface Props {
  data: CalculatorInput;
  onChange: (data: CalculatorInput) => void;
}

const MACHINE_COSTS = {
  TRACTOR: 6000,
  THRESHER: 4500,
  HARVESTER: 8000
} as const;

export default function MachineSalesCalculator({ data, onChange }: Props) {
  const handleChange = (field: keyof CalculatorInput) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...data,
      [field]: parseFloat(e.target.value) || 0
    });
  };

  const handleMachineChange = (value: string) => {
    onChange({
      ...data,
      machineType: value
    });
  };

  const getMachineCost = () => {
    const machineType = data.machineType.toUpperCase() as keyof typeof MACHINE_COSTS;
    return MACHINE_COSTS[machineType] || 0;
  };

  const getCommissionRate = () => {
    const machineType = data.machineType.toUpperCase() as keyof typeof COMMISSIONS.MACHINE;
    return COMMISSIONS.MACHINE[machineType] || 0;
  };

  const machineCost = getMachineCost();
  const totalCost = data.landArea * machineCost;
  const commissionRate = getCommissionRate();
  const totalCommission = totalCost * (commissionRate / 100);

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="machineType">Machine Type</Label>
        <Select
          value={data.machineType}
          onValueChange={handleMachineChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select machine" />
          </SelectTrigger>
          <SelectContent>
            {MACHINE_TYPES.map(machine => (
              <SelectItem key={machine} value={machine}>{machine}</SelectItem>
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

      <div className="mt-6 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Cost per Acre: PKR {machineCost.toFixed(2)}
        </div>
        <div className="text-sm text-muted-foreground">
          Total Cost: PKR {totalCost.toFixed(2)}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          Commission Rate: {commissionRate}%
        </div>
        <div className="text-lg font-semibold mt-2">
          Commission: PKR {totalCommission.toFixed(2)}
        </div>
      </div>
    </div>
  );
}