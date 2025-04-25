import type { ZodSchema } from "zod";
import type { ITournament } from "src/types/tournament";

import { TournamentFormat } from "@natrave/tournaments-service-types";

import { STEP_PARAM } from "../constants";
import { TournamentDraftSchema } from "../schemas/tournament-info.schema";
import { TournamentDatesSchema } from "../schemas/tournament-dates.schema";
import { TournamentFormatSchema } from "../schemas/tournament-format.schema";
import {
  formatDefaults,
  tournamentDraftDefaultValues,
  tournamentDatesDefaultValues,
} from "../defaults/tournament-defaults";

import type {
  StepSchemas,
  TournamentStep,
  TournamentDatesSchemaType,
  ReturnTypeOfUseTournamentFormHandler,
} from "../types";

export function getFormConfigByStep(
  step: TournamentStep,
  handler: ReturnTypeOfUseTournamentFormHandler,
  tournament?: ITournament | null
): {
  schema: ZodSchema<StepSchemas[TournamentStep]>;
  defaultValues: StepSchemas[TournamentStep];
  stepSubmit: (data: StepSchemas[TournamentStep], id?: string | null) => Promise<void>;
} {
  switch (step) {
    case 0:
      return {
        schema: TournamentDraftSchema,
        defaultValues: tournament
          ? {
              name: tournament.name,
              gender: tournament.gender,
              modality: tournament.modality,
            }
          : tournamentDraftDefaultValues,
        stepSubmit: handler.handleDraftStep,
      } as any;

    case 1: {
      const isEditingFormat = Boolean(tournament?.format);

      return {
        schema: TournamentDatesSchema,
        defaultValues: tournament
          ? {
              startDate: tournament.startDate,
              endDate: tournament.endDate,
              state: tournament.state,
              city: tournament.city,
            }
          : tournamentDatesDefaultValues,
        stepSubmit: (data: TournamentDatesSchemaType, id: string) =>
          handler.handleDatesStepSubmit(data, id!, isEditingFormat),
      } as any;
    }

    case 2:
    default:
      return {
        schema: TournamentFormatSchema,
        defaultValues: tournament
          ? {
              format: tournament!.format,
              formatConfig: tournament!.formatConfig,
            }
          : {
              format: TournamentFormat.ROUND_ROBIN,
              formatConfig: formatDefaults[TournamentFormat.ROUND_ROBIN],
            },
        stepSubmit: handler.handleFormatStepSubmit,
      } as any;
  }
}

export const getRoute = (step: number, id?: string | null): string =>
  `?${STEP_PARAM}=${step}${id ? `&id=${id}` : ""}`;

export const createRedirectPath = (
  currentPath: string,
  query: { tab: string; id?: string }
): string => {
  const queryString = new URLSearchParams();
  queryString.set(STEP_PARAM, query.tab);
  if (query.id) queryString.set("id", query.id);
  return `${currentPath}?${queryString.toString()}`;
};
