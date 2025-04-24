import React from "react";

import { Step, Divider, StepLabel, Typography } from "@mui/material";

import { CONFIG } from "src/global-config";

import {
  SidebarTitle,
  SidebarHeader,
  VerticalStepper,
  SidebarSubtitle,
  SidebarContainer,
} from "../../styles";

type Props = {
  steps: { label: string }[];
  activeStep: number;
};

export function TournamentFormSidebar({ steps, activeStep }: Props) {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <img
          alt="trophy"
          src={`${CONFIG.assetsDir}/assets/icons/frames/trophy.svg`}
          width={25}
          height={25}
        />
        <SidebarTitle variant="h4" textAlign="center">
          Cadastro de
          <br />
          Novo Campeonato
        </SidebarTitle>
      </SidebarHeader>

      <SidebarSubtitle
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        fontWeight="regular"
      >
        Vamos gerar automaticamente as partidas, tabelas e chaves do seu campeonato.
      </SidebarSubtitle>

      <Divider sx={{ width: 250, mb: "40px" }} />

      <VerticalStepper
        orientation="vertical"
        activeStep={activeStep}
        connector={null}
        alternativeLabel={false}
      >
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel
              slotProps={{
                stepIcon: {
                  sx: {
                    "&.Mui-active": { color: "secondary.main" },
                    "&.Mui-completed": { color: "secondary.main" },
                    marginTop: 2,
                    width: 30,
                    height: 30,
                  },
                },
              }}
              sx={{ flexDirection: "column-reverse", alignItems: "center", textAlign: "center" }}
            >
              <Typography variant="subtitle1" fontWeight="medium">
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </VerticalStepper>
    </SidebarContainer>
  );
}
