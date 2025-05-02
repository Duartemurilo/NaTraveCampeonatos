import { TournamentFormat } from "@natrave/tournaments-service-types";

import { StepInfo } from "./components/step-info";
import { StepFormat } from "./components/step-format";
import { StepPeriodAndLocation } from "./components/period-and-location";
import { TournamentDraftSchema } from "./schemas/tournament-info.schema";
import { TournamentFormatSchema } from "./schemas/tournament-format.schema";
import { TournamentPeriodAndLocationSchema } from "./schemas/tournament-dates.schema";
import {
  formatDefaults,
  tournamentDraftDefaultValues,
  tournamentDatesDefaultValues,
} from "./defaults/tournament-defaults";

import type {
  TournamentStep,
  ReturnTypeOfUseTournamentFormHandler,
  TournamentPeriodAndLocationSchemaType,
} from "./types";

export function getFormConfigByStep(
  step: TournamentStep,
  handler: ReturnTypeOfUseTournamentFormHandler,
  data: { tournament?: any | null }
) {
  const tournament = data.tournament;

  switch (step) {
    case 0:
      return {
        schema: TournamentDraftSchema,
        defaultValues: {
          name: tournament?.name ?? tournamentDraftDefaultValues.name,
          gender: tournament?.gender ?? tournamentDraftDefaultValues.gender,
          modality: tournament?.modality ?? tournamentDraftDefaultValues.modality,
        },
        stepSubmit: handler.handleDraftStep,
      } as any;

    case 1: {
      const hasCity = Boolean(tournament?.city);
      const hasState = Boolean(tournament?.state);
      const hasInitialDate = Boolean(tournament?.initialDate);
      const hasEndDate = Boolean(tournament?.endDate);

      const isEditingDates = hasCity && hasState && hasInitialDate && hasEndDate;

      return {
        schema: TournamentPeriodAndLocationSchema,
        defaultValues: {
          initialDate: tournament?.initialDate ?? tournamentDatesDefaultValues.initialDate,
          endDate: tournament?.endDate ?? tournamentDatesDefaultValues.endDate,
          city: tournament?.city ?? tournamentDatesDefaultValues.city,
          state: tournament?.state ?? tournamentDatesDefaultValues.state,
          tournamentId: tournament?.tournamentId ?? undefined,
        },
        stepSubmit: (dataSubmit: TournamentPeriodAndLocationSchemaType, id: string) =>
          handler.handlePeriodAndLocationStepSubmit(dataSubmit, id!, isEditingDates),
      } as any;
    }

    case 2:
    default:
      return {
        schema: TournamentFormatSchema,
        defaultValues: {
          format: TournamentFormat.ROUND_ROBIN,
          formatConfig: formatDefaults[TournamentFormat.ROUND_ROBIN],
        },
        stepSubmit: handler.handleFormatStepSubmit,
      } as any;
  }
}

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
