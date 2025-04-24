import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  TournamentFormat,
  TournamentGender,
  TournamentModality,
} from "@natrave/tournaments-service-types";

import type {
  TournamentDraftSchemaType,
  TournamentDatesSchemaType,
  TournamentFormatSchemaType,
} from "../types";

//-------------------------------------------------------------------------------

export const tournamentDraftDefaultValues: TournamentDraftSchemaType = {
  name: "",
  gender: TournamentGender.MALE,
  modality: TournamentModality.SOCIETY,
};

//-------------------------------------------------------------------------------

export const formatDefaults: Record<TournamentFormat, TournamentFormatSchemaType["formatConfig"]> =
  {
    [TournamentFormat.ROUND_ROBIN]: {
      numberOfTeams: 16,
      hasHomeAndAway: true,
    },
    [TournamentFormat.KNOCKOUT]: {
      numberOfTeams: 8,
      hasHomeAndAway: false,
    },
    [TournamentFormat.GROUPS_AND_KNOCKOUT]: {
      numberOfTeams: 16,
      numberOfGroups: 4,
      qualifiedPerGroup: 2,
      hasHomeAndAwayGroup: false,
      hasHomeAndAwayKnockout: false,
    },
    [TournamentFormat.ROUND_ROBIN_AND_KNOCKOUT]: {
      numberOfTeams: 16,
      qualifiedToKnockout: 4,
      hasHomeAndAwayRoundRobin: true,
      hasHomeAndAwayKnockout: false,
    },
  };

//-------------------------------------------------------------------------------

dayjs.extend(utc);
dayjs.extend(timezone);

const today = dayjs().tz("America/Sao_Paulo").startOf("day");
const tomorrow = today.add(1, "day");

export const tournamentDatesDefaultValues: TournamentDatesSchemaType = {
  startDate: today.toISOString(),
  endDate: tomorrow.toISOString(),
  state: "SP",
  city: "",
};
