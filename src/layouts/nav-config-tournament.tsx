import { CONFIG } from "src/global-config";

import type { TournamentPopoverProps } from "./components/tournament-popover";

// ----------------------------------------------------------------------

export const _tournaments: TournamentPopoverProps["data"] = [
  {
    id: "team-1",
    name: "Novo Campeonato",
    logo: `${CONFIG.assetsDir}/assets/icons/frames/trophy.svg`,
  },
];
