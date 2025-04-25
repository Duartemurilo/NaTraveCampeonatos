import { StepInfo } from "./components/step-info";
import { StepDates } from "./components/step-dates";
import { StepFormat } from "./components/step-format";

export const tournamentSteps = [
  {
    label: "Informações do Campeonato",
    Component: StepInfo,
  },
  {
    label: "Cidade e Período",
    Component: StepDates,
  },
  {
    label: "Formato do Campeonato",
    Component: StepFormat,
  },
];
