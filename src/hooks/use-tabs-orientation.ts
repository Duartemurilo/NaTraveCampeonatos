import type { TabsOrientation } from "src/types/tab.types";

import { useState, useEffect } from "react";

import breakpoints from "src/theme/core/breakpoints";

const useTabsOrientation = (): TabsOrientation => {
  const [tabsOrientation, setTabsOrientation] = useState<TabsOrientation>("horizontal");

  useEffect(() => {
    function handleTabsOrientation() {
      const isSmallSize = window.innerWidth < breakpoints.values.sm;
      setTabsOrientation(isSmallSize ? "vertical" : "horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);

    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, []);

  return tabsOrientation;
};

export default useTabsOrientation;
