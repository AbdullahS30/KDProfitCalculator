import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import type { CalculatorInput, DirectInputEntry } from "@shared/schema";
import { COMMISSIONS } from "@shared/schema";
import { v4 as uuidv4 } from 'uuid';
import { ImageSelectorDialog } from "@/components/ui/image-selector-dialog";
import { directInputOptions } from "@/lib/image-options";

interface Props {
  data: CalculatorInput;
  onChange: (data: CalculatorInput) => void;
}

export default function DirectInputsCalculator({ data, onChange }: Props) {
  const addEntry = () => {
    onChange({
      ...data,
      directInputEntries: [
        ...data.directInputEntries,
        {
          id: uuidv4(),
          type: 'Seeds',
          salesPerAcre: 0,
          landArea: 0,
        }
      ]
    });
  };

  const removeEntry = (id: string) => {
    onChange({
      ...data,
      directInputEntries: data.directInputEntries.filter(entry => entry.id !== id)
    });
  };

  const updateEntry = (id: string, field: keyof DirectInputEntry, value: string | number) => {
    onChange({
      ...data,
      directInputEntries: data.directInputEntries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    });
  };

  const calculateCommission = (entry: DirectInputEntry) => {
    const totalSales = entry.landArea * entry.salesPerAcre;
    const commissionRate = COMMISSIONS.DIRECT_INPUTS[entry.type.toUpperCase().replace(' ', '_') as keyof typeof COMMISSIONS.DIRECT_INPUTS];
    return totalSales * (commissionRate / 100);
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Direct Input Entries</h3>
        <Button onClick={addEntry} size="sm" variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Direct Input
        </Button>
      </div>

      <div className="space-y-4">
        {data.directInputEntries.map((entry) => (
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <ImageSelectorDialog
                    options={directInputOptions}
                    value={entry.type}
                    onChange={(value) => updateEntry(entry.id, 'type', value)}
                    triggerText="Select type"
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

                <div className="space-y-2 col-span-2">
                  <Label>Sales Value per Acre (PKR)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={entry.salesPerAcre || ''}
                    onChange={(e) => updateEntry(entry.id, 'salesPerAcre', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Total Sales: PKR {(entry.landArea * entry.salesPerAcre).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Commission Rate: {COMMISSIONS.DIRECT_INPUTS[entry.type.toUpperCase().replace(' ', '_') as keyof typeof COMMISSIONS.DIRECT_INPUTS]}%
                </div>
                <div className="text-lg font-semibold mt-2">
                  Commission: PKR {calculateCommission(entry).toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.directInputEntries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No direct input entries yet. Click the button above to add one.
          </div>
        )}
      </div>
    </div>
  );
}