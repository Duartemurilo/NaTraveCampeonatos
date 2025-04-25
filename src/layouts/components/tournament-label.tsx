"use client";

import type { Theme, SxProps } from "@mui/material/styles";

import Box from "@mui/material/Box";

type TournamentLabelProps = {
  name: string;
  logo: string;
  sx?: SxProps<Theme>;
  breakpoint?: string;
};

export function TournamentLabel({ name, logo, sx, breakpoint = "sm" }: TournamentLabelProps) {
  return (
    <Box
      sx={[
        {
          py: 0.5,
          gap: { xs: 0.5, [breakpoint]: 1 },
          display: "inline-flex",
          alignItems: "center",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        component="img"
        alt={name}
        src={logo}
        sx={{ width: 24, height: 24, borderRadius: "50%" }}
      />

      <Box
        component="span"
        sx={{
          typography: "subtitle2",
          display: { xs: "none", [breakpoint]: "inline-flex" },
        }}
      >
        {name}
      </Box>
    </Box>
  );
}
