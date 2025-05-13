import type { Metadata } from "next";

import { CONFIG } from "src/global-config";

import TournamentCreateView from "src/sections/tournament/new/view/tournament-create-view";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Criar um novo campeonato - ${CONFIG.appName}`,
};

export default function Page() {
  return <TournamentCreateView />;
}
