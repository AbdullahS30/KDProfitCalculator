import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import type { CalculatorInput, ProductEntry } from "@shared/schema";
import { COMMISSIONS } from "@shared/schema";
import { v4 as uuidv4 } from 'uuid';
import { ImageSelectorDialog } from "@/components/ui/image-selector-dialog";
import { productOptions } from "@/lib/image-options";

interface Props {
  data: CalculatorInput;
  onChange: (data: CalculatorInput) => void;
}

export default function ProductBasedCalculator({ data, onChange }: Props) {
  const addEntry = () => {
    onChange({
      ...data,
      productEntries: [
        ...data.productEntries,
        {
          id: uuidv4(),
          type: 'Wanda',
          quantity: 0,
          salesValue: 0,
        }
      ]
    });
  };

  const removeEntry = (id: string) => {
    onChange({
      ...data,
      productEntries: data.productEntries.filter(entry => entry.id !== id)
    });
  };

  const updateEntry = (id: string, field: keyof ProductEntry, value: string | number) => {
    onChange({
      ...data,
      productEntries: data.productEntries.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    });
  };

  const calculateCommission = (entry: ProductEntry) => {
    const totalSales = entry.quantity * entry.salesValue;
    const commissionRate = COMMISSIONS.PRODUCT[entry.type.toUpperCase().replace(' ', '_') as keyof typeof COMMISSIONS.PRODUCT];
    return totalSales * (commissionRate / 100);
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Product Entries</h3>
        <Button onClick={addEntry} size="sm" variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="space-y-4">
        {data.productEntries.map((entry) => (
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
                  <Label>Product Type</Label>
                  <ImageSelectorDialog
                    options={productOptions}
                    value={entry.type}
                    onChange={(value) => updateEntry(entry.id, 'type', value)}
                    triggerText="Select product"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="0"
                    value={entry.quantity || ''}
                    onChange={(e) => updateEntry(entry.id, 'quantity', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>Sales Value per Unit (PKR)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={entry.salesValue || ''}
                    onChange={(e) => updateEntry(entry.id, 'salesValue', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Total Sales: PKR {(entry.quantity * entry.salesValue).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Commission Rate: {COMMISSIONS.PRODUCT[entry.type.toUpperCase().replace(' ', '_') as keyof typeof COMMISSIONS.PRODUCT]}%
                </div>
                <div className="text-lg font-semibold mt-2">
                  Commission: PKR {calculateCommission(entry).toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.productEntries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No product entries yet. Click the button above to add one.
          </div>
        )}
      </div>
    </div>
  );
}