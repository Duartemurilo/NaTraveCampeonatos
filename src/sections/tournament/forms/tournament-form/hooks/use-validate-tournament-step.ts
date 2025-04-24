import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getRoute } from "../routes/tournament-routes";

import type { TournamentStep } from "../types";

export function useValidateTournamentStep(
  currentStep: TournamentStep,
  tournamentId?: string | null
) {
  const router = useRouter();

  useEffect(() => {
    if (![0, 1, 2].includes(currentStep)) {
      router.replace(getRoute(0));
    }

    if ((currentStep === 1 || currentStep === 2) && !tournamentId) {
      router.replace(getRoute(0));
    }
  }, [currentStep, tournamentId, router]);
}
