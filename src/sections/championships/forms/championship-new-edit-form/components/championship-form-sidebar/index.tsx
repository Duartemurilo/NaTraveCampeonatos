"use client";

import React from "react";

import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import { useTheme } from "@mui/material/styles";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import { CONFIG } from "src/global-config";

type Props = {
  steps: { label: string }[];
  activeStep: number;
  onStepChange: (stepIndex: number) => void;
};

export function ChampionshipFormSidebar({ steps, activeStep, onStepChange }: Props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        pb: 3,
        width: 1,
        position: "relative",
        pt: "var(--layout-header-desktop-height)",
        [theme.breakpoints.up("md")]: {
          maxWidth: 350,
          gap: 5,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        },
        [theme.breakpoints.down("lg")]: {
          display: "flex",
          flex: "1 1 auto",
          gap: 4,
          alignItems: "center",
          flexDirection: "column",
          p: theme.spacing(3, 2, 1, 2),
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img
          alt="trophy"
          src={`${CONFIG.assetsDir}/assets/icons/frames/trophy.svg`}
          width="18px"
          height="18px"
        />
        <Typography
          variant="h4"
          sx={{
            md: { textAlign: "left" },
            lg: { textAlign: "center" },
            display: "flex",
            alignItems: "center",
          }}
        >
          Novo Campeonato
        </Typography>
      </Box>
      <Stepper orientation="vertical" activeStep={activeStep} sx={{ ml: -3.5 }}>
        {steps.map((step, index) => (
          <Step key={step.label} onClick={() => onStepChange(index)}>
            <StepLabel
              slotProps={{
                stepIcon: {
                  sx: {
                    "&.Mui-active": { color: "secondary.main" },
                    "&.Mui-completed": { color: "secondary.main" },
                  },
                },
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
