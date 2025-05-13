"use client";

import type { Theme, SxProps } from "@mui/material/styles";
import type { ButtonBaseProps } from "@mui/material/ButtonBase";
import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import { usePopover } from "minimal-shared/hooks";
import { useState, useEffect, useCallback } from "react";
import { TournamentStatus } from "@natrave/tournaments-service-types";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { Avatar, MenuItem, MenuList, Skeleton } from "@mui/material";

import { useGet } from "src/hooks/request/use-get";

import { endpoints } from "src/lib/axios";
import { SWR_KEYS } from "src/constants/swr-keys";

import { Label } from "src/components/label";
import { Iconify } from "src/components/iconify";
import { CustomPopover } from "src/components/custom-popover";

import { getTournamentStatusDisplay } from "./helper";

// ----------------------------------------------------------------------

export type StatusPopoverProps = ButtonBaseProps & {
  name: string;
  logo: string;
  status: TournamentStatus;
  isLoading?: boolean;
};

export function StatusPopover({ name, logo, status, isLoading, sx, ...other }: StatusPopoverProps) {
  const mediaQuery = "sm";
  const { open, anchorEl, onClose, onOpen } = usePopover();

  const { data, isLoading: isLoadingMyTournaments } = useGet<ITournamentDraftFetchResponse[]>({
    key: [SWR_KEYS.getTournamentDraft],
    endpoint: endpoints.tournament.myTournaments,
    swrConfig: { revalidateOnMount: true },
  });

  const [myTournaments, setMyTournaments] = useState<ITournamentDraftFetchResponse | null>(null);

  useEffect(() => {
    if (data?.[0]) {
      setMyTournaments(data[0]);
    }
  }, [data]);

  const buttonBg: SxProps<Theme> = {
    height: 1,
    zIndex: -1,
    opacity: 0,
    content: "''",
    borderRadius: 1,
    position: "absolute",
    visibility: "hidden",
    bgcolor: "action.hover",
    width: "calc(100% + 8px)",
    transition: (theme) =>
      theme.transitions.create(["opacity", "visibility"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
    ...(open && {
      opacity: 1,
      visibility: "visible",
    }),
  };

  const statusInfo = getTournamentStatusDisplay(status);

  const handleChangeTournaments = useCallback(
    (newValue: ITournamentDraftFetchResponse) => {
      setMyTournaments(newValue);
      onClose();
    },
    [onClose]
  );

  const renderMenuList = () => (
    <CustomPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      slotProps={{
        arrow: { placement: "top-left" },
        paper: { sx: { mt: 0.5, ml: -1.55 } },
      }}
    >
      <MenuList sx={{ width: 240 }}>
        {isLoadingMyTournaments
          ? Array.from({ length: 3 }).map((_, i) => (
              <MenuItem key={i} sx={{ height: 48, gap: 1 }}>
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton width="100%" height={20} />
                <Skeleton width={60} height={22} />
              </MenuItem>
            ))
          : data?.map((option) => (
              <MenuItem
                key={option.tournamentId}
                selected={option.tournamentId === myTournaments?.tournamentId}
                onClick={() => handleChangeTournaments(option)}
                sx={{ height: 48 }}
              >
                <Avatar alt={option.name} src="" sx={{ width: 24, height: 24 }} />

                <Box component="span" sx={{ flexGrow: 1, fontWeight: "fontWeightMedium" }}>
                  {option.name}
                </Box>

                <Label color={option.status === TournamentStatus.PUBLISHED ? "success" : "error"}>
                  {getTournamentStatusDisplay(option.status).label}
                </Label>
              </MenuItem>
            ))}
      </MenuList>
    </CustomPopover>
  );

  const renderButton = () => {
    if (isLoading) {
      return (
        <ButtonBase
          disabled
          sx={[
            {
              py: 0.5,
              gap: { xs: 0.5, [mediaQuery]: 1 },
              "&::before": buttonBg,
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          {...other}
        >
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton width={70} height={20} />
          <Skeleton width={50} height={20} />
          <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: "text.disabled" }} />
        </ButtonBase>
      );
    }

    return (
      <ButtonBase
        disableRipple
        onClick={onOpen}
        disableTouchRipple
        sx={[
          {
            py: 0.5,
            gap: { xs: 0.5, [mediaQuery]: 1 },
            "&::before": buttonBg,
            cursor: "name",
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Box
          component="img"
          alt={name}
          src={logo}
          sx={{ width: 20, height: 20, borderRadius: "50%" }}
        />

        <Box
          component="span"
          sx={{
            typography: "subtitle2",
            maxWidth: { xs: 120, [mediaQuery]: "none" },
            overflow: "hidden",
            whiteSpace: "nowrap",
            nameOverflow: "ellipsis",
            display: "inline-block",
          }}
        >
          {name}
        </Box>

        <Label
          color={statusInfo.color}
          sx={{
            height: 22,
            cursor: "inherit",
            display: { xs: "none", [mediaQuery]: "inline-flex" },
            ...statusInfo.sx,
          }}
        >
          {statusInfo.label}
        </Label>
        <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: "text.disabled" }} />
      </ButtonBase>
    );
  };

  return (
    <>
      {renderButton()}
      {renderMenuList()}
    </>
  );
}
