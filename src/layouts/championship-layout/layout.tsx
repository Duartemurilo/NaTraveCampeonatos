"use client";

import type { Breakpoint } from "@mui/material/styles";
import type { NavSectionProps } from "src/components/nav-section";

import { useTheme } from "@mui/material/styles";

import { useSettingsContext } from "src/components/settings";

import { layoutClasses } from "./classes";
import { LayoutSection } from "../core/layout-section";
import { dashboardLayoutVars, dashboardNavColorVars } from "./css-vars";
import { MainSection, type MainSectionProps } from "../core/main-section";
import { ChampionshipHeaderSection } from "./championship-header-section";

import type { HeaderSectionProps } from "../core/header-section";
import type { LayoutSectionProps } from "../core/layout-section";

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, "sx" | "children" | "cssVars">;

export type Props = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavSectionProps["data"];
    };
    main?: MainSectionProps;
  };
};

export function ChampionshipLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = "lg",
}: Props) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const navVars = dashboardNavColorVars(theme, settings.state.navColor, settings.state.navLayout);

  const isNavMini = settings.state.navLayout === "mini";

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={<ChampionshipHeaderSection layoutQuery={layoutQuery} slotProps={slotProps} />}
      /** **************************************

    
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...dashboardLayoutVars(theme), ...navVars.layout, ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              pl: isNavMini ? "var(--layout-nav-mini-width)" : "var(--layout-nav-vertical-width)",
              transition: theme.transitions.create(["padding-left"], {
                easing: "var(--layout-transition-easing)",
                duration: "var(--layout-transition-duration)",
              }),
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <MainSection {...slotProps?.main}>{children}</MainSection>
    </LayoutSection>
  );
}
