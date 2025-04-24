import {
  type ITournamentDraftUpdateDto,
  type ITournamentDraftCreationDto,
} from "@natrave/tournaments-service-types";

import type {
  ITournamentFinalizeDto,
  TournamentDatesSchemaType,
  TournamentDraftSchemaType,
  TournamentFormatSchemaType,
  ITournamentFormatCreationDto,
} from "../types";

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

export function normalizeTournamentFormat(
  data: TournamentFormatSchemaType,
  _tournamentId: string
): ITournamentFormatCreationDto {
  const tournamentId = Number(_tournamentId);

  return { ...data, tournamentId };
}

export function normalizeTournamentDates(
  data: TournamentDatesSchemaType,
  _tournamentId: string
): ITournamentFinalizeDto {
  const tournamentId = Number(_tournamentId);
  return { ...data, tournamentId };
}
