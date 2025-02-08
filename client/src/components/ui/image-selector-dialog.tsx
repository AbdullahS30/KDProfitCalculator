"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageSelector } from "@/components/ui/image-selector";
import { Check } from "lucide-react";

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
  const selectedOption = options.find(opt => opt.id === value);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between"
        >
          <span>{value ? selectedOption?.label : triggerText}</span>
          {selectedOption && <Check className="w-4 h-4 ml-2" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="p-6">
          <ImageSelector
            options={options}
            value={value}
            onChange={(newValue) => {
              onChange?.(newValue);
              // Close dialog after selection
              const closeEvent = new CustomEvent('close-dialog');
              window.dispatchEvent(closeEvent);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
