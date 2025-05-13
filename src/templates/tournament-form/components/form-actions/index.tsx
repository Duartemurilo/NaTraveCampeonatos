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
      component="footer"
      sx={{
        // ⬇️ fixa no fundo do container que está rolando
        position: { md: "static", lg: "absolute" },
        bottom: 20,
        right: 20,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        // aparência

        py: 2,
        px: { xs: 2, md: 3 },
        // layout responsivo
        flexDirection: { md: "column", lg: "row" },
        justifyContent: { xs: "center", md: "center", lg: "flex-end" },
        alignItems: "center",
        gap: 2,
        // garante largura máxima do formulário
        width: "100%",
      }}
    >
      {!isFirstStep && (
        <Link
          color="inherit"
          variant="body2"
          onClick={handleGoBack}
          sx={{
            gap: 0.5,
            alignItems: "center",
            display: "inline-flex",
            cursor: "pointer",
            color: "text.secondary",
          }}
        >
          <ChevronLeftIcon />
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
          color="secondary"
          loading={isLoading}
          endIcon={<ChevronRightIcon />}
          sx={{ maxWidth: 200 }}
          onClick={onSubmit}
        >
          Próxima etapa
        </LoadingButton>
      )}
    </Stack>
  );
}
