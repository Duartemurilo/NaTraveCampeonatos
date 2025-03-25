import type { SelectOption } from "src/types/select";

import { Category } from "src/types/category";
import { MatchDays } from "src/types/match-days";
import { MatchType } from "src/types/match-type";
import { TournamentFormat } from "src/types/tournament-format";

export const MATCH_DAYS_OPTIONS: SelectOption<MatchDays>[] = [
  { label: "Segunda-feira", value: MatchDays.MONDAY },
  { label: "Terça-feira", value: MatchDays.TUESDAY },
  { label: "Quarta-feira", value: MatchDays.WEDNESDAY },
  { label: "Quinta-feira", value: MatchDays.THURSDAY },
  { label: "Sexta-feira", value: MatchDays.FRIDAY },
  { label: "Sábado", value: MatchDays.SATURDAY },
  { label: "Domingo", value: MatchDays.SUNDAY },
];

export const CATEGORY_OPTIONS = [
  { label: "Masculino", value: Category.MALE },
  { label: "Feminino", value: Category.FEMALE },
  { label: "Misto", value: Category.MIXED },
];

export const GAME_TYPE_OPTIONS = [
  { label: "5x5", value: MatchType.FIVE_VS_FIVE },
  { label: "6x6", value: MatchType.SIX_VS_SIX },
  { label: "7x7", value: MatchType.SEVEN_VS_SEVEN },
  { label: "8x8", value: MatchType.EIGHT_VS_EIGHT },
  { label: "9x9", value: MatchType.NINE_VS_NINE },
  { label: "10x10", value: MatchType.TEN_VS_TEN },
  { label: "11x11", value: MatchType.ELEVEN_VS_ELEVEN },
];

export const FORMAT_OPTIONS = [
  { label: "Pontos corridos", value: TournamentFormat.POINTS },
  { label: "Mata-mata", value: TournamentFormat.KNOCKOUT },
  { label: "Grupos", value: TournamentFormat.GROUPS },
  { label: "Grupos e mata-mata", value: TournamentFormat.GROUPS_AND_KNOCKOUT },
];

export const stepFields = [
  // Step 1: Ficha do Campeonato
  ["championshipName", "championshipDescription", "championshipBanner"],

  // Step 2: Datas e Localização
  ["startDate", "endDate", "matchDays", "startTime", "endTime", "state", "city"],

  // Step 3: Modelo do Campeonato
  [
    "category",
    "numberOfTeams",
    "minAge",
    "maxAge",
    "minPlayersPerTeam",
    "maxPlayersPerTeam",
    "matchType",
    "tournamentFormat",
  ],
];
