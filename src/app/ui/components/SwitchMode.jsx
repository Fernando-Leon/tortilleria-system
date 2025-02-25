"use client";

import { Switch } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const SwitchMode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      isSelected={theme === "dark" || resolvedTheme === "dark"}
      onValueChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
};

export default SwitchMode;
