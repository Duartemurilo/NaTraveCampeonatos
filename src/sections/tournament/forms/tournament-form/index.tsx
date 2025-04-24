"use client";

import type { ITournament } from "src/types/tournament";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useRouter } from "src/routes/hooks";

import { MainSection } from "src/layouts/core";

import { Form } from "src/components/hook-form";

import { ContentWrapper } from "./styles";
import { tournamentSteps } from "./step-config";
import { FormActions } from "./components/tournament-form-actions";
import { getRoute, getFormConfigByStep } from "./routes/tournament-routes";
import { TournamentFormSidebar } from "./components/tournament-form-sidebar";
import { useTournamentFormHandler } from "./hooks/use-tournament-form-handler";
import { useValidateTournamentStep } from "./hooks/use-validate-tournament-step";

import type { TournamentStep } from "./types";

export type Props = {
  tournament?: ITournament | null;
  currentStep: TournamentStep;
  tournamentId?: string;
};

export function TournamentForm({ tournament, currentStep, tournamentId }: Props) {
  useValidateTournamentStep(currentStep, tournamentId);
  const router = useRouter();
  const handler = useTournamentFormHandler(router);
  const config = getFormConfigByStep(currentStep, handler, tournament);
  const { schema, defaultValues, stepSubmit } = config;

  const methods = useForm<typeof defaultValues>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = handleSubmit((data) => stepSubmit(data, tournamentId));

  const handleGoBack = () => {
    if (currentStep > 0 && tournamentId) {
      router.push(getRoute(currentStep - 1, tournamentId));
    }

    router.push(getRoute(currentStep - 1, tournamentId));
  };

  const stepConfig = tournamentSteps[currentStep];
  if (!stepConfig) return null;

  const { Component } = stepConfig;

  return (
    <MainSection>
      <Grid container spacing={4} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, md: 12, lg: 3.5, xl: 3 }}>
          <Box height="100%">
            <TournamentFormSidebar steps={tournamentSteps} activeStep={currentStep} />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 8.5, xl: 9 }}>
          <Box height="100%">
            <ContentWrapper>
              <Form methods={methods} onSubmit={onSubmit}>
                <Component />

                <FormActions
                  isLoading={handler.isLoading || isSubmitting}
                  isFirstStep={currentStep === 0}
                  isLastStep={currentStep === tournamentSteps.length - 1}
                  onSubmit={onSubmit}
                  handleGoBack={handleGoBack}
                />
              </Form>
            </ContentWrapper>
          </Box>
        </Grid>
      </Grid>
    </MainSection>
  );
}
