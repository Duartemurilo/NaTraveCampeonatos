"use client";

import { mergeClasses } from "minimal-shared/utils";

import { styled } from "@mui/material/styles";

import { layoutClasses } from "../core/classes";

// ----------------------------------------------------------------------

export type MainSectionProps = React.ComponentProps<typeof MainRoot>;

export function MainSection({ children, className, sx, ...other }: MainSectionProps) {
  return (
    <MainRoot className={mergeClasses([layoutClasses.main, className])} sx={sx} {...other}>
      {children}
    </MainRoot>
  );
}

// ----------------------------------------------------------------------

const MainRoot = styled("main")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  height: "100%", // <- ESSENCIAL
  minHeight: 0, // <- PREVINE OVERFLOW
  backgroundColor: theme.palette.primary.dark,
  padding: theme.spacing(1, 2, 1.5, 2.5),
  boxSizing: "border-box",
  overflow: "hidden",

  "& .scrollable-content": {
    flex: 1,
    overflow: "auto",
  },
}));
