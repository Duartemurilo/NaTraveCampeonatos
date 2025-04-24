"use client";

import { useEffect } from "react";
import { useWatch, useFormContext } from "react-hook-form";

import { Stack, useTheme, Typography, useMediaQuery } from "@mui/material";

import { Field } from "src/components/hook-form";

import { FORMAT_OPTIONS } from "../../constants";
import { formatDefaults } from "../../defaults/tournament-defaults";
import TournamentFormatConfigFields from "./components/tournamentF-format-config-fields";

import type { TournamentFormatSchemaType } from "../../types";

export function StepFormat() {
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"));

  const { setValue } = useFormContext<TournamentFormatSchemaType>();

  const format = useWatch<TournamentFormatSchemaType, "format">({
    name: "format",
  });

  useEffect(() => {
    setValue("formatConfig", formatDefaults[format], {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [format, setValue]);

  return (
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
        – Formato do campeonato
      </Typography>

      <Stack
        sx={{
          columnGap: 2,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)" },
        }}
      >
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
      </Stack>

      <TournamentFormatConfigFields />
    </Stack>
  );
}
