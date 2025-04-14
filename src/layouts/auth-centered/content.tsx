"use client";

import type { BoxProps } from "@mui/material/Box";

import { mergeClasses } from "minimal-shared/utils";

import Box from "@mui/material/Box";

import { CONFIG } from "src/global-config";

import { layoutClasses } from "../core/classes";

// ----------------------------------------------------------------------

export type AuthCenteredContentProps = BoxProps;

export function AuthCenteredContent({
  sx,
  children,
  className,
  ...other
}: AuthCenteredContentProps) {
  return (
    <Box
      className={mergeClasses([layoutClasses.content, className])}
      sx={[
        (theme) => ({
          py: 5,
          px: 3,
          width: 1,
          zIndex: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          maxWidth: "var(--layout-auth-content-width)",
          bgcolor: theme.vars.palette.background.default,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          width: "calc(100% + 48px)",
          marginLeft: "-24px",
          marginRight: "-24px",
          marginTop: "-40px",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: "inherit",
          borderTopRightRadius: "inherit",
          padding: "30px 0px",
          mb: "var(--spacing-5, 30px)",
        }}
      >
        <img
          alt="Full logo"
          src={`${CONFIG.assetsDir}/logo/white-full-logo.svg`}
          width="100px"
          height="54px"
          style={{ aspectRatio: "50/27" }}
        />
      </Box>

      {children}
    </Box>
  );
}
