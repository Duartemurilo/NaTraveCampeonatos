"use client";

import type { ReactElement } from "react";

import { useMemo, useState } from "react";

import { CircularProgress } from "@mui/material";

export type UseLoadingReturn = {
  isLoading: boolean;
  startLoading: () => void;
  endLoading: () => void;
  loadingIcon: ReactElement<unknown, string>;
};

export type UseLoadingProps = {
  loadingIconColor?: "inherit" | "info" | "success" | "warning" | "error" | "primary" | "secondary";
  loadingIconSize?: number;
  initialState?: boolean;
};

const useLoading = (props?: UseLoadingProps): UseLoadingReturn => {
  const {
    loadingIconColor = "secondary",
    loadingIconSize = 20,
    initialState = false,
  } = props || {};

  const [isLoading, setIsLoading] = useState<boolean>(initialState);

  const startLoading = () => {
    setIsLoading(true);
  };

  const endLoading = () => {
    setIsLoading(false);
  };

  const memoizedEndLoading = useMemo(() => endLoading, []);
  const memoizedStartLoading = useMemo(() => startLoading, []);

  const loadingIcon = <CircularProgress color={loadingIconColor} size={loadingIconSize} />;

  return {
    isLoading,
    startLoading: memoizedStartLoading,
    endLoading: memoizedEndLoading,
    loadingIcon,
  };
};

export default useLoading;
