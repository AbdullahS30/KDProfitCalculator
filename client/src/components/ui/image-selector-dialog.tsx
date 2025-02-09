"use client";

import { Dialog, DialogContent, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ImageOption {
  id: string;
  label: string;
  image: string;
}

interface Props {
  options: ImageOption[];
  value: string;
  onChange: (value: string) => void;
  triggerText: string;
}

export function ImageSelectorDialog({ options, value, onChange, triggerText }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(value);
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = container.clientWidth * 0.6; // 60% of container width
      container.scrollLeft = centerIndex * itemWidth - container.clientWidth / 2 + itemWidth / 2;
    }
  }, [open]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft + container.clientWidth / 2;
      const itemWidth = container.clientWidth * 0.6; // 60% of container width
      const newCenterIndex = Math.round(scrollPosition / itemWidth - 0.5);
      setCenterIndex(newCenterIndex);
    }
  };

  const handleDone = () => {
    onChange(selectedId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          {value ? options.find((opt) => opt.id === value)?.label : triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-8 rounded-xl">
        <ScrollArea className="h-[400px] pr-4">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none items-center px-12"
            onScroll={handleScroll}
            style={{ scrollSnapType: "x mandatory", scrollPadding: "0 20px" }}
          >
            {options.map((option, index) => (
              <div
                key={option.id}
                className="snap-center shrink-0 transition-transform duration-300 ease-in-out flex flex-col items-center"
                style={{
                  minWidth: "60%", // Only one image fully visible at a time
                  scrollSnapAlign: "center",
                }}
              >
                <button
                  onClick={() => setSelectedId(option.id)}
                  className={cn(
                    "flex flex-col items-center gap-3 p-4 rounded-lg transition-all duration-300 ease-in-out",
                    "hover:bg-accent hover:text-accent-foreground",
                    selectedId === option.id && "bg-accent text-accent-foreground",
                    index === centerIndex
                      ? "scale-[1.4] shadow-2xl z-10 transform translate-y-0"
                      : "scale-75 opacity-50 transform translate-y-6"
                  )}
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-36 h-36 sm:w-40 sm:h-40 object-contain rounded-md transition-transform duration-300"
                  />
                  <span
                    className={cn(
                      "text-base sm:text-lg font-medium transition-opacity duration-300",
                      index === centerIndex ? "opacity-100" : "opacity-50"
                    )}
                  >
                    {option.label}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleDone} className="px-6 py-3 text-lg">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
