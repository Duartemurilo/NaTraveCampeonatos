"use client";

import React from "react";

import { LoadingButton } from "@mui/lab";
import { Link, Stack } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

type Props = {
  isLoading: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSubmit: () => Promise<void>;
  handleGoBack: () => void;
};

export function FormActions({ isLoading, isFirstStep, isLastStep, onSubmit, handleGoBack }: Props) {
  return (
    <Stack
      sx={{
        mt: 3,
        p: 4,
        pl: 0,
        pr: 0,
        width: { xs: "100%", md: "100%", lg: "80%" },
        flexDirection: { xs: "column", md: "column", lg: "row" },
        justifyContent: { xs: "center", md: "center", lg: "flex-end" },
        alignItems: { xs: "center", md: "center", lg: "flex-end" },
        gap: 2,
        position: { xs: "relative", md: "relative", lg: "absolute" },
        right: { xs: 0, lg: 40 },
        bottom: { xs: 0, lg: -20 },
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
            loading={isLoading}
            endIcon={<ChevronRightIcon />}
          >
            Finalizar campeonato
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            loading={isLoading}
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
