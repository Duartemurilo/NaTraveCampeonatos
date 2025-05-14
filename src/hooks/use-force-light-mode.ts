"use client";

import { useEffect } from "react";

import { useColorScheme } from "@mui/material/styles";

export function useForceLightMode() {
  const { mode, setMode } = useColorScheme();
  const wasDark = mode === "dark";

  useEffect(() => {
    if (mode !== "light") setMode("light");

    return () => {
      if (wasDark) setMode("dark");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
