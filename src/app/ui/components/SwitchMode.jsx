"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@/app/ui/svg/icons";

const SwitchMode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleClick}
        className="relative w-9 h-9 rounded-full flex items-center justify-center bg-black dark:bg-white transition-all duration-300"
      >
        <div
          className={`absolute transition-transform duration-300 ${
            theme === "dark" ? "translate-x-0" : "-translate-x-10 opacity-0"
          }`}
        >
          <SunIcon className="w-6 h-6 text-black" />
        </div>
        <div
          className={`absolute transition-transform duration-300 ${
            theme === "dark" ? "translate-x-10 opacity-0" : "translate-x-0"
          }`}
        >
          <MoonIcon className="w-6 h-6 text-white fill-white dark:fill-black dark:text-black" />
        </div>
      </button>
    </div>
  );
};

export default SwitchMode;
