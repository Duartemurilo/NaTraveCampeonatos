"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useRouter } from "src/routes/hooks";

import { useGetById } from "src/hooks/request/use-get-by-id";

import { endpoints } from "src/lib/axios";
import { MainSection } from "src/layouts/core";

import { Form } from "src/components/hook-form";
import { LoadingScreen } from "src/components/loading-screen";

import { ContentWrapper } from "./styles";
import { tournamentSteps } from "./step-config";
import { FormActions } from "./components/tournament-form-actions";
import { getRoute, getFormConfigByStep } from "./routes/tournament-routes";
import { TournamentFormSidebar } from "./components/tournament-form-sidebar";
import { useTournamentFormHandler } from "./hooks/use-tournament-form-handler";
import { useValidateTournamentStep } from "./hooks/use-validate-tournament-step";

import type { TournamentStep, TournamentDraftSchemaType, TournamentDatesSchemaType } from "./types";

export type Props = {
  currentStep: TournamentStep;
  tournamentId?: string;
};

export function TournamentForm({ currentStep, tournamentId }: Props) {
  useValidateTournamentStep(currentStep, tournamentId);

  const router = useRouter();
  const handler = useTournamentFormHandler(router);

  const { data: draftData, isLoading: isDraftLoading } = useGetById<TournamentDraftSchemaType>({
    key: ["tournament", "draft", tournamentId],
    endpoint: endpoints.tournament.getById,
    id: tournamentId ?? "",
    enabled: currentStep === 0 && Boolean(tournamentId),
  });

  const { data: datesData, isLoading: isDatesLoading } = useGetById<TournamentDatesSchemaType>({
    key: ["tournament", "dates", tournamentId],
    endpoint: endpoints.tournament.get,
    id: tournamentId ?? "",
    enabled: currentStep === 1 && Boolean(tournamentId),
  });

  const config = getFormConfigByStep(currentStep, handler, {
    draft: draftData,
    dates: datesData,
  });

  const { schema, defaultValues, stepSubmit } = config;

  const methods = useForm<typeof defaultValues>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods]);

  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = handleSubmit((data) => stepSubmit(data, tournamentId));

  const handleGoBack = () => {
    if (currentStep > 0) {
      router.push(getRoute(currentStep - 1, tournamentId));
    }
  };

  const stepConfig = tournamentSteps[currentStep];
  if (!stepConfig) return null;

  const { Component } = stepConfig;

  const isLoadingData =
    ((currentStep === 0 && isDraftLoading) || (currentStep === 1 && isDatesLoading)) &&
    !isSubmitting;

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
            <ContentWrapper isLoading={isLoadingData}>
              <Form methods={methods} onSubmit={onSubmit}>
                {isLoadingData ? <LoadingScreen /> : <Component />}

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
