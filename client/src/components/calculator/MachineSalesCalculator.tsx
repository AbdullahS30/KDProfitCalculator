import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import type { CalculatorInput, MachineEntry } from "@shared/schema";
import { COMMISSIONS } from "@shared/schema";
import { v4 as uuidv4 } from 'uuid';
import { ImageSelectorDialog } from "@/components/ui/image-selector-dialog";
import { machineOptions } from "@/lib/image-options";

interface Props {
  data: CalculatorInput;
  onChange: (data: CalculatorInput) => void;
}

const MACHINE_COSTS = {
  HARVESTER: 8000,
  THRESHER: 4500,
  TROLLEY: 3000,
  RICE_PLANTER: 5000
} as const;

export default function MachineSalesCalculator({ data, onChange }: Props) {
  const addEntry = () => {
    onChange({
      ...data,
      machineEntries: [
        ...data.machineEntries,
        {
          id: uuidv4(),
          type: 'Harvester',
          landArea: 0,
        }
      ]
    });
  };

  const removeEntry = (id: string) => {
    onChange({
      ...data,
      machineEntries: data.machineEntries.filter(entry => entry.id !== id)
    });
  };

  const updateEntry = (id: string, field: keyof MachineEntry, value: string | number) => {
    onChange({
      ...data,
      machineEntries: data.machineEntries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    });
  };

  const getMachineCost = (type: string) => {
    return MACHINE_COSTS[type.toUpperCase().replace(' ', '_') as keyof typeof MACHINE_COSTS] || 0;
  };

  const getCommissionRate = (type: string) => {
    return COMMISSIONS.MACHINE[type.toUpperCase().replace(' ', '_') as keyof typeof COMMISSIONS.MACHINE] || 0;
  };

  const calculateCommission = (entry: MachineEntry) => {
    const machineCost = getMachineCost(entry.type);
    const totalCost = entry.landArea * machineCost;
    const commissionRate = getCommissionRate(entry.type);
    return totalCost * (commissionRate / 100);
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Machine Entries</h3>
        <Button onClick={addEntry} size="sm" variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Machine
        </Button>
      </div>

      <div className="space-y-4">
        {data.machineEntries.map((entry) => (
          <Card key={entry.id} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => removeEntry(entry.id)}
            >
              <X className="h-4 w-4" />
            </Button>

            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Machine Type</Label>
                  <ImageSelectorDialog
                    options={machineOptions}
                    value={entry.type}
                    onChange={(value) => updateEntry(entry.id, 'type', value)}
                    triggerText="Select machine"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Land Area (Acres)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={entry.landArea || ''}
                    onChange={(e) => updateEntry(entry.id, 'landArea', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Cost per Acre: PKR {getMachineCost(entry.type).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Cost: PKR {(entry.landArea * getMachineCost(entry.type)).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Commission Rate: {getCommissionRate(entry.type)}%
                </div>
                <div className="text-lg font-semibold mt-2">
                  Commission: PKR {calculateCommission(entry).toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.machineEntries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No machine entries yet. Click the button above to add one.
          </div>
        )}
      </div>
    </div>
  );
}