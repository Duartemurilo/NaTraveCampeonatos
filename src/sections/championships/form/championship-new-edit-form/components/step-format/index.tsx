import ErrorIcon from "@mui/icons-material/Error";
import { Box, Stack, Divider, MenuItem, Typography } from "@mui/material";

import { Field } from "src/components/hook-form";

import { FORMAT_OPTIONS, CATEGORY_OPTIONS, GAME_TYPE_OPTIONS } from "../../constants";

export function StepFormat() {
  return (
    <Box>
      <Stack
        spacing={3}
        sx={{
          rowGap: 3,
          p: 3,
          columnGap: 2,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" },
        }}
      >
        <Stack spacing={1.5} sx={{ display: "flex" }}>
          <Typography variant="subtitle2">Gênero*</Typography>
          <Field.SingleCheckboxGroup name="category" row options={CATEGORY_OPTIONS} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Número de equipes*</Typography>
          <Field.Text
            type="number"
            name="numberOfTeams"
            placeholder="Quantas equipes participarão do campeonato?"
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Idade mínima*</Typography>
          <Field.Text
            type="number"
            name="minAge"
            placeholder="Idade mínima para jogar no campeonato"
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Idade máxima*</Typography>
          <Field.Text
            type="number"
            name="maxAge"
            placeholder="Idade máxima para jogar no campeonato"
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Mínimo de jogadores por equipe*</Typography>
          <Field.Text
            type="number"
            name="minPlayersPerTeam"
            placeholder="Número mínimo de jogadores que um time precisa"
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Máximo de jogadores por equipe*</Typography>
          <Field.Text
            type="number"
            name="maxPlayersPerTeam"
            placeholder="Número máximo de jogadores que um time precisa "
          />
        </Stack>

        <Stack spacing={1.5} sx={{ gridColumn: { sm: "span 2" } }}>
          <Typography variant="subtitle2">Tipo de partida*</Typography>
          <Field.Select name="matchType">
            <Divider sx={{ borderStyle: "dashed" }} />
            {GAME_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>

          <Stack direction="row" spacing={1} alignItems="center">
            <ErrorIcon color="warning" fontSize="small" />
            <Typography variant="body2" color="warning.main">
              Esse é o número de jogadores em camo por equipe. Então por exemplo 7x7 seriam 7 contra
              7
            </Typography>
          </Stack>

          <Stack spacing={1.5} sx={{ display: "flex" }}>
            <Typography variant="subtitle2">Formato*</Typography>
            <Field.SingleCheckboxGroup name="tournamentFormat" row options={FORMAT_OPTIONS} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
