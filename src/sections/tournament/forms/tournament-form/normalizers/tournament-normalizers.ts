import type {
  ITournamentDraftUpdateDto,
  ITournamentDraftCreationDto,
  ITournamentFormatCreationDto,
} from "@natrave/tournaments-service-types";

import { MatchLegMode } from "@natrave/tournaments-service-types";

import type {
  ITournamentFinalizeDto,
  TournamentDatesSchemaType,
  TournamentDraftSchemaType,
  TournamentFormatSchemaType,
} from "../types";

function convertBooleanToMatchLegMode(value: boolean | null | undefined): MatchLegMode | null {
  if (value === undefined || value === null) return null;
  return value ? MatchLegMode.HOME_AND_AWAY : MatchLegMode.SINGLE;
}

export function normalizeCreateTournamentDraft(
  data: TournamentDraftSchemaType
): ITournamentDraftCreationDto {
  return data;
}

export function normalizeEditTournamentDraft(
  data: TournamentDraftSchemaType,
  _tournamentId: string
): ITournamentDraftUpdateDto {
  const tournamentId = Number(_tournamentId);
  return { ...data, tournamentId };
}

export function normalizeTournamentFormatForCreate(
  data: TournamentFormatSchemaType,
  _tournamentId: string
): ITournamentFormatCreationDto {
  const tournamentId = Number(_tournamentId);

  return {
    ...data,
    tournamentId,
    initialPhaseMatchMode: convertBooleanToMatchLegMode(data.initialPhaseMatchMode),
    knockoutMatchMode: convertBooleanToMatchLegMode(data.knockoutMatchMode),
  };
}

export function normalizeTournamentDates(
  data: TournamentDatesSchemaType,
  _tournamentId: string
): ITournamentFinalizeDto {
  const tournamentId = Number(_tournamentId);
  return { ...data, tournamentId };
}
