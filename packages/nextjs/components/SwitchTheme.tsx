"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = () => {
    if (isDarkMode) {
      setTheme("light");
      return;
    }
    setTheme("dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex space-x-2 md:pr-8 pr-4 h-8 items-center justify-center text-sm ${className}`}>
      <div className="btn btn-secondary btn-sm font-normal gap-0 px-2">
        <input id="theme-toggle" type="checkbox" className="swap" onChange={handleToggle} checked={isDarkMode} />
        <label htmlFor="theme-toggle" className={`swap swap-rotate ${!isDarkMode ? "swap-active" : ""}`}>
          <SunIcon className="swap-on text-neutral h-5 w-5" />
          <MoonIcon className="swap-off text-neutral h-5 w-5" />
        </label>
      </div>
    </div>
  );
};
