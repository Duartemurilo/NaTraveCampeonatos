"use client";

import type {
  ITournamentConfigurationStep,
  ITournamentDraftFetchResponse,
  TournamentConfigurationStepName,
  IFetchTournamentConfigurationStepsResponse,
} from "@natrave/tournaments-service-types";

import { useMemo } from "react";
import { TournamentConfigurationStepStatus } from "@natrave/tournaments-service-types";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { useGetById } from "src/hooks/request/use-get-by-id";

import { endpoints } from "src/lib/axios";
import { CONFIG } from "src/global-config";
import { SWR_KEYS } from "src/constants/swr-keys";

import { AppWidget } from "src/components/chart/app-widget";

type Props = {
  tournament: ITournamentDraftFetchResponse;
};

export function TournamentConfigurationStepsCard({ tournament }: Props) {
  const getConfigurationSteps = useGetById<IFetchTournamentConfigurationStepsResponse>({
    key: [SWR_KEYS.getTournamentConfigurationSteps, tournament.tournamentId],
    endpoint: endpoints.tournament.getConfigurationSteps,
    id: tournament.tournamentId ?? "",
    enabled: Boolean(tournament.tournamentId),
    swrConfig: { revalidateOnMount: true },
  });

  const { data, isLoading } = getConfigurationSteps;

  const steps = useMemo(() => {
    if (!data?.allSteps) return [];
    return Object.entries(data.allSteps) as [
      TournamentConfigurationStepName,
      ITournamentConfigurationStep,
    ][];
  }, [data]);

  const getStepColor = (status: TournamentConfigurationStepStatus) =>
    status === TournamentConfigurationStepStatus.COMPLETED ? "success.main" : "text";

  return (
    <Box
      sx={(theme) => ({
        ...theme.mixins.bgGradient({
          images: [
            // Escurecimento lateral
            `linear-gradient(
          to right,
          rgba(18, 16, 12, 0.40) 0%,
          rgba(18, 16, 12, 0.80) 50%,
          rgba(18, 16, 12, 0.95) 100%
        )`,
            // Escurecimento superior
            `linear-gradient(
          to bottom,
          rgba(18, 16, 12, 0.3) 0%,
          transparent 20%
        )`,
            // Escurecimento inferior
            `linear-gradient(
          to top,
          rgba(18, 16, 12, 0.4) 0%,
          transparent 30%
        )`,
            // Imagem de fundo
            `url(${CONFIG.assetsDir}/assets/background/background-soccer-field-night.png)`,
          ],
        }),
        pt: 5,
        pb: 5,
        px: { xs: 3, md: 5 },
        gap: 5,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        color: "common.white",
        border: `solid 1px ${theme.vars.palette.grey[800]}`,
      })}
    >
      {isLoading ? (
        <>
          <Skeleton sx={{ width: "100%", maxWidth: 600 }} variant="text" height={30} />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", width: "100%" }}>
            <Skeleton sx={{ minWidth: 80 }} width={80} height={80} variant="circular" />{" "}
            <Skeleton sx={{ width: "100%", maxWidth: 500 }} variant="text" height={30} />
          </Box>

          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} sx={{ width: "100%", maxWidth: 600 }} variant="text" height={20} />
          ))}
        </>
      ) : (
        <>
          <Typography variant="h4" textAlign={{ xs: "center", md: "left" }}>
            Falta pouco para poder publicar seu campeonato!
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <AppWidget
              title=""
              showTitle={false}
              total={100}
              icon="solar:user-rounded-bold"
              chart={{ series: data?.percentageCompleted ?? 0 }}
              showTotal={false}
            />

            <Typography variant="body1" sx={{ opacity: 0.72 }}>
              Você já fez{" "}
              <Box component="span" fontWeight="bold">
                {data?.percentageCompleted ?? 0}%
              </Box>{" "}
              do trabalho pra poder lançar seu campeonato.
            </Typography>
          </Stack>

          <Stack spacing={1} width="100%">
            {steps.map(([_, step]) => (
              <Stack
                key={step.label}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ color: getStepColor(step.status) }}
              >
                {step.status === TournamentConfigurationStepStatus.COMPLETED ? (
                  <CheckCircleIcon fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon fontSize="small" />
                )}
                <Typography variant="body2">{step.label}</Typography>
              </Stack>
            ))}
          </Stack>

          <Button variant="contained" color="primary" disabled>
            Publicar campeonato
          </Button>
        </>
      )}
    </Box>
  );
}
