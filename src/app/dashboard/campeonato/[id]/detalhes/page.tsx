import type { Metadata } from "next";
import type { TournamentTab } from "src/sections/tournament/details/types";

import { CONFIG } from "src/global-config";

import TournamentDetailsView from "src/sections/tournament/details";
import { TOURNAMENT_TAB_PARAM } from "src/sections/tournament/details/constants";

export const metadata: Metadata = {
  title: `Detalhes do campeonato – ${CONFIG.appName}`,
};

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: any;
}) {
  const initialTab = (searchParams[TOURNAMENT_TAB_PARAM] ?? "geral") as TournamentTab;
  return <TournamentDetailsView tournamentId={params.id} initialTab={initialTab} />;
}
