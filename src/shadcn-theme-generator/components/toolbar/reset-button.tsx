import React from "react";
import { Button } from "@/components/ui/button";
import { RepeatIcon } from "lucide-react";
import { useSetColors } from "@/shadcn-theme-generator/hooks/useColorsState";
import {
  DARK_DEFAULT_THEME,
  LIGHT_DEFAULT_THEME,
} from "@/shadcn-theme-generator/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  className?: string;
};

const ResetButton = ({ className }: Props) => {
  const setColors = useSetColors();
  const { theme } = useTheme();

  const handleReset = () => {
    setColors((prevColors) => ({
      ...prevColors,
      ...(theme === "dark" ? DARK_DEFAULT_THEME : LIGHT_DEFAULT_THEME),
    }));
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleReset}
            className={cn("rounded-lg", className)}
          >
            <RepeatIcon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reset</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ResetButton;