import { ChampionshipFormat } from "src/types/championship-format";

import type {
  ChampionshipInfoData,
  ChampionshipDatesData,
  ChampionshipFormatData,
  ChampionshipInfoSchemaType,
  ChampionshipDatesSchemaType,
  ChampionshipFormatSchemaType,
} from "../types";

export function normalizeCreateChampionshipInfo(
  data: ChampionshipInfoSchemaType
): ChampionshipInfoSchemaType {
  return data;
}

export function normalizeEditChampionshipInfo(
  data: ChampionshipInfoSchemaType,
  id?: string
): ChampionshipInfoData {
  return id ? { ...data, id } : data;
}

export function normalizeChampionshipFormat(
  data: ChampionshipFormatSchemaType,
  id?: string | null
): ChampionshipFormatData {
  const roundRobinDefault = { numberOfTeams: 4, hasHomeAndAway: false };
  const knockoutDefault = { numberOfTeams: 4, hasHomeAndAway: false };

  const groupAndKnockoutDefault = {
    numberOfTeams: 16,
    numberOfGroups: 4,
    qualifiedPerGroup: 2,
    hasHomeAndAwayGroup: false,
    hasHomeAndAwayKnockout: false,
  };
  const roundRobinAndKnockoutDefault = {
    numberOfTeams: 16,
    qualifiedToKnockout: 8,
    hasHomeAndAwayRoundRobin: false,
    hasHomeAndAwayKnockout: false,
  };

  switch (data.championshipFormat) {
    case ChampionshipFormat.ROUND_ROBIN: {
      const normalizedData: ChampionshipFormatData = {
        championshipFormat: ChampionshipFormat.ROUND_ROBIN,
        formatConfig: { ...roundRobinDefault, ...data.formatConfig },
      };
      return id ? { ...normalizedData, id } : normalizedData;
    }
    case ChampionshipFormat.KNOCKOUT: {
      const normalizedData: ChampionshipFormatData = {
        championshipFormat: ChampionshipFormat.KNOCKOUT,
        formatConfig: { ...knockoutDefault, ...data.formatConfig },
      };
      return id ? { ...normalizedData, id } : normalizedData;
    }
    case ChampionshipFormat.GROUP_AND_KNOCKOUT: {
      const normalizedData: ChampionshipFormatData = {
        championshipFormat: ChampionshipFormat.GROUP_AND_KNOCKOUT,
        formatConfig: { ...groupAndKnockoutDefault, ...data.formatConfig },
      };
      return id ? { ...normalizedData, id } : normalizedData;
    }
    case ChampionshipFormat.ROUND_ROBIN_AND_KNOCKOUT: {
      const normalizedData: ChampionshipFormatData = {
        championshipFormat: ChampionshipFormat.ROUND_ROBIN_AND_KNOCKOUT,
        formatConfig: { ...roundRobinAndKnockoutDefault, ...data.formatConfig },
      };
      return id ? { ...normalizedData, id } : normalizedData;
    }
    default: {
      throw new Error("Formato de campeonato inválido");
    }
  }
}

export function normalizeChampionshipDates(
  data: ChampionshipDatesSchemaType,
  id?: string
): ChampionshipDatesData {
  return id ? { ...data, id } : data;
}
