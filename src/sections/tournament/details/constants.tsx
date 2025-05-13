import { CONFIG } from "src/global-config";

import { SvgColor } from "src/components/svg-color";

import { TournamentTabValue } from "./types";

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

export const TOURNAMENT_TABS = [
  { value: TournamentTabValue.GERAL, label: "Geral", icon: icon("ic-trophy") },
  { value: TournamentTabValue.CONFIGURACOES, label: "Configurações", icon: icon("ic-settings") },
  { value: TournamentTabValue.PARTIDAS, label: "Partidas", icon: icon("ic-matches") },
  { value: TournamentTabValue.TIMES, label: "Times", icon: icon("ic-teams") },
  {
    value: TournamentTabValue.CLASSIFICACAO,
    label: "Classificação",
    icon: icon("ic-classification"),
  },
] as const;

export const TOURNAMENT_TAB_PARAM = "tab";
