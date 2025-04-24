"use client";

import type { Theme, SxProps } from "@mui/material/styles";
import type { ButtonBaseProps } from "@mui/material/ButtonBase";

import { useState, useCallback } from "react";
import { usePopover } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ButtonBase from "@mui/material/ButtonBase";

import { Iconify } from "src/components/iconify";
import { CustomPopover } from "src/components/custom-popover";

// ----------------------------------------------------------------------

export type TournamentPopoverProps = ButtonBaseProps & {
  data?: {
    id: string;
    name: string;
    logo: string;
  }[];
};

export function TournamentPopover({ data = [], sx, ...other }: TournamentPopoverProps) {
  const mediaQuery = "sm";

  const { open, anchorEl, onClose, onOpen } = usePopover();

  const [selectedTournament, setSelectedTournament] = useState(data[0]);

  const handleChangeTournament = useCallback(
    (newTournament: (typeof data)[0]) => {
      setSelectedTournament(newTournament);
      onClose();
    },
    [onClose]
  );

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

  const renderButton = () => (
    <ButtonBase
      disableRipple
      onClick={onOpen}
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
      <Box
        component="img"
        alt={selectedTournament?.name}
        src={selectedTournament?.logo}
        sx={{ width: 24, height: 24, borderRadius: "50%" }}
      />

      <Box
        component="span"
        sx={{ typography: "subtitle2", display: { xs: "none", [mediaQuery]: "inline-flex" } }}
      >
        {selectedTournament?.name}
      </Box>

      <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: "text.disabled" }} />
    </ButtonBase>
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
        {data.map((tournament) => (
          <MenuItem
            key={tournament.id}
            selected={tournament.id === selectedTournament?.id}
            onClick={() => handleChangeTournament(tournament)}
            sx={{ height: 48 }}
          >
            <Avatar alt={tournament.name} src={tournament.logo} sx={{ width: 24, height: 24 }} />

            <Box component="span" sx={{ flexGrow: 1, fontWeight: "fontWeightMedium" }}>
              {tournament.name}
            </Box>
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      {renderButton()}
      {renderMenuList()}
    </>
  );
}
