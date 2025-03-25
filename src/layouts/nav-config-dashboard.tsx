import type { NavSectionProps } from "src/components/nav-section";

import { paths } from "src/routes/paths";

import { CONFIG } from "src/global-config";

import { SvgColor } from "src/components/svg-color";

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.webp`} />
);

const ICONS = {
  trophy: icon("trophy"),
};

export const navData: NavSectionProps["data"] = [
  {
    subheader: "Campeonatos",
    items: [
      {
        title: "Campeonatos",
        path: paths.dashboard.championships.root,
        icon: ICONS.trophy,
        children: [
          { title: "Lista", path: paths.dashboard.championships.cards },
          { title: "Criar", path: paths.dashboard.championships.new },
        ],
      },
    ],
  },
];
