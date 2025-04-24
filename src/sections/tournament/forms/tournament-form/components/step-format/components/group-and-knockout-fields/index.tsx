"use client";

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
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const numberOfTeams = useWatch({ control, name: "formatConfig.numberOfTeams" });
  const groupOptions = generateGroupOptions(numberOfTeams);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const numberOfTeamsError = (errors.formatConfig as any)?.numberOfTeams;
  const numberOfGroupsError = (errors.formatConfig as any)?.numberOfGroups;
  const qualifiedError = (errors.formatConfig as any)?.qualifiedPerGroup;

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
            <Typography>Número de grupos:</Typography>
            <Field.Select
              name="formatConfig.numberOfGroups"
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
          {numberOfGroupsError && (
            <FormHelperText error sx={{ mt: -2 }}>
              {numberOfGroupsError.message}
            </FormHelperText>
          )}

          <Stack
            direction={mdDown ? "column" : "row"}
            spacing={2}
            alignItems="center"
            textAlign={mdDown ? "center" : "left"}
          >
            <Field.Checkbox
              name="formatConfig.hasHomeAndAwayGroup"
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
            <Typography>Números de times por grupo que passam para a 2ª fase:</Typography>
            <Field.Select
              name="formatConfig.qualifiedPerGroup"
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

          {qualifiedError && (
            <FormHelperText error sx={{ mt: -2 }}>
              {qualifiedError.message}
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
