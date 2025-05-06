"use client";

import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, Controller } from "react-hook-form";

import { Stack, useTheme, Typography, useMediaQuery } from "@mui/material";

import { useRouter } from "src/routes/hooks";

import { useCities, useStates } from "src/hooks/brazil-addresses";

import { Form, Field } from "src/components/hook-form";

import { FormActions } from "../form-actions";
import { tournamentDatesDefaultValues } from "../../defaults/tournament-defaults";
import { useTournamentFormHandler } from "../../hooks/use-tournament-form-handler";
import { TournamentPeriodAndLocationSchema } from "../../schemas/tournament-period-and-location.schema";

export type Props = {
  tournament: ITournamentDraftFetchResponse | null;
  onGoBack: () => void;
};

export function StepPeriodAndLocation({ tournament, onGoBack }: Props) {
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const tournamentId = tournament?.tournamentId;

  const { handlePeriodAndLocationStepSubmit, isLoading } = useTournamentFormHandler(router);

  const methods = useForm({
    mode: "onSubmit",
    resolver: zodResolver(TournamentPeriodAndLocationSchema),
    defaultValues: tournamentDatesDefaultValues,
  });

  const { handleSubmit, formState, reset, control, setValue, getValues } = methods;
  const selectedState = useWatch({ control, name: "state" });

  const { states, isLoading: statesLoading } = useStates();
  const { cities, isLoading: citiesLoading } = useCities(selectedState);

  useEffect(() => {
    if (tournament) {
      reset({
        city: tournament.city ?? tournamentDatesDefaultValues.city,
        state: tournament.state ?? tournamentDatesDefaultValues.state,
        initialDate: tournament.initialDate ?? tournamentDatesDefaultValues.initialDate,
        endDate: tournament.endDate ?? tournamentDatesDefaultValues.endDate,
        tournamentId: tournament.tournamentId ?? undefined,
      });
    }
  }, [tournament, reset]);

  useEffect(() => {
    const currentCity = getValues("city");
    const isValidCity = cities.some((c) => c.value === currentCity);
    if (!isValidCity && currentCity) {
      setValue("city", "", { shouldValidate: true });
    }
  }, [selectedState, cities, getValues, setValue]);

  const isEditingPeriodAndLocation =
    Boolean(tournament?.city) &&
    Boolean(tournament?.state) &&
    Boolean(tournament?.initialDate) &&
    Boolean(tournament?.endDate);

  const onSubmit = handleSubmit((data) =>
    handlePeriodAndLocationStepSubmit(data, tournamentId!, isEditingPeriodAndLocation)
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={isMdOrSmaller ? 5 : 10} sx={{ pt: 0, pl: { xs: 0, lg: 7 } }}>
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
                    options={cities}
                    getOptionLabel={(option) => option.label}
                    noOptionsText={
                      citiesLoading ? "Carregando cidades..." : "Nenhuma cidade encontrada"
                    }
                    disabled={!selectedState}
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
