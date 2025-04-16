// ChampionshipFormatConfigFields.tsx

"use client";

import { useWatch, useFormContext } from "react-hook-form";

import { ChampionshipFormat } from "src/types/championship-format";

import KnockoutFields from "../knockout-fields";
import RoundRobinFields from "../round-robin-fields";
import GroupAndKnockoutFields from "../GroupAndKnockoutFields";
import RoundRobinAndKnockoutFields from "../round-robin-and-knockout-fields";

export default function ChampionshipFormatConfigFields() {
  const { control } = useFormContext();

  const format = useWatch({ control, name: "championshipFormat" });

  switch (format) {
    case ChampionshipFormat.ROUND_ROBIN:
      return <RoundRobinFields />;
    case ChampionshipFormat.KNOCKOUT:
      return <KnockoutFields />;
    case ChampionshipFormat.GROUP_AND_KNOCKOUT:
      return <GroupAndKnockoutFields />;
    case ChampionshipFormat.ROUND_ROBIN_AND_KNOCKOUT:
      return <RoundRobinAndKnockoutFields />;
    default:
      return null;
  }
}
