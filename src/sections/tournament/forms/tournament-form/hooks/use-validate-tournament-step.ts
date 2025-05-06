import { useEffect } from "react";
import {
  TournamentStatus,
  type ITournamentDraftFetchResponse,
} from "@natrave/tournaments-service-types";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import { getRoute } from "../routes/tournament-routes";

import type { TournamentStep } from "../types";

type Props = {
  currentStep: TournamentStep;
  tournament: ITournamentDraftFetchResponse | null;
  isLoading: boolean;
};

export function useValidateTournamentStep({ currentStep, tournament, isLoading }: Props): void {
  const router = useRouter();

  useEffect(() => {
    // 0) se já estiver publicado (não for draft), manda pra lista e sai
    if (!isLoading && tournament?.status !== TournamentStatus.DRAFT) {
      router.push(paths.dashboard.tournaments.list);
      return;
    }
    if (isLoading) return;

    const idStr = tournament?.tournamentId?.toString();
    const hasId = Boolean(idStr);
    const hasInfo =
      Boolean(tournament?.name) && Boolean(tournament?.gender) && Boolean(tournament?.modality);
    const hasDates =
      tournament?.city != null &&
      tournament?.state != null &&
      tournament?.initialDate != null &&
      tournament?.endDate != null;

    // 1) índice inválido → passo 0, preservando o id se existir
    if (![0, 1, 2].includes(currentStep)) {
      router.replace(getRoute(0, hasId ? idStr : undefined));
      return;
    }

    // 2) steps 1 e 2 requerem ID
    if ((currentStep === 1 || currentStep === 2) && !hasId) {
      router.replace(getRoute(0));
      return;
    }

    // 3) step 1 requer info
    if (currentStep === 1 && !hasInfo) {
      router.replace(getRoute(0, idStr));
      return;
    }

    // 4) step 2 requer info + dates
    if (currentStep === 2) {
      if (!hasInfo) {
        router.replace(getRoute(0, idStr));
        return;
      }
      if (!hasDates) {
        router.replace(getRoute(1, idStr));
        return;
      }
    }
  }, [currentStep, tournament, isLoading, router]);
}
