import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import type { CalculatorInput, CropEntry } from "@shared/schema";
import { COMMISSIONS } from "@shared/schema";
import { v4 as uuidv4 } from 'uuid';
import { ImageSelectorDialog } from "@/components/ui/image-selector-dialog";
import { cropOptions } from "@/lib/image-options";

interface Props {
  data: CalculatorInput;
  onChange: (data: CalculatorInput) => void;
}

export default function CropSalesCalculator({ data, onChange }: Props) {
  const addEntry = () => {
    onChange({
      ...data,
      cropEntries: [
        ...data.cropEntries,
        {
          id: uuidv4(),
          type: 'Wheat',
          yieldPerAcre: 0,
          landArea: 0,
          pricePerMaund: 0,
        }
      ]
    });
  };

  const removeEntry = (id: string) => {
    onChange({
      ...data,
      cropEntries: data.cropEntries.filter(entry => entry.id !== id)
    });
  };

  const updateEntry = (id: string, field: keyof CropEntry, value: string | number) => {
    onChange({
      ...data,
      cropEntries: data.cropEntries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    });
  };

  const calculateCommission = (entry: CropEntry) => {
    const totalYield = entry.landArea * entry.yieldPerAcre;
    const commissionRate = COMMISSIONS.CROP[entry.type.toUpperCase() as keyof typeof COMMISSIONS.CROP];
    return totalYield * entry.pricePerMaund * commissionRate;
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Crop Entries</h3>
        <Button onClick={addEntry} size="sm" variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Crop
        </Button>
      </div>

      <div className="space-y-4">
        {data.cropEntries.map((entry) => (
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
                  <Label>Crop Type</Label>
                  <ImageSelectorDialog
                    options={cropOptions}
                    value={entry.type}
                    onChange={(value) => updateEntry(entry.id, 'type', value)}
                    triggerText="Select crop"
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

                <div className="space-y-2">
                  <Label>Yield per Acre (Maunds)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={entry.yieldPerAcre || ''}
                    onChange={(e) => updateEntry(entry.id, 'yieldPerAcre', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Price per Maund (PKR)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={entry.pricePerMaund || ''}
                    onChange={(e) => updateEntry(entry.id, 'pricePerMaund', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Total Yield: {(entry.landArea * entry.yieldPerAcre).toFixed(2)} Maunds
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Value: PKR {(entry.landArea * entry.yieldPerAcre * entry.pricePerMaund).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Commission Rate: {(COMMISSIONS.CROP[entry.type.toUpperCase() as keyof typeof COMMISSIONS.CROP]).toFixed(2)}%
                </div>
                <div className="text-lg font-semibold mt-2">
                  Commission: PKR {calculateCommission(entry).toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.cropEntries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No crop entries yet. Click the button above to add one.
          </div>
        )}
      </div>
    </div>
  );
}