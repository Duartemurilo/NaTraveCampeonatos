import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
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
    numberOfGroups: 4,
    teamsAdvancing: 2,
  },
  [TournamentFormat.ROUND_ROBIN_AND_KNOCKOUT]: {
    teamCount: 16,
    initialPhaseMatchMode: true,
    knockoutMatchMode: false,
    numberOfGroups: null,
    teamsAdvancing: 4,
  },
};

//-------------------------------------------------------------------------------

dayjs.extend(utc);
dayjs.extend(timezone);

const today = dayjs().tz("America/Sao_Paulo").startOf("day");
const tomorrow = today.add(1, "day");

export const tournamentDatesDefaultValues: TournamentPeriodAndLocationSchemaType = {
  initialDate: today.toISOString(),
  endDate: tomorrow.toISOString(),
  state: BrazilianState.SAO_PAULO,
  city: "",
  tournamentId: undefined,
};
