import {
  BrazilianState,
  TournamentFormat,
  TournamentGender,
  TournamentModality,
} from "@natrave/tournaments-service-types";

import type {
  TournamentDraftSchemaType,
  TournamentFormatSchemaType,
  TournamentPeriodAndLocationSchemaType,
} from "../types";

//-------------------------------------------------------------------------------

export const tournamentDraftDefaultValues: TournamentDraftSchemaType = {
  name: "",
  gender: TournamentGender.MALE,
  modality: TournamentModality.SOCIETY,
};

//-------------------------------------------------------------------------------

export const formatDefaults: Record<
  TournamentFormat,
  Omit<TournamentFormatSchemaType, "format">
> = {
  [TournamentFormat.ROUND_ROBIN]: {
    teamCount: 16,
    initialPhaseMatchMode: true,
    knockoutMatchMode: null,
    numberOfGroups: null,
    teamsAdvancing: null,
  },
  [TournamentFormat.KNOCKOUT]: {
    teamCount: 8,
    initialPhaseMatchMode: null,
    knockoutMatchMode: false,
    numberOfGroups: null,
    teamsAdvancing: null,
  },
  [TournamentFormat.GROUPS_AND_KNOCKOUT]: {
    teamCount: 16,
    initialPhaseMatchMode: null,
    knockoutMatchMode: false,
    numberOfGroups: 2,
    teamsAdvancing: 2,
  },
  [TournamentFormat.ROUND_ROBIN_AND_KNOCKOUT]: {
    teamCount: 16,
    initialPhaseMatchMode: false,
    knockoutMatchMode: false,
    numberOfGroups: null,
    teamsAdvancing: 2,
  },
};

//-------------------------------------------------------------------------------

export const tournamentDatesDefaultValues: TournamentPeriodAndLocationSchemaType = {
  initialDate: "",
  endDate: "",
  state: BrazilianState.SAO_PAULO,
  city: "",
  tournamentId: undefined,
};
