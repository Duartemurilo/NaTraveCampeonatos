import type { IChampionship } from "src/types/championship";

import { Category } from "src/types/category";
import { MatchDays } from "src/types/match-days";
import { MatchType } from "src/types/match-type";
import { TournamentFormat } from "src/types/tournament-format";

export const mockChampionship: IChampionship = {
  id: "champ-12345",
  rowDate: "2025-03-26T10:00:00-03:00",

  // Ficha do Campeonato
  championshipName: "Copa NaTrave 2025",
  championshipDescription: "Campeonato intermunicipal com categorias masculinas e mistas.",
  championshipBanner: "https://example.com/banner.jpg",

  // Datas e Localização
  startDate: "2025-04-10T00:00:00-03:00",
  endDate: "2025-05-20T00:00:00-03:00",
  matchDays: [MatchDays.TUESDAY, MatchDays.THURSDAY],
  startTime: "18:30",
  endTime: "22:00",
  state: "SP",
  city: "SÃO PAULO",

  // Modelo do Campeonato
  category: Category.MALE,
  numberOfTeams: 8,
  minAge: 16,
  maxAge: 35,
  minPlayersPerTeam: 7,
  maxPlayersPerTeam: 12,
  matchType: MatchType.SEVEN_VS_SEVEN,
  tournamentFormat: TournamentFormat.GROUPS,
};
