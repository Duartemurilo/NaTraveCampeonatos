import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import dayjs from "dayjs";

import type { TournamentDraftSchemaType, TournamentPeriodAndLocationSchemaType } from "../types";

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
