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
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col p-6">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ImageSelector
            options={options}
            value={tempValue}
            onChange={setTempValue}
          />
        </div>
        <div className="pt-6 flex justify-end border-t mt-6">
          <Button onClick={handleDone}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}