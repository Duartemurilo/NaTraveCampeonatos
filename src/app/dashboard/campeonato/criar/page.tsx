import type { Metadata } from "next";

import { CONFIG } from "src/global-config";

import ChampionshipCreateView from "src/sections/championships/view/championship-create-view";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Criar um novo campeonato - ${CONFIG.appName}`,
};

export default function Page() {
  return <ChampionshipCreateView initialStep={0} />;
}
