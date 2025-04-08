import type { NavSectionProps } from "src/components/nav-section";

import { paths } from "src/routes/paths";

import { CONFIG } from "src/global-config";

import { SvgColor } from "src/components/svg-color";

const iconWebp = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.webp`} />
);

const iconSvg = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  trophy: iconWebp("trophy"),
  home: iconSvg("ic-home"),
};

export const navData: NavSectionProps["data"] = [
  {
    subheader: "Campeonatos",
    items: [
      {
        title: "Home",
        path: paths.dashboard.home.root,
        icon: ICONS.home,
      },
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
