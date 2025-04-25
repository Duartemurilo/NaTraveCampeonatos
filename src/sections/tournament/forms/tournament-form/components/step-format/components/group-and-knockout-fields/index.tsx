"use client";

import React from "react";
import { useWatch, useFormContext } from "react-hook-form";

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

import type { TournamentFormatSchemaType } from "../../../../types";

const generateGroupOptions = (teams: number) => {
  if (!teams) return [];
  const options: { label: string; value: number }[] = [];
  for (let i = 2; i <= teams; i++) {
    if (teams % i === 0) {
      options.push({ label: `${i}`, value: i });
    }
  }
  return options;
};

export default function GroupAndKnockoutFields() {
  const { control, formState } = useFormContext<TournamentFormatSchemaType>();
  const { errors } = formState;

  const teamCount = useWatch({ control, name: "teamCount" });

  const groupOptions = generateGroupOptions(teamCount);

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const teamCountError = (errors as any).teamCount;
  const groupsError = (errors as any).numberOfGroups;
  const advancingError = (errors as any).teamsAdvancing;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold" textAlign={mdDown ? "center" : "left"}>
            1ª fase (Grupos)
          </Typography>
          <Stack
            direction={mdDown ? "column" : "row"}
            spacing={2}
            alignItems="center"
            textAlign={mdDown ? "center" : "left"}
          >
            <Typography>Número de times:</Typography>
            <Field.Select
              name="teamCount"
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
          {teamCountError && (
            <FormHelperText error sx={{ mt: -2 }}>
              {teamCountError.message}
            </FormHelperText>
          )}
          <Stack
            direction={mdDown ? "column" : "row"}
            spacing={2}
            alignItems="center"
            textAlign={mdDown ? "center" : "left"}
          >
            <Typography>Número de grupos:</Typography>
            <Field.Select
              name="numberOfGroups"
              noShowError
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                maxWidth: { sm: 80, md: 70, lg: 60 },
                "& .MuiSelect-select": { padding: "5px 10px !important" },
              }}
            >
              {groupOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Stack>
          {groupsError && (
            <FormHelperText error sx={{ mt: -2 }}>
              {groupsError.message}
            </FormHelperText>
          )}

          <Stack
            direction={mdDown ? "column" : "row"}
            spacing={2}
            alignItems="center"
            textAlign={mdDown ? "center" : "left"}
          >
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
          <Stack
            direction={mdDown ? "column" : "row"}
            spacing={2}
            alignItems="center"
            textAlign={mdDown ? "center" : "left"}
          >
            <Typography>Times por grupo que passam para a 2ª fase:</Typography>
            <Field.Select
              name="teamsAdvancing"
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

          {advancingError && (
            <FormHelperText error sx={{ mt: -2 }}>
              {advancingError.message}
            </FormHelperText>
          )}

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
      </Grid>
    </Grid>
  );
}
