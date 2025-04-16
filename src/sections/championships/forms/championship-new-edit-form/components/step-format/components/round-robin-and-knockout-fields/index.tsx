import { Stack, useTheme, MenuItem, Typography, useMediaQuery } from "@mui/material";

import { Field } from "src/components/hook-form";

import { TEAM_OPTIONS, QUALIFIED_OPTIONS } from "../../../../constants";

export default function RoundRobinAndKnockoutFields() {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack spacing={4}>
      <Stack
        direction={mdDown ? "column" : "row"}
        spacing={2}
        alignItems="center"
        textAlign={mdDown ? "center" : "left"}
      >
        <Typography>Número de times no campeonato:</Typography>
        <Field.Select
          name="formatConfig.numberOfTeams"
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{
            maxWidth: { sm: 80, md: 70, lg: 60 },
            "& .MuiSelect-select": {
              padding: "5px 10px !important",
            },
          }}
        >
          {TEAM_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>
      </Stack>

      <Stack
        direction={mdDown ? "column" : "row"}
        spacing={2}
        alignItems="center"
        textAlign={mdDown ? "center" : "left"}
      >
        <Typography>Número total de times que passam para a 2ª Fase:</Typography>
        <Field.Select
          name="formatConfig.qualifiedToKnockout"
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{
            maxWidth: { sm: 80, md: 70, lg: 60 },
            "& .MuiSelect-select": {
              padding: "5px 10px !important",
            },
          }}
        >
          {QUALIFIED_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>
      </Stack>

      <Stack
        direction={mdDown ? "column" : "row"}
        spacing={2}
        alignItems="center"
        textAlign={mdDown ? "center" : "left"}
      >
        <Field.Checkbox
          name="formatConfig.hasHomeAndAwayRoundRobin"
          sx={{ ml: -1.5 }}
          label={
            <>
              Partidas de <strong>Ida</strong> e <strong>Volta</strong> na Fase de Pontos Corridos
            </>
          }
        />
      </Stack>

      <Stack
        direction={mdDown ? "column" : "row"}
        spacing={2}
        alignItems="center"
        textAlign={mdDown ? "center" : "left"}
      >
        <Field.Checkbox
          name="formatConfig.hasHomeAndAwayKnockout"
          sx={{ ml: -1.5 }}
          label={
            <>
              Partidas de <strong>Ida</strong> e <strong>Volta</strong> na Fase de Mata-Mata
            </>
          }
        />
      </Stack>
    </Stack>
  );
}
