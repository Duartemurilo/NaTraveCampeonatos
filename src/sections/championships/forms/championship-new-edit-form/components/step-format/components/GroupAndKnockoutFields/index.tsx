import { useWatch, useFormContext } from "react-hook-form";

import { Stack, useTheme, MenuItem, Typography, useMediaQuery } from "@mui/material";

import { Field } from "src/components/hook-form";

import { TEAM_OPTIONS, QUALIFIED_OPTIONS } from "../../../../constants";

// Função para gerar opções de grupos com base no número de times.
// Considera apenas números de grupos a partir de 2 que dividam perfeitamente o total de times.
const generateGroupOptions = (teams: number) => {
  if (!teams) return [];
  const options = [];
  for (let i = 2; i <= teams; i++) {
    if (teams % i === 0) {
      options.push({ label: `${i}`, value: i });
    }
  }
  return options;
};

export default function GroupAndKnockoutFields() {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { control } = useFormContext();

  const numberOfTeams = useWatch({ control, name: "formatConfig.numberOfTeams" });

  const groupOptions = generateGroupOptions(numberOfTeams);

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
        <Typography>Número de grupos:</Typography>
        <Field.Select
          name="formatConfig.numberOfGroups"
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{
            maxWidth: { sm: 80, md: 70, lg: 60 },
            "& .MuiSelect-select": {
              padding: "5px 10px !important",
            },
          }}
        >
          {groupOptions.map((option) => (
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
          name="formatConfig.qualifiedPerGroup"
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
          name="formatConfig.hasHomeAndAwayGroup"
          sx={{ ml: -1.5 }}
          label={
            <>
              Partidas de <strong>Ida</strong> e <strong>Volta</strong> na Fase de Grupos
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
