import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import type { CalculatorInput, FertilizerEntry } from "@shared/schema";
import { COMMISSIONS } from "@shared/schema";
import { v4 as uuidv4 } from 'uuid';
import { fertilizerOptions, brandOptions } from "@/lib/image-options"; // Keep brandOptions for now
import { ImageSelectorDialog } from "../ui/image-selector-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NumberSlider } from "@/components/ui/number-slider";

interface Props {
  data: CalculatorInput;
  onChange: (data: CalculatorInput) => void;
}

export default function FertilizerCalculator({ data, onChange }: Props) {
  const addEntry = () => {
    onChange({
      ...data,
      fertilizerEntries: [
        ...data.fertilizerEntries,
        {
          id: uuidv4(),
          type: '',
          brand: '',
          bagsPerAcre: 0,
          landArea: 0,
        }
      ]
    });
  };

  const removeEntry = (id: string) => {
    onChange({
      ...data,
      fertilizerEntries: data.fertilizerEntries.filter(entry => entry.id !== id)
    });
  };

  const updateEntry = (id: string, field: keyof FertilizerEntry, value: string | number) => {
    onChange({
      ...data,
      fertilizerEntries: data.fertilizerEntries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    });
  };

  const calculateCommission = (entry: FertilizerEntry) => {
    const totalBags = entry.landArea * entry.bagsPerAcre;
    return totalBags * COMMISSIONS.FERTILIZER;
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Fertilizer Entries</h3>
        <Button onClick={addEntry} size="sm" variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Fertilizer
        </Button>
      </div>

      <div className="space-y-4">
        {data.fertilizerEntries.map((entry) => (
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
                  <Label>Type of Fertilizer</Label>
                  <Select
                    value={entry.type}
                    onValueChange={(value) => updateEntry(entry.id, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Fertilizer" />
                    </SelectTrigger>
                    <SelectContent>
                      {fertilizerOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Brand</Label>
                  <ImageSelectorDialog
                    options={brandOptions}
                    value={entry.brand}
                    onChange={(value) => updateEntry(entry.id, 'brand', value)}
                    triggerText="Select brand"
                  />
                </div>

                <NumberSlider
                  label="Land Area (Acres)"
                  value={entry.landArea}
                  onChange={(value) => updateEntry(entry.id, 'landArea', value)}
                  min={0}
                  max={1000}
                  step={1}
                />

                <NumberSlider
                  label="Bags per Acre"
                  value={entry.bagsPerAcre}
                  onChange={(value) => updateEntry(entry.id, 'bagsPerAcre', value)}
                  min={0}
                  max={10}
                  step={0.5}
                />
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Total Bags: {(entry.landArea * entry.bagsPerAcre).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Commission Rate: PKR {COMMISSIONS.FERTILIZER} per bag
                </div>
                <div className="text-lg font-semibold mt-2">
                  Commission: PKR {calculateCommission(entry).toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.fertilizerEntries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No fertilizer entries yet. Click the button above to add one.
          </div>
        )}
      </div>
    </div>
  );
}
