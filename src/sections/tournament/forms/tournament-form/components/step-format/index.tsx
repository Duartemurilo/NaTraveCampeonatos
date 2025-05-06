"use client";

import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TournamentFormat } from "@natrave/tournaments-service-types";

import { Box, Stack, useTheme, Typography, useMediaQuery } from "@mui/material";

import { useRouter } from "src/routes/hooks";

import { Form, Field } from "src/components/hook-form";
import { SplashScreen } from "src/components/loading-screen";

import { FormActions } from "../form-actions";
import { FORMAT_OPTIONS } from "../../constants";
import { formatDefaults } from "../../defaults/tournament-defaults";
import { TournamentFormatSchema } from "../../schemas/tournament-format.schema";
import { useTournamentFormHandler } from "../../hooks/use-tournament-form-handler";
import TournamentFormatConfigFields from "./components/tournamentF-format-config-fields";

import type { TournamentFormatSchemaType } from "../../types";

export type Props = {
  tournament: ITournamentDraftFetchResponse | null;
  onGoBack: () => void;
};

export function StepFormat({ tournament, onGoBack }: Props) {
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const tournamentId = tournament?.tournamentId;

  const { handleFormatStepSubmit, isLoading, isCreatingFormat } = useTournamentFormHandler(router);

  const [isRedirecting, setIsRedirecting] = useState(false);

  const methods = useForm<TournamentFormatSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(TournamentFormatSchema),
    defaultValues: {
      format: TournamentFormat.ROUND_ROBIN,
      ...formatDefaults[TournamentFormat.ROUND_ROBIN],
    },
  });

  const { handleSubmit, formState, setValue, control } = methods;
  const format = useWatch({ control, name: "format" });

  useEffect(() => {
    const d = formatDefaults[format];
    setValue("teamCount", d.teamCount, { shouldValidate: true, shouldDirty: true });
    setValue("initialPhaseMatchMode", d.initialPhaseMatchMode, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("knockoutMatchMode", d.knockoutMatchMode, { shouldValidate: true, shouldDirty: true });
    setValue("numberOfGroups", d.numberOfGroups, { shouldValidate: true, shouldDirty: true });
    setValue("teamsAdvancing", d.teamsAdvancing, { shouldValidate: true, shouldDirty: true });
  }, [format, setValue]);

  const onSubmit = handleSubmit((data) =>
    handleFormatStepSubmit(data, tournamentId!, {
      onSuccess: () => setIsRedirecting(true),
    })
  );

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      {isCreatingFormat || isRedirecting ? (
        <SplashScreen portal={false} />
      ) : (
        <Form methods={methods} onSubmit={onSubmit}>
          <Stack spacing={isMdOrSmaller ? 5 : 10} sx={{ pt: 0, pl: { xs: 0, lg: 7 } }}>
            <Typography
              variant="h2"
              mt={-2}
              textAlign={{ xs: "center", md: "center", lg: "left" }}
              py={{ xs: 2, md: 0 }}
            >
              <Typography component="span" variant="inherit" color="primary">
                Passo 3 de 3{" "}
              </Typography>
              – Formato do campeonato
            </Typography>

            <Stack spacing={6}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle1" fontWeight="regular">
                  Qual é o{" "}
                  <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
                    formato{" "}
                  </Typography>
                  do campeonato?
                </Typography>

                <Field.SingleToggleButtonGroup
                  name="format"
                  orientation={isMdOrSmaller ? "vertical" : "horizontal"}
                  options={FORMAT_OPTIONS}
                />
              </Stack>

              <TournamentFormatConfigFields />
            </Stack>

            <FormActions
              isFirstStep={false}
              isLastStep
              handleGoBack={onGoBack}
              onSubmit={onSubmit}
              isLoading={isLoading || formState.isSubmitting}
            />
          </Stack>
        </Form>
      )}
    </Box>
  );
}
