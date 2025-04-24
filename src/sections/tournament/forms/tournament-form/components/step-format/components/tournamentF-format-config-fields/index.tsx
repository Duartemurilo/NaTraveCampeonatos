// ChampionshipFormatConfigFields.tsx

"use client";

import { useWatch, useFormContext } from "react-hook-form";
import { TournamentFormat } from "@natrave/tournaments-service-types";

import KnockoutFields from "../knockout-fields";
import RoundRobinFields from "../round-robin-fields";
import GroupAndKnockoutFields from "../group-and-knockout-fields";
import RoundRobinAndKnockoutFields from "../round-robin-and-knockout-fields";

export default function TournamentFormatConfigFields() {
  const { control } = useFormContext();

  const format = useWatch({ control, name: "format" });

  switch (format) {
    case TournamentFormat.ROUND_ROBIN:
      return <RoundRobinFields />;
    case TournamentFormat.KNOCKOUT:
      return <KnockoutFields />;
    case TournamentFormat.GROUPS_AND_KNOCKOUT:
      return <GroupAndKnockoutFields />;
    case TournamentFormat.ROUND_ROBIN_AND_KNOCKOUT:
      return <RoundRobinAndKnockoutFields />;
    default:
      return null;
  }
}
