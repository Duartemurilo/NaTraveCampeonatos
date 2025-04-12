import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

// ----------------------------------------------------------------------

export function SignInTerms({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="span"
      sx={[
        () => ({
          mt: 3,
          display: "block",
          textAlign: "center",
          typography: "caption",
          color: "text.secondary",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {"Ao se cadastrar, eu concordo com os "}
      <Link underline="always" color="text.primary">
        termos de uso.
      </Link>
    </Box>
  );
}
