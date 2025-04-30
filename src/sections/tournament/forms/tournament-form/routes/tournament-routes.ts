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
  TournamentStep,
  TournamentDatesSchemaType,
  TournamentDraftSchemaType,
  ReturnTypeOfUseTournamentFormHandler,
} from "../types";

export function getFormConfigByStep(
  step: TournamentStep,
  handler: ReturnTypeOfUseTournamentFormHandler,
  data: { draft?: TournamentDraftSchemaType | null; dates?: TournamentDatesSchemaType | null }
) {
  switch (step) {
    case 0:
      return {
        schema: TournamentDraftSchema,
        defaultValues: data.draft ?? tournamentDraftDefaultValues,
        stepSubmit: handler.handleDraftStep,
      } as any;

    case 1: {
      const isEditingDates = Boolean(data.dates);

      return {
        schema: TournamentDatesSchema,
        defaultValues: data.dates ?? tournamentDatesDefaultValues,
        stepSubmit: (dataSubmit: TournamentDatesSchemaType, id: string) =>
          handler.handleDatesStepSubmit(dataSubmit, id!, isEditingDates),
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
