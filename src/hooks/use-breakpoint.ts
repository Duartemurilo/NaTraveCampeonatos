import type { Breakpoint } from "src/types/page.types";

import { useState, useEffect, useCallback } from "react";

import { useTheme, useMediaQuery } from "@mui/material";

type UseBreakPointReturn = {
  breakpoint: Breakpoint | null;
  isMobile: boolean;
  isTablet: boolean;
};
function useBreakpoint(): UseBreakPointReturn {
  const theme = useTheme();

  const is_xs = useMediaQuery(theme.breakpoints.only("xs"));
  const is_sm = useMediaQuery(theme.breakpoints.only("sm"));
  const is_md = useMediaQuery(theme.breakpoints.only("md"));
  const is_lg = useMediaQuery(theme.breakpoints.only("lg"));
  const is_xl = useMediaQuery(theme.breakpoints.only("xl"));

  const getBreakPointName = useCallback((): Breakpoint | null => {
    switch (true) {
      case is_xs:
        return "xs";
      case is_sm:
        return "sm";
      case is_md:
        return "md";
      case is_lg:
        return "lg";
      case is_xl:
        return "xl";
      default:
        return null;
    }
  }, [is_lg, is_md, is_sm, is_xl, is_xs]);
  const [breakpoint, setBreakpoint] = useState(() => getBreakPointName());

  useEffect(() => {
    setBreakpoint(getBreakPointName());
  }, [is_xs, is_sm, is_md, is_lg, is_xl, getBreakPointName]);

  const isMobile = breakpoint === "xs";
  const isTablet = breakpoint === "sm";
  return {
    breakpoint,
    isMobile,
    isTablet,
  };
}

export default useBreakpoint;
