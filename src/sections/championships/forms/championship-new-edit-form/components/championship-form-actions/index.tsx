"use client";

import React from "react";

import { LoadingButton } from "@mui/lab";
import { Link, Stack } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

import { useRouter } from "src/routes/hooks";

import { getRoute } from "../../routes/championship-routes";

type Props = {
  isSubmitting: boolean;
  isLoading: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStep: number;
  championshipId: string | null;
  onSubmit: () => Promise<void>;
  onGoBack: () => void;
};

export function ChampionshipFormActions({
  isSubmitting,
  isLoading,
  isFirstStep,
  isLastStep,
  currentStep,
  championshipId,
  onSubmit,
  onGoBack,
}: Props) {
  const router = useRouter();

  const handleGoBack = () => {
    onGoBack();

    router.push(getRoute(currentStep - 1, championshipId));
  };

  return (
    <Stack
      sx={{
        mt: 3,
        p: 4,
        pl: 0,
        pr: 0,
        width: { xs: "100%", lg: "80%" },
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "flex-end" },
        alignItems: { xs: "center", md: "flex-end" },
        gap: 2,
      }}
    >
      <>
        {!isFirstStep && (
          <Link
            color="inherit"
            variant="body2"
            fontWeight="regular"
            onClick={handleGoBack}
            sx={{
              gap: 0.5,
              alignItems: "center",
              display: "inline-flex",
              cursor: "pointer",
              pointerEvents: "auto",
              color: "text.secondary",
            }}
          >
            <ChevronLeftIcon sx={{ color: "primary.dark" }} />
            Etapa anterior
          </Link>
        )}
        {isLastStep ? (
          <LoadingButton
            type="submit"
            variant="contained"
            color="secondary"
            loading={isSubmitting || isLoading}
            endIcon={<ChevronRightIcon />}
          >
            Finalizar campeonato
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            loading={isSubmitting || isLoading}
            color="secondary"
            endIcon={<ChevronRightIcon />}
            sx={{ maxWidth: 200 }}
            onClick={onSubmit}
          >
            Próxima etapa
          </LoadingButton>
        )}
      </>
    </Stack>
  );
}
