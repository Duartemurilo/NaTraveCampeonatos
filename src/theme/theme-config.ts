import type { CommonColors } from "@mui/material/styles/createPalette";

import type { PaletteColorNoChannels } from "./core/palette";
import type { ThemeDirection, ThemeColorScheme, ThemeCssVariables } from "./types";

// ----------------------------------------------------------------------

type ThemeConfig = {
  classesPrefix: string;
  modeStorageKey: string;
  direction: ThemeDirection;
  defaultMode: ThemeColorScheme;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<"primary" | "secondary", string>;
  palette: Record<
    "primary" | "secondary" | "info" | "success" | "warning" | "error",
    PaletteColorNoChannels
  > & {
    common: Pick<CommonColors, "black" | "white">;
    grey: Record<
      "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
      string
    >;
  };
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  direction: "ltr",
  defaultMode: "light",
  modeStorageKey: "theme-mode",
  classesPrefix: "minimal",
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: "MadaniArabic-Bold",
    secondary: "Barlow",
  },
  /** **************************************
   * Palette
   *************************************** */
  palette: {
    primary: {
      lighter: "#FFCBA6",
      light: "#FD9830",
      main: "#E35414",
      dark: "#12100C",
      darker: "#12100C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#B3A6D1",
      light: "#685A8C",
      main: "#00BFA5",
      dark: "#1B5E20",
      darker: "#0F3A14",
      contrastText: "#FFFFFF",
    },
    info: {
      lighter: "#CAFDF5",
      light: "#61F3F3",
      main: "#00BFA5",
      dark: "#006C9C",
      darker: "#003768",
      contrastText: "#8D9297",
    },
    success: {
      lighter: "#D3FCD2",
      light: "#77ED8B",
      main: "#22C55E",
      dark: "#118D57",
      darker: "#065E49",
      contrastText: "#ffffff",
    },
    warning: {
      lighter: "#FFF5CC",
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#B76E00",
      darker: "#7A4100",
      contrastText: "#1C252E",
    },
    error: {
      lighter: "#FFE9D5",
      light: "#FFAC82",
      main: "#FF5630",
      dark: "#B71D18",
      darker: "#7A0916",
      contrastText: "#FFFFFF",
    },
    grey: {
      "50": "#FCFDFD",
      "100": "#F9FAFB",
      "200": "#F4F6F8",
      "300": "#DFE3E8",
      "400": "#C4CDD5",
      "500": "#919EAB",
      "600": "#637381",
      "700": "#454F5B",
      "800": "#1C252E",
      "900": "#141A21",
    },
    common: { black: "#000000", white: "#FFFFFF" },
  },
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: "",
    colorSchemeSelector: "data-color-scheme",
  },
};
