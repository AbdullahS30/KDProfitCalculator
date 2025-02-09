"use client";

import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import { useState } from "react";

interface ImageOption {
  id: string;
  label: string;
  image: string;
}

interface ImageSelectorDialogProps {
  options: ImageOption[];
  value?: string;
  onChange?: (value?: string) => void;
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
    if (onChange) {
      onChange(tempValue);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>{value ? selectedOption?.label : triggerText}</span>
          {selectedOption && <Check className="w-4 h-4 ml-2" />}
        </Button>
      </DialogTrigger>

      {/* Centered Modal */}
      <DialogContent className="bg-black bg-opacity-90 flex flex-col items-center justify-center p-6 w-[90vw] max-w-4xl h-[90vh]">
        {/* Close Button */}
        <DialogClose className="absolute top-4 right-4">
          <X className="w-6 h-6 text-white cursor-pointer" />
        </DialogClose>

        {/* Scrollable Container */}
        <div className="w-full max-w-full overflow-x-auto">
          <div className="flex space-x-4 py-4 px-2 flex-nowrap">
            {options.map((option) => (
              <div key={option.id} className="flex flex-col items-center min-w-[12rem]">
                <img
                  src={option.image}
                  alt={option.label}
                  className={`w-48 h-48 md:w-64 md:h-64 object-contain rounded-lg transition-transform duration-300 cursor-pointer
                    ${tempValue === option.id ? "border-4 border-blue-500" : "opacity-80 hover:scale-125 hover:opacity-100"}`}
                  onClick={() => setTempValue(tempValue === option.id ? undefined : option.id)}
                />
                <span className="text-white mt-2 text-center text-sm">{option.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Done Button */}
        <Button className="mt-6" onClick={handleDone}>
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}
