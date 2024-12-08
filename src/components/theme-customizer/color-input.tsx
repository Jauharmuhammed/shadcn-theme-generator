"use client";

import React, { useId, useMemo, useCallback, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Colors } from "@/lib/types";
import { useColorsState } from "@/hooks/useColorsState";

type Props = {
  identifier: keyof Colors;
  label: string;
};

export default function ColorInput({ identifier, label }: Props) {
  const id = useId();
  const [colors, setColors] = useColorsState();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const color = useMemo(() => colors[identifier], [colors, identifier]);

  const debouncedSetColor = useCallback(
    (value: string) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setColors((prevColors) => ({ ...prevColors, [identifier]: value }));
      }, 100);
    },
    [identifier, setColors]
  );

  const handleColorChange = (value: string) => {
    const newColor = value.startsWith("#") ? value : `#${value}`;
    debouncedSetColor(newColor);
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={`${id}-color-input`}>{label}</Label>
      <div className="flex items-center gap-2 relative">
        <Input
          type="text"
          id={`${id}-color-input`}
          value={color.replace("#", "")}
          onChange={(e) => handleColorChange(`#${e.target.value}`)}
          placeholder="Enter color"
          className="w-full ps-8"
        />
        <div className="absolute left-2">
          <label
            htmlFor={`${id}-color-picker`}
            className="size-4 rounded-[2px] block relative border border-gray-200"
            style={{
              backgroundColor: color,
            }}
          />

          <input
            id={`${id}-color-picker`}
            type="color"
            className={cn(
              "size-1 cursor-pointer border-none outline-none opacity-0 absolute"
            )}
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
