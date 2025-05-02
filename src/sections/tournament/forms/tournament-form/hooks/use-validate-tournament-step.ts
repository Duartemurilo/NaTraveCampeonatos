import { useState, useEffect } from "react";

import { useRouter } from "src/routes/hooks";

import { getRoute } from "../routes/tournament-routes";

import type { TournamentStep } from "../types";

export function useValidateTournamentStep(
  currentStep: TournamentStep,
  tournamentId?: string | null
): boolean {
  const router = useRouter();
  const [isValidStep, setIsValidStep] = useState(true);

  useEffect(() => {
    const isInvalidStep = ![0, 1, 2].includes(currentStep);
    const isMissingId = (currentStep === 1 || currentStep === 2) && !tournamentId;

    if (isInvalidStep || isMissingId) {
      setIsValidStep(false);
      router.replace(getRoute(0, tournamentId));
    } else {
      setIsValidStep(true);
    }
  }, [currentStep, tournamentId, router]);

  return isValidStep;
}
