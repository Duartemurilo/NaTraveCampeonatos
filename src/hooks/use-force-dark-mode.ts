"use client";

import { useEffect } from "react";

import { useColorScheme } from "@mui/material/styles";

export function useForceDarkMode() {
  const { mode, setMode } = useColorScheme();
  const wasLight = mode === "light";

  useEffect(() => {
    if (mode !== "dark") setMode("dark");

    return () => {
      if (wasLight) setMode("light");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
