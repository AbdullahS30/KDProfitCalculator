"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface ImageOption {
  id: string;
  label: string;
  image: string;
}

interface ImageSelectorProps {
  options: ImageOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function ImageSelector({ options, value, onChange, className }: ImageSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <ScrollArea className={cn("w-full whitespace-nowrap rounded-md border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="flex w-max space-x-4 p-4">
        {options.map((option) => (
          <Card
            key={option.id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-md transition-all duration-200 hover:scale-105",
              "h-[120px] w-[200px]",
              value === option.id && "ring-2 ring-primary",
              hoveredId === option.id && "scale-105"
            )}
            onClick={() => onChange?.(option.id)}
            onMouseEnter={() => setHoveredId(option.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className="h-full w-full bg-no-repeat bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${option.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-2 left-2 text-sm font-medium text-white">
              {option.label}
            </p>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}