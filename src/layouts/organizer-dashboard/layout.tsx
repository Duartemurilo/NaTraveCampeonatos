"use client";

import type { Breakpoint } from "@mui/material/styles";
import type { NavSectionProps } from "src/components/nav-section";

import { merge } from "es-toolkit";
import { UserButton } from "@clerk/nextjs";

import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import { iconButtonClasses } from "@mui/material/IconButton";

import { CONFIG } from "src/global-config";

import { useSettingsContext } from "src/components/settings";

import { layoutClasses } from "./classes";
import { VerticalDivider } from "./content";
import { HeaderSection } from "./header-section";
import { NavHorizontal } from "./nav-horizontal";
import { LayoutSection } from "../core/layout-section";
import { TournamentLabel } from "../components/tournament-label";
import { navData as dashboardNavData } from "../nav-config-dashboard";
import { dashboardLayoutVars, dashboardNavColorVars } from "./css-vars";
import { MainSection, type MainSectionProps } from "../core/main-section";

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

export function DashboardOrganizerLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = "lg",
}: Props) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const navVars = dashboardNavColorVars(theme, settings.state.navColor, settings.state.navLayout);

  const navData = slotProps?.nav?.data ?? dashboardNavData;

  const isNavMini = settings.state.navLayout === "mini";
  const isNavHorizontal = settings.state.navLayout === "horizontal";
  const isNavVertical = isNavMini || settings.state.navLayout === "vertical";

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps["slotProps"] = {
      container: {
        maxWidth: false,
        sx: {
          ...(isNavVertical && { px: { [layoutQuery]: 5 } }),
          ...(isNavHorizontal && {
            bgcolor: "var(--layout-nav-bg)",
            height: { [layoutQuery]: "var(--layout-nav-horizontal-height)" },
            [`& .${iconButtonClasses.root}`]: { color: "var(--layout-nav-text-secondary-color)" },
          }),
        },
      },
    };

    const headerSlots: HeaderSectionProps["slots"] = {
      topArea: (
        <Alert severity="info" sx={{ display: "none", borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      centerArea: null,
      bottomArea: isNavHorizontal ? (
        <NavHorizontal data={navData} layoutQuery={layoutQuery} cssVars={navVars.section} />
      ) : null,
      leftArea: (
        <Box display="flex" gap={1.5} alignItems="center">
          {/* Logo removido no mobile e TournamentLabel exibido no lugar */}
          <Box sx={{ display: { xs: "flex", [layoutQuery]: "none" } }}>
            <TournamentLabel
              name="Novo Campeonato"
              logo={`${CONFIG.assetsDir}/assets/icons/frames/trophy.svg`}
              sx={{ color: "var(--layout-nav-text-primary-color)" }}
            />
          </Box>

          {/* Logo padrão no desktop */}
          <Box sx={{ [theme.breakpoints.down(layoutQuery)]: { display: "none" } }}>
            <img
              alt="Full logo"
              src={`${CONFIG.assetsDir}/logo/white-full-logo.svg`}
              width="75px"
              height="41px"
              style={{ aspectRatio: "75/41" }}
            />
          </Box>

          <VerticalDivider sx={{ [theme.breakpoints.up(layoutQuery)]: { display: "flex" } }} />

          {/* TournamentLabel para desktop */}
          <Box sx={{ display: { xs: "none", [layoutQuery]: "flex" } }}>
            <TournamentLabel
              name="Novo Campeonato"
              logo={`${CONFIG.assetsDir}/assets/icons/frames/trophy.svg`}
              sx={{ color: "var(--layout-nav-text-primary-color)" }}
            />
          </Box>
        </Box>
      ),

      rightArea: (
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, sm: 0.75 } }}>
          <UserButton />
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        disableElevation={isNavVertical}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
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
