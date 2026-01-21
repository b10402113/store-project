"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {mounted ? (
        isDark ? (
          <MoonIcon aria-hidden className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <SunIcon aria-hidden className="h-[1.2rem] w-[1.2rem]" />
        )
      ) : (
        <SunIcon aria-hidden className="h-[1.2rem] w-[1.2rem] opacity-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
