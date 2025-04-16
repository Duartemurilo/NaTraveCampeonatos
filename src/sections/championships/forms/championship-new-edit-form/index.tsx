"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Box, Divider } from "@mui/material";

import { useRouter, usePathname, useSearchParams } from "src/routes/hooks";

import { MainSection } from "src/layouts/core";

import { Form } from "src/components/hook-form";

import { STEP_PARAM } from "./constants";
import { StepInfo } from "./components/step-info";
import { StepDates } from "./components/step-dates";
import { StepFormat } from "./components/step-format";
import { ChampionshipFormSidebar } from "./components/championship-form-sidebar";
import { ChampionshipFormActions } from "./components/championship-form-actions";
import { getRoute, getStepSchemaAndDefaults } from "./routes/championship-routes";
import { useChampionshipFormHandler } from "./hooks/use-championship-form-handler";

import type {
  Props,
  ChampionshipFormData,
  ChampionshipInfoSchemaType,
  ChampionshipDatesSchemaType,
  ChampionshipFormatSchemaType,
} from "./types";

export function ChampionshipNewEditForm({ championsShip }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const selectedTab = searchParams.get(STEP_PARAM);
  const currentStep = Number(selectedTab) || 0;
  const championshipId = id;
  const handler = useChampionshipFormHandler(router);
  const { isLoading } = handler;
  const steps = [
    { label: "Informações do Campeonato", content: <StepInfo /> },
    { label: "Formato do Campeonato", content: <StepFormat /> },
    { label: "Cidade e Período", content: <StepDates /> },
  ];
  const { schema, defaultValues } = getStepSchemaAndDefaults(currentStep, championsShip);
  const methods = useForm<ChampionshipFormData>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues: defaultValues as ChampionshipFormData,
  });
  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;
  const handleStepSubmit = async (data: ChampionshipFormData) => {
    switch (currentStep) {
      case 0:
        await handler.handleInfoStepSubmit(data as ChampionshipInfoSchemaType, championshipId);
        break;
      case 1:
        await handler.handleFormatStepSubmit(
          data as ChampionshipFormatSchemaType,
          championshipId as string
        );
        break;
      case 2:
        await handler.handleDatesStepSubmit(
          data as ChampionshipDatesSchemaType,
          championshipId as string
        );
        break;
      default:
        throw new Error(`Etapa inválida: ${currentStep}`);
    }
  };
  const onSubmit = handleSubmit(handleStepSubmit);
  const goToStep = (step: number) =>
    router.push(
      `${pathname}?${STEP_PARAM}=${step}${championshipId ? `&id=${championshipId}` : ""}`
    );
  return (
    <MainSection
      sx={(theme) => ({
        [theme.breakpoints.up("lg")]: { flexDirection: "row" },
      })}
    >
      <ChampionshipFormSidebar
        steps={steps}
        activeStep={currentStep}
        onStepChange={(index) => goToStep(index)}
      />
      <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", lg: "flex" } }} />
      <Box
        sx={(theme) => ({
          display: "flex",
          flex: "1 1 auto",
          alignItems: "center",
          flexDirection: "column",
          p: theme.spacing(3, 2, 10, 2),
          [theme.breakpoints.up("lg")]: { p: theme.spacing(10, 2, 10, 2) },
        })}
      >
        <Box
          sx={{
            width: 1,
            display: "flex",
            flexDirection: "column",
            maxWidth: "var(--layout-auth-content-width)",
          }}
        >
          <Form methods={methods} onSubmit={onSubmit}>
            <Box>{steps[currentStep].content}</Box>
            <ChampionshipFormActions
              isSubmitting={isSubmitting}
              isLoading={isLoading}
              currentStep={currentStep}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
              championshipId={championshipId}
              onSubmit={onSubmit}
              onGoBack={() => {
                if (currentStep > 0 && championshipId) {
                  router.push(getRoute(currentStep - 1, championshipId));
                }
              }}
            />
          </Form>
        </Box>
      </Box>
    </MainSection>
  );
}
