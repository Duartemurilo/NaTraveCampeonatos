import type { Metadata } from "next";

import { CONFIG } from "src/global-config";

import { ChampionshipEditView } from "src/sections/championships/view/champion-ship-edit-view";

export const metadata: Metadata = {
  title: `Editar campeonato | Dashboard - ${CONFIG.appName}`,
};

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  return <ChampionshipEditView championshipId={params.id} />;
}

const dynamic = CONFIG.isStaticExport ? "auto" : "force-dynamic";
export { dynamic };
