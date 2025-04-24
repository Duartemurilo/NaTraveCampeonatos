"use client";

import { useFormContext } from "react-hook-form";

import Grid from "@mui/material/Grid2";
import {
  Stack,
  MenuItem,
  useTheme,
  Typography,
  useMediaQuery,
  FormHelperText,
} from "@mui/material";

import { Field } from "src/components/hook-form";

import { TEAM_OPTIONS, QUALIFIED_OPTIONS } from "../../../../constants";

export default function RoundRobinAndKnockoutFields() {
  const {
    formState: { errors },
  } = useFormContext();

  const numberOfTeamsError = (errors.formatConfig as any)?.numberOfTeams;
  const qualifiedToKnockoutError = (errors.formatConfig as any)?.qualifiedToKnockout;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold" textAlign={mdDown ? "center" : "left"}>
            1ª fase (Pontos Corridos)
          </Typography>

          <Stack
            direction={mdDown ? "column" : "row"}
            spacing={2}
            alignItems="center"
            textAlign={mdDown ? "center" : "left"}
          >
            <Typography>Número de times:</Typography>
            <Field.Select
              name="formatConfig.numberOfTeams"
              noShowError
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                maxWidth: { sm: 80, md: 70, lg: 60 },
                "& .MuiSelect-select": { padding: "5px 10px !important" },
              }}
            >
              {TEAM_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Stack>

          {numberOfTeamsError && (
            <FormHelperText error sx={{ mt: -2 }}>
              {numberOfTeamsError.message}
            </FormHelperText>
          )}

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
                  Partidas de <strong>Ida</strong> e <strong>Volta</strong>
                </>
              }
            />
          </Stack>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold" textAlign={mdDown ? "center" : "left"}>
            2ª fase (Mata-Mata)
          </Typography>

          <Stack
            direction={mdDown ? "column" : "row"}
            spacing={2}
            alignItems="center"
            textAlign={mdDown ? "center" : "left"}
          >
            <Typography>Número total de times que passam para a 2ª fase:</Typography>
            <Field.Select
              name="formatConfig.qualifiedToKnockout"
              noShowError
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                maxWidth: { sm: 80, md: 70, lg: 60 },
                "& .MuiSelect-select": { padding: "5px 10px !important" },
              }}
            >
              {QUALIFIED_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Stack>
          {qualifiedToKnockoutError && (
            <FormHelperText error sx={{ mt: -2 }}>
              {qualifiedToKnockoutError.message}
            </FormHelperText>
          )}

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
                  Partidas de <strong>Ida</strong> e <strong>Volta</strong>
                </>
              }
            />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
