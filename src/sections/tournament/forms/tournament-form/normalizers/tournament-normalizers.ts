import type {
  ITournamentDraftUpdateDto,
  ITournamentDraftCreationDto,
  ITournamentFormatCreationDto,
  ITournamentPeriodAndLocationSetDto,
} from "@natrave/tournaments-service-types";

import { MatchLegMode } from "@natrave/tournaments-service-types";

import type {
  TournamentDraftSchemaType,
  TournamentFormatSchemaType,
  TournamentPeriodAndLocationSchemaType,
} from "../types";

function convertBooleanToMatchLegMode(value: boolean | null | undefined): MatchLegMode | null {
  if (value === undefined || value === null) return null;
  return value ? MatchLegMode.HOME_AND_AWAY : MatchLegMode.SINGLE;
}

//------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------

export function normalizeCreateTournamentPeriodAndLocation(
  data: TournamentPeriodAndLocationSchemaType,
  _tournamentId: string
): ITournamentPeriodAndLocationSetDto {
  const tournamentId = Number(_tournamentId);
  return { ...data, tournamentId };
}

export function normalizeUpdateTournamentPeriodAndLocation(
  data: TournamentPeriodAndLocationSchemaType,
  _tournamentId: string
): ITournamentPeriodAndLocationSetDto {
  const tournamentId = Number(_tournamentId);

  return { ...data, tournamentId };
}

//------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------
