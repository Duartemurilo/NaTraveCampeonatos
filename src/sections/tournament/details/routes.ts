import { TOURNAMENT_TAB_PARAM } from "./constants";

export function createTournamentTabPath(pathname: string, tab: string) {
  const queryString = new URLSearchParams({ [TOURNAMENT_TAB_PARAM]: tab }).toString();
  return `${pathname}?${queryString}`;
}
