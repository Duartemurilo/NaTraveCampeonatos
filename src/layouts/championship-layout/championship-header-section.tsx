"use client";

import type { Breakpoint } from "@mui/material/styles";
import type { NavSectionProps } from "src/components/nav-section";
import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import React from "react";
import { merge } from "es-toolkit";
import { UserButton } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useBoolean } from "minimal-shared/hooks";

import { useTheme } from "@mui/material/styles";
import { Box, Alert, Typography } from "@mui/material";
import { iconButtonClasses } from "@mui/material/IconButton";

import { useGetById } from "src/hooks/request/use-get-by-id";

import { endpoints } from "src/lib/axios";
import { CONFIG } from "src/global-config";
import { SWR_KEYS } from "src/constants/swr-keys";

import { useSettingsContext } from "src/components/settings";

import { NavMobile } from "./nav-mobile";
import { VerticalDivider } from "./content";
import { NavHorizontal } from "./nav-horizontal";
import { HeaderSection } from "./header-section";
import { StatusPopover } from "./status-popover";
import { dashboardNavColorVars } from "./css-vars";
import { MenuButton } from "../components/menu-button";
import { navData as dashboardNavData } from "../nav-config-dashboard";

import type { HeaderSectionProps } from "../core/header-section";

type Props = {
  layoutQuery: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavSectionProps["data"];
    };
  };
};

export function ChampionshipHeaderSection({ layoutQuery, slotProps }: Props) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const { id } = useParams<{ id: string }>();

  const getTournament = useGetById<ITournamentDraftFetchResponse>({
    key: [SWR_KEYS.getTournamentDraft, id],
    endpoint: endpoints.tournament.getDraft,
    id: id ?? "",
    enabled: Boolean(id),
    swrConfig: { revalidateOnMount: true },
  });

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const { data: tournament, isLoading: isTournamentLoading, error } = getTournament;

  const isNavMini = settings.state.navLayout === "mini";
  const isNavHorizontal = settings.state.navLayout === "horizontal";
  const isNavVertical = isNavMini || settings.state.navLayout === "vertical";

  const navVars = dashboardNavColorVars(theme, settings.state.navColor, settings.state.navLayout);

  const navData = slotProps?.nav?.data ?? dashboardNavData;

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
    centerArea: (
      <Box sx={{ display: { xs: "flex", [layoutQuery]: "none" } }}>
        {!error && (
          <StatusPopover
            name={tournament?.name ?? "Carregando..."}
            status={tournament?.status ?? "Carregando..."}
            logo={`${CONFIG.assetsDir}/assets/icons/frames/trophy.svg`}
            isLoading={isTournamentLoading}
          />
        )}
      </Box>
    ),
    bottomArea: isNavHorizontal ? (
      <NavHorizontal data={navData} layoutQuery={layoutQuery} cssVars={navVars.section} />
    ) : null,
    leftArea: (
      <Box display="flex" gap={1.5} alignItems="center">
        <MenuButton
          onClick={onOpen}
          sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: "none" } }}
        />
        <NavMobile data={navData} open={open} onClose={onClose} cssVars={navVars.section} />

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
        {!error && (
          <>
            <Box sx={{ display: { xs: "none", [layoutQuery]: "flex" } }}>
              <StatusPopover
                name={tournament?.name ?? "Carregando..."}
                status={tournament?.status ?? "Carregando..."}
                logo={`${CONFIG.assetsDir}/assets/icons/frames/trophy.svg`}
                isLoading={isTournamentLoading}
              />
            </Box>
            <VerticalDivider sx={{ [theme.breakpoints.up(layoutQuery)]: { display: "flex" } }} />
          </>
        )}

        <Box
          sx={{
            display: { xs: "none", [layoutQuery]: "flex", cursor: "pointer", fontWeight: "100" },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Meus Campeonatos
          </Typography>
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
}
