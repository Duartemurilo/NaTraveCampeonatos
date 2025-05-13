import { StepInfo } from "./components/step-info";
import { StepFormat } from "./components/step-format";
import { StepPeriodAndLocation } from "./components/step-period-and-location";

export const tournamentSteps = [
  {
    label: "Informações do Campeonato",
    Component: StepInfo,
  },
  {
    label: "Cidade e Período",
    Component: StepPeriodAndLocation,
  },
  {
    label: "Formato do Campeonato",
    Component: StepFormat,
  },
];
