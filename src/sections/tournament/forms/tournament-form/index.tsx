"use client";

import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import React from "react";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useRouter } from "src/routes/hooks";

import { useGetById } from "src/hooks/request/use-get-by-id";

import { endpoints } from "src/lib/axios";
import { MainSection } from "src/layouts/core";
import { SWR_KEYS } from "src/constants/swr-keys";

import { LoadingScreen } from "src/components/loading-screen";

import { CardContainer } from "./styles";
import { tournamentSteps } from "./step-config";
import { getRoute } from "./routes/tournament-routes";
import { TournamentFormSidebar } from "./components/form-sidebar";
import { useValidateTournamentStep } from "./hooks/use-validate-tournament-step";

import type { TournamentStep } from "./types";

export type Props = {
  currentStep: TournamentStep;
  tournamentId?: string;
};

export function TournamentForm({ currentStep, tournamentId }: Props) {
  const router = useRouter();

  const getTournament = useGetById<ITournamentDraftFetchResponse>({
    key: [SWR_KEYS.getTournamentDraft, tournamentId],
    endpoint: endpoints.tournament.getDraft,
    id: tournamentId ?? "",
    enabled: Boolean(tournamentId),
    swrConfig: { revalidateOnMount: true },
  });

  const { data: tournament, isLoading: isTournamentLoading } = getTournament;

  useValidateTournamentStep({ currentStep, tournament, isLoading: isTournamentLoading });

  const handleGoBack = () => {
    if (currentStep > 0) {
      router.push(getRoute(currentStep - 1, tournamentId));
    }
  };

  const stepConfig = tournamentSteps[currentStep];
  if (!stepConfig) return null;

  const { Component } = stepConfig;

  return (
    <MainSection>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Box height="100%">
            <CardContainer sx={{ alignItems: "center" }}>
              <TournamentFormSidebar steps={tournamentSteps} activeStep={currentStep} />{" "}
            </CardContainer>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 9 }}>
          <Box height="100%">
            <CardContainer>
              {isTournamentLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LoadingScreen />
                </Box>
              ) : (
                <Box sx={{ pb: 3, pl: { xs: 0, md: 0, lg: 3 } }}>
                  <Component
                    tournament={tournament}
                    onGoBack={handleGoBack}
                    isTournamentLoading={isTournamentLoading}
                  />
                </Box>
              )}
            </CardContainer>
          </Box>
        </Grid>
      </Grid>
    </MainSection>
  );
}
