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
      const itemWidth = container.clientWidth * 0.6;
      container.scrollLeft = centerIndex * itemWidth - container.clientWidth / 2 + itemWidth / 2;
    }
  }, [open]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft + container.clientWidth / 2;
      const itemWidth = container.clientWidth * 0.6;
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
      <DialogContent className="sm:max-w-[750px] p-8 rounded-xl">
        <ScrollArea className="h-[450px] pr-4 flex items-center">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none items-center px-12"
            onScroll={handleScroll}
            style={{ scrollSnapType: "x mandatory", scrollPadding: "0 20px" }}
          >
            {options.map((option, index) => (
              <div
                key={option.id}
                className="snap-center shrink-0 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center"
                style={{
                  minWidth: "60%",
                  scrollSnapAlign: "center",
                  height: index === centerIndex ? "280px" : "220px", // Reduced enlargement slightly
                }}
              >
                <button
                  onClick={() => setSelectedId(option.id)}
                  className={cn(
                    "flex flex-col items-center gap-4 p-4 rounded-lg transition-all duration-300 ease-in-out",
                    "hover:bg-accent hover:text-accent-foreground",
                    selectedId === option.id && "bg-accent",
                    index === centerIndex
                      ? "scale-[1.3] shadow-2xl z-10 transform translate-y-0"
                      : "scale-80 opacity-50 transform translate-y-4"
                  )}
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-40 h-40 sm:w-44 sm:h-44 object-contain rounded-md transition-transform duration-300"
                  />
                  <span
                    className={cn(
                      "text-base sm:text-lg font-medium transition-colors duration-300",
                      selectedId === option.id ? "text-white" : "text-[#6832a8]" // Purple before selection
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
