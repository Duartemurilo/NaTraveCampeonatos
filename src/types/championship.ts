import type { Category } from "./category";
import type { MatchType } from "./match-type";
import type { MatchDays } from "./match-days";
import type { TournamentFormat } from "./tournament-format";

export type IChampionship = IChampionshipInput & {
  id: string;
  rowDate: string;
};

export type IChampionshipInput = {
  // Ficha do Campeonato
  championshipName: string;
  championshipDescription?: string;
  championshipBanner: string | File | null;

  // Datas e Localização
  startDate: string;
  endDate: string;
  matchDays: MatchDays[];
  startTime: string;
  endTime: string;
  state: string;
  city: string;

  // Modelo do Campeonato
  category: Category;
  numberOfTeams: number;
  minAge: number;
  maxAge: number;
  minPlayersPerTeam: number;
  maxPlayersPerTeam: number;
  matchType: MatchType;
  tournamentFormat: TournamentFormat;
};
