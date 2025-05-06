"use client";

import React from "react";
import { useWatch, useFormContext } from "react-hook-form";

import Grid from "@mui/material/Grid2";
import {
  Stack,
  useTheme,
  MenuItem,
  Typography,
  useMediaQuery,
  FormHelperText,
} from "@mui/material";

import { Field } from "src/components/hook-form";

import type { TournamentFormatSchemaType } from "../../../../types";

const POWERS_OF_TWO = [2, 4, 8, 16, 32, 64];

export default function RoundRobinAndKnockoutFields() {
  const { control, formState } = useFormContext<TournamentFormatSchemaType>();
  const { errors } = formState;

  const teamCount = useWatch({ control, name: "teamCount" });

  const validAdvancingOptions = POWERS_OF_TWO.filter(
    (n) => typeof teamCount === "number" && n < teamCount
  );

  const numberOfTeamsError = (errors as any).teamCount;
  const advancingError = (errors as any).teamsAdvancing;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold" textAlign={mdDown ? "center" : "left"}>
            1ª fase (Pontos Corridos)
          </Typography>

          <Stack direction={mdDown ? "column" : "row"} spacing={2} alignItems="center">
            <Typography>Número de times:</Typography>
            <Field.NumberInput name="teamCount" sx={{ maxWidth: 120 }} min={2} max={64} />
          </Stack>

          {numberOfTeamsError && (
            <FormHelperText error sx={{ mt: -2 }}>
              {numberOfTeamsError.message}
            </FormHelperText>
          )}

          <Stack direction={mdDown ? "column" : "row"} spacing={2} alignItems="center">
            <Field.Checkbox
              name="initialPhaseMatchMode"
              sx={{ ml: -1.5 }}
              label={
                <>
                  Partidas de <strong>ida</strong> e <strong>volta</strong>
                </>
              }
            />
          </Stack>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 5 }}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold" textAlign={mdDown ? "center" : "left"}>
            2ª fase (Mata-Mata)
          </Typography>

          <Stack direction={mdDown ? "column" : "row"} spacing={2} alignItems="center">
            <Typography>Número total de times que passam para a 2ª fase:</Typography>
            <Field.Select
              name="teamsAdvancing"
              noShowError
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                maxWidth: 120,
                "& .MuiSelect-select": { padding: "5px 10px !important" },
              }}
            >
              {validAdvancingOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>
          </Stack>

          {advancingError && (
            <FormHelperText error sx={{ mt: -2 }}>
              {advancingError.message}
            </FormHelperText>
          )}

          <Stack direction={mdDown ? "column" : "row"} spacing={2} alignItems="center">
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
      </Grid>
    </Grid>
  );
}
