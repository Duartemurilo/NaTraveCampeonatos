import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useFormattedTournament } from "src/hooks/formatted/use-formatted-tournament";

import { Label } from "src/components/label";
import { Iconify } from "src/components/iconify";

type Props = {
  tournament: ITournamentDraftFetchResponse;
};

export function TournamentGeneralInfoCard({ tournament }: Props) {
  const formatted = useFormattedTournament(tournament);
  const theme = useTheme();

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          px: 3,
          pt: 2,
          gap: { xs: 1, sm: 2 },
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ textAlign: { xs: "left", sm: "inherit" } }}
        >
          {tournament.name}
        </Typography>

        <Label color={formatted.statusDisplay.color} sx={{ ...formatted.statusDisplay.sx }}>
          {formatted.statusDisplay.label}
        </Label>
      </Box>

      <Stack spacing={1} sx={{ p: 3, pt: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            color: "text.secondary",
            typography: "button",
            fontWeight: "regular",
          }}
        >
          <Box>
            <strong>Início em:</strong> {formatted.formattedInitialDate}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "inline" }, px: 1 }}>|</Box>
          <Box>
            <strong>Término em:</strong> {formatted.formattedEndDate}
          </Box>
        </Box>

        <Typography variant="body2" color="text.primary">
          {formatted.genderLabel} &nbsp;|&nbsp; {formatted.modalityLabel} &nbsp;|&nbsp;{" "}
          {formatted.formatLabel}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Iconify
            icon="solar:users-group-rounded-bold"
            width={18}
            color={theme.palette.warning.main}
          />
          <Typography variant="body2" color="warning.main">
            Times inscritos: 00/15
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
