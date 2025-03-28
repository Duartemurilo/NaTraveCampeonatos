"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import { Card, Step, Stepper, StepLabel } from "@mui/material";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import { useCreate } from "src/hooks/request/use-create";
import { useUpdate } from "src/hooks/request/use-update";
import useTabsOrientation from "src/hooks/use-tabs-orientation";
import { useStepController } from "src/hooks/use-step-controller";

import { Form } from "src/components/hook-form";

import { endpoints } from "src/auth/constants";

import { stepFields } from "./constants";
import { StepInfo } from "./components/step-Info";
import { StepDates } from "./components/step-dates";
import { StepFormat } from "./components/step-format";
import {
  ChampionshipSchema,
  normalizeChampionshipData,
  type ChampionshipSchemaType,
  normalizeInitialChampionshipData,
  championshipNewEditFormDefaultValues,
} from "./form-data";

import type { ChampionshipNewEditFormProps } from "./types";

// ----------------------------------------------------------------------
// O formulário opera em dois modos:
// - Criação: navegação sequencial (Voltar/Próximo) e submit no último step.
// - Edição: navegação livre (clicar no step desejado) e sempre exibe os botões "Cancelar" e "Salvar alterações".
// ----------------------------------------------------------------------
export function ChampionshipNewEditForm({ championsShip }: ChampionshipNewEditFormProps) {
  const router = useRouter();
  const isEditing = Boolean(championsShip);
  const orientation = useTabsOrientation();

  const { create, isLoading: isCreating } = useCreate<ChampionshipSchemaType, void>();
  const { update, isLoading: isUpdating } = useUpdate<ChampionshipSchemaType, void>();

  const steps = [
    { label: "Ficha do Campeonato", content: <StepInfo /> },
    { label: "Datas e Localização", content: <StepDates /> },
    { label: "Modelo de Campeonato", content: <StepFormat /> },
  ];

  const stepController = useStepController(steps);

  const initialValues = championsShip ? normalizeInitialChampionshipData(championsShip) : undefined;

  const methods = useForm<ChampionshipSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(ChampionshipSchema),
    defaultValues: championshipNewEditFormDefaultValues,
    values: initialValues,
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = methods;

  const handleCreate = async (data: ChampionshipSchemaType) => {
    const formData = normalizeChampionshipData(data);
    await create({
      formData,
      endpoint: endpoints.championship.create,
      successMessage: "Campeonato criado com sucesso!",
      errorMessage: "Erro ao criar o campeonato.",
      onSuccess: () => router.push(paths.dashboard.championships.cards),
    });
  };

  const handleUpdate = async (data: ChampionshipSchemaType) => {
    const formData = normalizeChampionshipData(data);
    const id = championsShip!.id;

    await update({
      id,
      formData,
      endpoint: endpoints.championship.update,
      successMessage: "Campeonato criado com sucesso!",
      errorMessage: "Erro ao criar o campeonato.",
      onSuccess: () => router.push(paths.dashboard.championships.cards),
    });

    router.push(paths.dashboard.championships.cards);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isEditing) {
        await handleUpdate(data);
      } else {
        await handleCreate(data);
      }
    } catch (err) {
      console.error(err);
    }
  });

  const isLoading = isCreating || isUpdating;

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Card>
            <Box my={3} mx={2}>
              <Stepper
                orientation={orientation}
                activeStep={stepController.activeStep}
                alternativeLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {steps.map((step, index) => (
                  <Step
                    key={step.label}
                    sx={{
                      cursor: isEditing ? "pointer" : "default",
                      "& .MuiStepLabel-root": {
                        cursor: isEditing ? "pointer" : "default",
                      },
                    }}
                    onClick={isEditing ? () => stepController.goToStep(index) : undefined}
                    disabled={false}
                    completed={false}
                  >
                    <StepLabel>{step.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box>{stepController.currentStep.content}</Box>

            <Stack
              sx={{
                mt: 3,
                p: 4,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              {isEditing ? (
                <>
                  <LoadingButton
                    variant="outlined"
                    color="inherit"
                    onClick={() => router.push(paths.dashboard.championships.cards)}
                    loading={isLoading}
                  >
                    Cancelar
                  </LoadingButton>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting || isLoading}
                  >
                    Salvar alterações
                  </LoadingButton>
                </>
              ) : (
                <>
                  {!stepController.isFirstStep ? (
                    <LoadingButton
                      variant="outlined"
                      color="inherit"
                      onClick={stepController.goBack}
                      loading={isLoading}
                    >
                      Voltar
                    </LoadingButton>
                  ) : (
                    <Box />
                  )}

                  {stepController.isLastStep ? (
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting || isLoading}
                    >
                      Criar campeonato
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      variant="contained"
                      loading={isSubmitting || isLoading}
                      onClick={async () => {
                        const fieldsToValidate = stepFields[stepController.activeStep];
                        const isStepValid = await trigger(fieldsToValidate as any);
                        if (isStepValid) {
                          stepController.goNext();
                        }
                      }}
                    >
                      Próximo
                    </LoadingButton>
                  )}
                </>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
