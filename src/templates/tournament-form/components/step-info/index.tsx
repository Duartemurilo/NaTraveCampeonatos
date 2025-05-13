"use client";

import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Stack, useTheme, Typography, useMediaQuery, InputAdornment } from "@mui/material";

import { useRouter } from "src/routes/hooks";

import { GENDER_OPTIONS, MODALITY_OPTIONS } from "src/constants/tournament";

import { Form, Field } from "src/components/hook-form";

import { isStepInfoChanged } from "src/sections/tournament/new/utils/tournament-utils";

import { FormActions } from "../form-actions";
import { getRoute } from "../../routes/tournament-routes";
import { TournamentDraftSchema } from "../../schemas/tournament-draft.schema";
import { tournamentDraftDefaultValues } from "../../defaults/tournament-defaults";
import { useTournamentFormHandler } from "../../hooks/use-tournament-form-handler";

export type Props = {
  tournament: ITournamentDraftFetchResponse | null;
  onGoBack: () => void;
};

export function StepInfo({ tournament, onGoBack }: Props) {
  const router = useRouter();
  const { handleDraftStep, isLoading } = useTournamentFormHandler(router);
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"));
  const tournamentId = tournament?.tournamentId;
  const isEditing = Boolean(tournamentId);

  const methods = useForm({
    mode: "onSubmit",
    resolver: zodResolver(TournamentDraftSchema),
    defaultValues: tournamentDraftDefaultValues,
  });

  const { handleSubmit, formState, reset, getValues } = methods;

  useEffect(() => {
    if (tournament) {
      reset({
        name: tournament.name ?? tournamentDraftDefaultValues.name,
        gender: tournament.gender ?? tournamentDraftDefaultValues.gender,
        modality: tournament.modality ?? tournamentDraftDefaultValues.modality,
      });
    }
  }, [tournament, reset]);

  const onSubmit = handleSubmit(async (data) => {
    // Se já existe rascunho e nada mudou ➜ pula requisição
    if (isEditing && !isStepInfoChanged(getValues(), tournament)) {
      router.push(getRoute(1, tournamentId!.toString()));
      return;
    }
    await handleDraftStep(data, tournamentId);
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={7}>
        <Typography
          variant="h2"
          mt={-2}
          textAlign={{ xs: "center", md: "center", lg: "left" }}
          py={{ xs: 2, md: 0 }}
        >
          <Typography component="span" variant="inherit" color="primary">
            Passo 1 de 3 -{" "}
          </Typography>
          Informações principais
        </Typography>

        <Stack spacing={1.5} sx={{ gridColumn: { sm: "span 4" } }}>
          <Typography variant="subtitle1" fontWeight="regular">
            Qual é o{" "}
            <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
              nome{" "}
            </Typography>
            do seu campeonato?
          </Typography>

          <Field.Text
            name="name"
            placeholder="Nome do Seu Campeonato"
            sx={{ maxWidth: { md: "none", lg: 450 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmojiEventsIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle1" fontWeight="regular">
            <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
              Gênero{" "}
            </Typography>
            dos participantes:
          </Typography>

          <Field.SingleToggleButtonGroup
            name="gender"
            orientation={isMdOrSmaller ? "vertical" : "horizontal"}
            options={GENDER_OPTIONS}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle1" fontWeight="regular">
            Modalidade
            <Typography component="span" variant="inherit" color="dark" fontWeight="bold" />:{" "}
          </Typography>

          <Field.SingleToggleButtonGroup
            name="modality"
            orientation={isMdOrSmaller ? "vertical" : "horizontal"}
            options={MODALITY_OPTIONS}
          />
        </Stack>

        <FormActions
          isFirstStep
          isLoading={isLoading || formState.isSubmitting}
          onSubmit={onSubmit}
          handleGoBack={onGoBack}
          isLastStep={false}
        />
      </Stack>
    </Form>
  );
}
