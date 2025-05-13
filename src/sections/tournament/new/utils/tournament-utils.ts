import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";
import type {
  TournamentDraftSchemaType,
  TournamentPeriodAndLocationSchemaType,
} from "src/templates/tournament-form/types";

import dayjs from "dayjs";

export function isPowerOfTwo(n: number): boolean {
  return n > 0 && Number.isInteger(Math.log2(n));
}

export function getValidGroupCounts(totalTeams: number): number[] {
  const validGroupCounts: number[] = [];
  for (let groupCount = 2; groupCount <= totalTeams; groupCount++) {
    if (totalTeams % groupCount !== 0) continue;
    const teamsPerGroup = totalTeams / groupCount;
    if (teamsPerGroup < 2) continue;
    let hasValid = false;
    for (let adv = 1; adv <= teamsPerGroup; adv++) {
      const totalClassified = groupCount * adv;
      if (isPowerOfTwo(totalClassified)) {
        hasValid = true;
        break;
      }
    }
    if (hasValid) validGroupCounts.push(groupCount);
  }
  return validGroupCounts;
}

export function getValidAdvancingPerGroupOptions(
  totalTeams: number,
  selectedGroupCount: number | null
): number[] {
  if (selectedGroupCount === null || totalTeams % selectedGroupCount !== 0) return [];

  const teamsPerGroup = totalTeams / selectedGroupCount;
  const validOptions: number[] = [];

  for (let adv = 1; adv <= teamsPerGroup; adv++) {
    const totalClassified = selectedGroupCount * adv;
    if (isPowerOfTwo(totalClassified)) validOptions.push(adv);
  }

  return validOptions;
}

export function isStepInfoChanged(
  draftValues: TournamentDraftSchemaType,
  tournament: ITournamentDraftFetchResponse | null
) {
  if (!tournament) return true;
  return (
    draftValues.name !== tournament.name ||
    draftValues.gender !== tournament.gender ||
    draftValues.modality !== tournament.modality
  );
}

export function isStepPeriodAndLocationChanged(
  values: TournamentPeriodAndLocationSchemaType,
  tournament: ITournamentDraftFetchResponse | null
) {
  if (!tournament) return true;

  return (
    values.state !== tournament.state ||
    values.city !== tournament.city ||
    !dayjs(values.initialDate).isSame(tournament.initialDate, "day") ||
    !dayjs(values.endDate).isSame(tournament.endDate, "day")
  );
}
