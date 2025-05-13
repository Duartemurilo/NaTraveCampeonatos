import { Stack, useTheme, MenuItem, Typography, useMediaQuery } from "@mui/material";

import { TEAM_OPTIONS } from "src/constants/tournament";

import { Field } from "src/components/hook-form";

export default function KnockoutFields() {
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
        <Field.Select
          name="teamCount"
          noShowError
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{
            maxWidth: { xs: 70, sm: 80, md: 70, lg: 60 },
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
