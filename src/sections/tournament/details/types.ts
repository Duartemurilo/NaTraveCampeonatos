import type { TOURNAMENT_TABS } from "./constants";

export enum TournamentTabValue {
  GERAL = "geral",
  CONFIGURACOES = "configuracoes",
  PARTIDAS = "partidas",
  TIMES = "times",
  CLASSIFICACAO = "classificacao",
}

export type TournamentTabItem = (typeof TOURNAMENT_TABS)[number];
export type TournamentTab = (typeof TOURNAMENT_TABS)[number]["value"];
