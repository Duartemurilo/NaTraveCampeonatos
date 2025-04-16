import { Stack, useTheme, Typography, useMediaQuery } from "@mui/material";

import { Field } from "src/components/hook-form";

import { FORMAT_OPTIONS } from "../../constants";
import ChampionshipFormatConfigFields from "./components/championship-format-config-fields";

export function StepFormat() {
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack spacing={isMdOrSmaller ? 5 : 10} sx={{ pt: 0, pl: { xs: 0, lg: 7 } }}>
      <Typography
        variant="h2"
        mt={-2}
        textAlign={{ xs: "center", md: "center", lg: "left" }}
        py={{ xs: 2, md: 0 }}
      >
        Qual é o{" "}
        <Typography component="span" variant="inherit" color="primary">
          formato{" "}
        </Typography>
        campeonato?
      </Typography>

      <Stack
        sx={{
          rowGap: 3,
          columnGap: 2,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)" },
        }}
      >
        <Stack spacing={1.5}>
          <Typography variant="subtitle1" fontWeight="regular">
            Qual é o{" "}
            <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
              formato{" "}
            </Typography>
            do campeonato?
          </Typography>

          <Field.SingleToggleButtonGroup
            name="championshipFormat"
            orientation={isMdOrSmaller ? "vertical" : "horizontal"}
            options={FORMAT_OPTIONS}
          />
        </Stack>
      </Stack>

      <ChampionshipFormatConfigFields />
    </Stack>
  );
}
