"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  TournamentStatus,
  type ITournamentDraftFetchResponse,
} from "@natrave/tournaments-service-types";

import { paths } from "src/routes/paths";

export function useRedirectIfInvalidTournamentStatus(
  tournament: ITournamentDraftFetchResponse | null
) {
  const router = useRouter();

  useEffect(() => {
    if (!tournament) return;

    const invalidStatuses = [TournamentStatus.DRAFT, TournamentStatus.FORMAT_DRAFT];

    if (invalidStatuses.includes(tournament.status)) {
      router.push(paths.dashboard.tournaments.criar(0));
    }
  }, [tournament, router]);
}
