"use client";

import useThemeStyles from "@/hooks/useThemeStyles";
import { cn } from "@/lib/utils";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string;
}

export function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  const theme = useThemeStyles();

  return (
    <div
      className={cn("w-full", className)}
      style={
        {
          "--background": "0 0% 100%",
          "--foreground": "240 10% 3.9%",
          "--card": "0 0% 100%",
          "--card-foreground": "240 10% 3.9%",
          "--popover": "0 0% 100%",
          "--popover-foreground": "240 10% 3.9%",
          "--primary": theme.primary,
          "--primary-foreground": "0 0% 98%",
          "--secondary": "240 4.8% 95.9%",
          "--secondary-foreground": "240 5.9% 10%",
          "--muted": "240 4.8% 95.9%",
          "--muted-foreground": "240 3.8% 46.1%",
          "--accent": "240 4.8% 95.9%",
          "--accent-foreground": "240 5.9% 10%",
          "--destructive": "0 84.2% 60.2%",
          "--destructive-foreground": "0 0% 98%",
          "--border": "240 5.9% 90%",
          "--input": "240 5.9% 90%",
          "--ring": "240 10% 3.9%",
          "--chart-1": "12 76% 61%",
          "--chart-2": "173 58% 39%",
          "--chart-3": "197 37% 24%",
          "--chart-4": "43 74% 66%",
          "--chart-5": "27 87% 67%",
          "--radius": "0.5rem",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
