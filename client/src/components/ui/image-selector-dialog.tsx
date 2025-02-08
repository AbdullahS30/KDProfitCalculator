"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageSelector } from "@/components/ui/image-selector";
import { Check } from "lucide-react";
import { useState } from "react";

interface ImageOption {
  id: string;
  label: string;
  image: string;
}

interface ImageSelectorDialogProps {
  options: ImageOption[];
  value?: string;
  onChange?: (value: string) => void;
  triggerText: string;
}

export function ImageSelectorDialog({
  options,
  value,
  onChange,
  triggerText
}: ImageSelectorDialogProps) {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const selectedOption = options.find(opt => opt.id === value);

  const handleDone = () => {
    if (tempValue && onChange) {
      onChange(tempValue);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between"
        >
          <span>{value ? selectedOption?.label : triggerText}</span>
          {selectedOption && <Check className="w-4 h-4 ml-2" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <div className="space-y-4">
          <ImageSelector
            options={options}
            value={tempValue}
            onChange={setTempValue}
          />
          <div className="flex justify-end">
            <Button onClick={handleDone}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}