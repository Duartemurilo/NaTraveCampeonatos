import type {
  ITournamentSetupDto,
  ITournamentDraftUpdateDto,
  ITournamentDraftCreationDto,
  ITournamentPeriodAndLocationSetDto,
} from "@natrave/tournaments-service-types";

import { MatchLegMode, TournamentFormat } from "@natrave/tournaments-service-types";

import type {
  TournamentDraftSchemaType,
  TournamentFormatSchemaType,
  TournamentPeriodAndLocationSchemaType,
} from "../types";

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

function toMatchLegModeOrNull(
  value?: boolean | null,
  format?: TournamentFormat
): MatchLegMode | null {
  if (format === TournamentFormat.KNOCKOUT) return null;
  return value ? MatchLegMode.HOME_AND_AWAY : MatchLegMode.SINGLE;
}

function toOptionalMatchLegMode(
  value?: boolean | null,
  format?: TournamentFormat
): MatchLegMode | null {
  if (format === TournamentFormat.ROUND_ROBIN) return null;
  if (value == null) return null;
  return value ? MatchLegMode.HOME_AND_AWAY : MatchLegMode.SINGLE;
}

export function normalizeTournamentFormatForCreate(
  data: TournamentFormatSchemaType,
  _tournamentId: string
): ITournamentSetupDto {
  const tournamentId = Number(_tournamentId);

  return {
    ...data,
    tournamentId,
    initialPhaseMatchMode: toMatchLegModeOrNull(data.initialPhaseMatchMode, data.format),
    knockoutMatchMode: toOptionalMatchLegMode(data.knockoutMatchMode, data.format),
  };
}

//------------------------------------------------------------------------------
