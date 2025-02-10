import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";

interface NumberSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function NumberSlider({
  value,
  onChange,
  label,
  min = 0,
  max = 1000,
  step = 1,
  className,
}: NumberSliderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between">
        <Label>{label}</Label>
        <Input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-24 text-right"
        />
      </div>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        max={max}
        min={min}
        step={step}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
} 