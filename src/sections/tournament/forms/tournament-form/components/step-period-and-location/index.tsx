"use client";

import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import { useRef, useMemo, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, Controller } from "react-hook-form";

import { Stack, useTheme, Typography, useMediaQuery } from "@mui/material";

import { useRouter } from "src/routes/hooks";

import { useCities, useStates } from "src/hooks/brazil-addresses";

import { Form, Field } from "src/components/hook-form";

import { FormActions } from "../form-actions";
import { getRoute } from "../../routes/tournament-routes";
import { isStepPeriodAndLocationChanged } from "../../utils/is-step-changed";
import { tournamentDatesDefaultValues } from "../../defaults/tournament-defaults";
import { useTournamentFormHandler } from "../../hooks/use-tournament-form-handler";
import { TournamentPeriodAndLocationSchema } from "../../schemas/tournament-period-and-location.schema";

export type Props = {
  tournament: ITournamentDraftFetchResponse | null;
  onGoBack: () => void;
  isTournamentLoading: boolean;
};

export function StepPeriodAndLocation({ tournament, onGoBack, isTournamentLoading }: Props) {
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const tournamentId = tournament?.tournamentId;
  const isEditing = Boolean(tournamentId);

  const { handlePeriodAndLocationStepSubmit, isLoading } = useTournamentFormHandler(router);

  const methods = useForm({
    mode: "onSubmit",
    resolver: zodResolver(TournamentPeriodAndLocationSchema),
    defaultValues: {
      city: tournament?.city ?? tournamentDatesDefaultValues.city,
      state: tournament?.state ?? tournamentDatesDefaultValues.state,
      initialDate: tournament?.initialDate ?? tournamentDatesDefaultValues.initialDate,
      endDate: tournament?.endDate ?? tournamentDatesDefaultValues.endDate,
      tournamentId: tournament?.tournamentId ?? undefined,
    },
  });

  const { handleSubmit, formState, control, setValue, getValues } = methods;
  const selectedState = useWatch({ control, name: "state" });
  const prevStateRef = useRef<string | undefined>();

  const { states, isLoading: statesLoading } = useStates();
  const { cities, isLoading: citiesLoading } = useCities(selectedState);

  const sortedCities = useMemo(
    () => [...cities].sort((a, b) => a.label.localeCompare(b.label, "pt-BR")),
    [cities]
  );

  const isLoadingStep = statesLoading || citiesLoading || isTournamentLoading;

  useEffect(() => {
    if (prevStateRef.current === undefined) {
      prevStateRef.current = selectedState;
      return;
    }

    if (selectedState !== prevStateRef.current) {
      prevStateRef.current = selectedState;

      if (formState.dirtyFields.state) {
        setValue("city", "", { shouldValidate: true });
      }
    }
  }, [selectedState, formState.dirtyFields.state, setValue]);

  useEffect(() => {
    if (isLoadingStep || citiesLoading) return;

    const currentCity = getValues("city");
    const isValidCity = cities.some((c) => c.value === currentCity);

    if (!isValidCity && currentCity) {
      setValue("city", "", { shouldValidate: true });
    }
  }, [selectedState, cities, getValues, setValue, isLoadingStep, citiesLoading]);

  const onSubmit = handleSubmit(async (data) => {
    if (isEditing && !isStepPeriodAndLocationChanged(getValues(), tournament)) {
      router.push(getRoute(2, tournamentId!.toString()));
      return;
    }
    await handlePeriodAndLocationStepSubmit(data, tournamentId!);
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={isMdOrSmaller ? 5 : 10}>
        <Typography
          variant="h2"
          mt={-2}
          textAlign={{ xs: "center", md: "center", lg: "left" }}
          py={{ xs: 2, md: 0 }}
        >
          <Typography component="span" variant="inherit" color="primary">
            Passo 2 de 3{" "}
          </Typography>
          - Cidade e Período{" "}
        </Typography>

        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight="regular">
            <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
              Onde{" "}
            </Typography>
            serão realizados os jogos?
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Stack spacing={1.5} sx={{ flex: 1, maxWidth: { xs: "100%", md: "25%" } }}>
              <Controller
                name="state"
                render={({ field }) => (
                  <Field.Autocomplete
                    {...field}
                    value={states.find((option) => option.value === field.value) || null}
                    onChange={(_, newValue) => field.onChange(newValue?.value)}
                    options={states}
                    getOptionLabel={(option) => option.label}
                    disabled={isLoadingStep}
                    noOptionsText={
                      statesLoading ? "Carregando estados..." : "Nenhum estado encontrado"
                    }
                  />
                )}
              />
            </Stack>

            <Stack spacing={1.5} sx={{ flex: 2, maxWidth: { xs: "100%", md: "100%", lg: "35%" } }}>
              <Controller
                name="city"
                render={({ field }) => (
                  <Field.Autocomplete
                    {...field}
                    value={cities.find((option) => option.value === field.value) || null}
                    onChange={(_, newValue) => field.onChange(newValue?.value)}
                    options={sortedCities}
                    getOptionLabel={(option) => option.label}
                    noOptionsText={
                      citiesLoading ? "Carregando cidades..." : "Nenhuma cidade encontrada"
                    }
                    disabled={isLoadingStep}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight="regular">
            Qual será o{" "}
            <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
              período{" "}
            </Typography>
            do campeonato?
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Stack spacing={1.5} sx={{ flex: 1, maxWidth: { xs: "100%", md: "100%", lg: "20%" } }}>
              <Field.DatePicker name="initialDate" />
            </Stack>

            <Stack spacing={1.5} sx={{ flex: 1, maxWidth: { xs: "100%", md: "100%", lg: "20%" } }}>
              <Field.DatePicker name="endDate" />
            </Stack>
          </Stack>
        </Stack>

        <FormActions
          isLoading={isLoading || formState.isSubmitting}
          onSubmit={onSubmit}
          handleGoBack={onGoBack}
          isFirstStep={false}
          isLastStep={false}
        />
      </Stack>
    </Form>
  );
}
