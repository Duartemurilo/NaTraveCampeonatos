import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";

import { TournamentGeneralInfoCard } from "./components/tournament-general-Info-card";
import { TournamentConfigurationStepsCard } from "./components/tournament-configuration-steps-card";

type Props = {
  tournament: ITournamentDraftFetchResponse;
};

export default function GeneralInformationTab({ tournament }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Stack spacing={3}>
          <TournamentGeneralInfoCard tournament={tournament} />
          <TournamentConfigurationStepsCard tournament={tournament} />
        </Stack>
      </Grid>
    </Grid>
  );
}
