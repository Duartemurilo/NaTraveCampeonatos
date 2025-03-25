import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Step from "@mui/material/Step";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stepper, StepLabel } from "@mui/material";

import { useRouter } from "src/routes/hooks";

import useTabsOrientation from "src/hooks/use-tabs-orientation";
import { useStepController } from "src/hooks/use-step-controller";

import { Form } from "src/components/hook-form";

import { stepFields } from "./constants";
import { StepInfo } from "./components/step-Info";
import { StepDates } from "./components/step-dates";
import { StepFormat } from "./components/step-format";
import {
  ChampionshipSchema,
  type ChampionshipSchemaType,
  championshipNewEditFormDefaultValues,
} from "./form-data";

import type { ChampionshipNewEditFormProps } from "./types";

// ----------------------------------------------------------------------

export function ChampionshipNewEditForm({ championsShip }: ChampionshipNewEditFormProps) {
  const router = useRouter();
  const orientation = useTabsOrientation();

  const steps = [
    { label: "Ficha do Campeonato", content: <StepInfo /> },
    { label: "Datas e Localização", content: <StepDates /> },
    { label: "Modelo de Campeonato", content: <StepFormat /> },
  ];

  const stepController = useStepController(steps);
  const { activeStep, currentStep, isFirstStep, isLastStep, goNext, goBack } = stepController;

  const methods = useForm<ChampionshipSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(ChampionshipSchema),
    defaultValues: championshipNewEditFormDefaultValues,
    values: championsShip,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.info("DATA", data);
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Card>
            <Box my={3} mx={2}>
              <Stepper
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                orientation={orientation}
                activeStep={activeStep}
                alternativeLabel
              >
                {steps.map((step) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box>{currentStep.content} </Box>

            <Stack
              sx={{
                mt: 3,
                p: 4,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              {!isFirstStep ? (
                <LoadingButton variant="outlined" color="inherit" onClick={goBack}>
                  Voltar
                </LoadingButton>
              ) : (
                <Box />
              )}

              {isLastStep ? (
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!championsShip ? "Criar campeonato" : "Salvar alterações"}
                </LoadingButton>
              ) : (
                <LoadingButton
                  variant="contained"
                  onClick={async () => {
                    const fieldsToValidate = stepFields[activeStep];
                    const isStepValid = await methods.trigger(fieldsToValidate as any);

                    if (isStepValid) {
                      goNext();
                    }
                  }}
                >
                  Próximo
                </LoadingButton>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
