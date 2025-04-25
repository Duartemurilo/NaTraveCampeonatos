import { Stack, useTheme, Typography, useMediaQuery } from "@mui/material";

import { Field } from "src/components/hook-form";

export default function RoundRobinFields() {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack spacing={3}>
      <Stack
        direction={mdDown ? "column" : "row"}
        spacing={2}
        alignItems="center"
        textAlign={mdDown ? "center" : "left"}
      >
        <Typography>Número de times no campeonato:</Typography>
        <Field.NumberInput name="teamCount" sx={{ maxWidth: 120 }} />
      </Stack>

      <Stack
        direction={mdDown ? "column" : "row"}
        spacing={2}
        alignItems="center"
        textAlign={mdDown ? "center" : "left"}
      >
        <Field.Checkbox
          name="knockoutMatchMode"
          sx={{ ml: -1.5 }}
          label={
            <>
              Partidas de <strong>ida</strong> e <strong>volta</strong>
            </>
          }
        />
      </Stack>
    </Stack>
  );
}
