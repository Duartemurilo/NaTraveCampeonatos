"use client";

import React, { useEffect } from "react";
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

import {
  getValidGroupCounts,
  getValidAdvancingPerGroupOptions,
} from "src/sections/tournament/new/utils/tournament-utils";

import type { TournamentFormatSchemaType } from "../../../../types";

export default function GroupAndKnockoutFields() {
  const { control, formState, setValue } = useFormContext<TournamentFormatSchemaType>();
  const { errors } = formState;

  const teamCount = useWatch({ control, name: "teamCount" });
  const selectedGroupCount = useWatch({ control, name: "numberOfGroups" });

  useEffect(() => {
    const defaultGroups = 2;
    const isDefaultValid = getValidGroupCounts(teamCount).includes(defaultGroups);
    setValue("numberOfGroups", isDefaultValid ? defaultGroups : null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [teamCount, setValue]);

  useEffect(() => {
    const defaultAdvancing = 2;
    const isDefaultValid = getValidAdvancingPerGroupOptions(teamCount, selectedGroupCount).includes(
      defaultAdvancing
    );
    setValue("teamsAdvancing", isDefaultValid ? defaultAdvancing : null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [selectedGroupCount, teamCount, setValue]);

  const groupOptions = getValidGroupCounts(teamCount);
  const advancingOptions = getValidAdvancingPerGroupOptions(teamCount, selectedGroupCount);

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const teamCountError = (errors as any).teamCount;
  const groupsError = (errors as any).numberOfGroups;
  const advancingError = (errors as any).teamsAdvancing;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 5 }}>
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

            <Field.NumberInput
              name="teamCount"
              step={2}
              min={4}
              max={64}
              readOnly
              sx={{ maxWidth: 120 }}
            />

            {teamCountError && (
              <FormHelperText error sx={{ mt: -2 }}>
                {teamCountError.message}
              </FormHelperText>
            )}
          </Stack>

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
                maxWidth: { xs: 70, sm: 80, md: 70, lg: 60 },
                "& .MuiSelect-select": { padding: "5px 10px !important" },
              }}
            >
              {groupOptions.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Field.Select>

            {groupsError && (
              <FormHelperText error sx={{ mt: -2 }}>
                {groupsError.message}
              </FormHelperText>
            )}
          </Stack>

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
            <Typography>
              Números de times por grupo <br />
              que passam para a 2ª fase:
            </Typography>
            <Field.Select
              name="teamsAdvancing"
              noShowError
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                maxWidth: { xs: 70, sm: 80, md: 70, lg: 60 },
                "& .MuiSelect-select": { padding: "5px 10px !important" },
              }}
            >
              {advancingOptions.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Field.Select>

            {advancingError && (
              <FormHelperText error sx={{ mt: -2 }}>
                {advancingError.message}
              </FormHelperText>
            )}
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
      </Grid>
    </Grid>
  );
}
