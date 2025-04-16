import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { GENDER } from "src/types/gender";
import { ChampionshipFormat } from "src/types/championship-format";
import { ChampionshipModality } from "src/types/championship-modality";

import type { ChampionshipInfoSchemaType, ChampionshipDatesSchemaType } from "../types";

export const championshipInfoDefaultValues: ChampionshipInfoSchemaType = {
  championshipName: "",
  gender: GENDER.MALE,
  championshipModality: ChampionshipModality.SOCIETY,
};

export const championshipFormatDefaultValues = {
  championshipFormat: ChampionshipFormat.ROUND_ROBIN_AND_KNOCKOUT,
  formatConfig: {
    numberOfTeams: 16,
    hasHomeAndAway: false,
    numberOfGroups: 4,
    qualifiedPerGroup: 2,
    hasHomeAndAwayGroup: false,
    hasHomeAndAwayKnockout: false,
    qualifiedToKnockout: 4,
    hasHomeAndAwayRoundRobin: true,
  },
};
dayjs.extend(utc);
dayjs.extend(timezone);

const today = dayjs().tz("America/Sao_Paulo").startOf("day");
const tomorrow = today.add(1, "day");

export const championshipDatesDefaultValues: ChampionshipDatesSchemaType = {
  startDate: today.toISOString(),
  endDate: tomorrow.toISOString(),
  state: "SP",
  city: "",
};
