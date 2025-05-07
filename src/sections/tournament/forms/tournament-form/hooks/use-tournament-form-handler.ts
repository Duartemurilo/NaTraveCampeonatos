import type { useRouter } from "next/navigation";
import type {
  ITournamentSetupDto,
  ITournamentDraftUpdateDto,
  ITournamentDraftCreationDto,
  ITournamentDraftUpdateResponse,
  ITournamentDraftCreationResponse,
  ITournamentPeriodAndLocationSetDto,
} from "@natrave/tournaments-service-types";

import { paths } from "src/routes/paths";

import useMutate from "src/hooks/use-mutate";
import { usePatch } from "src/hooks/request/use-patch";
import { useCreate } from "src/hooks/request/use-create";

import { endpoints } from "src/lib/axios";
import { SWR_KEYS } from "src/constants/swr-keys";

import { getRoute } from "../routes/tournament-routes";
import {
  normalizeEditTournamentDraft,
  normalizeCreateTournamentDraft,
  normalizeTournamentFormatForCreate,
  normalizeUpdateTournamentPeriodAndLocation,
} from "../normalizers/tournament-normalizers";

import type {
  TournamentDraftSchemaType,
  TournamentFormatSchemaType,
  TournamentPeriodAndLocationSchemaType,
} from "../types";

export function useTournamentFormHandler(router: ReturnType<typeof useRouter>) {
  const draftCreate = useCreate<ITournamentDraftCreationDto, ITournamentDraftCreationResponse>();
  const draftUpdate = usePatch<ITournamentDraftUpdateDto, ITournamentDraftUpdateResponse>();

  const periodAndLocationUpdate = usePatch<ITournamentPeriodAndLocationSetDto>();
  const formatCreate = useCreate<ITournamentSetupDto>();

  const { create: createDraft, isLoading: isCreatingDraft } = draftCreate;
  const { patch: updateDraft, isLoading: isUpdatingDraft } = draftUpdate;
  const { patch: setPeriodLocation, isLoading: isSetPerAndLoc } = periodAndLocationUpdate;
  const { create: createFormat, isLoading: isCreatingFormat } = formatCreate;

  const { mutate } = useMutate();

  const handleDraftStep = async (data: TournamentDraftSchemaType, tournamentId?: number) => {
    if (tournamentId) {
      await updateDraft({
        formData: normalizeEditTournamentDraft(data, tournamentId.toString()),
        endpoint: endpoints.tournament.updateDraft,
        errorMessage: "Não foi possível atualizar os dados. Tente novamente.",
        onSuccess: () => {
          mutate(SWR_KEYS.getTournamentDraft);
          router.push(getRoute(1, tournamentId.toString()));
        },
      });
    } else {
      await createDraft({
        formData: normalizeCreateTournamentDraft(data),
        endpoint: endpoints.tournament.createDraft,
        errorMessage: "Não foi possível criar o rascunho do torneio. Tente novamente.",
        onSuccess: (res: ITournamentDraftCreationResponse) => {
          router.push(getRoute(1, res.tournamentId.toString()));
        },
      });
    }
  };

  const handlePeriodAndLocationStepSubmit = async (
    data: TournamentPeriodAndLocationSchemaType,
    tournamentId: number
  ) => {
    await setPeriodLocation({
      formData: normalizeUpdateTournamentPeriodAndLocation(data, tournamentId.toString()),
      endpoint: endpoints.tournament.setPeriodLocation,
      errorMessage: "Não foi possível salvar período e localização. Tente novamente.",
      onSuccess: () => {
        mutate(SWR_KEYS.getTournamentDraft);
        router.push(getRoute(2, tournamentId.toString()));
      },
    });
  };

  const handleFormatStepSubmit = async (
    data: TournamentFormatSchemaType,
    tournamentId: number,
    options?: { onSuccess?: () => void }
  ) => {
    await createFormat({
      formData: normalizeTournamentFormatForCreate(data, tournamentId.toString()),
      endpoint: endpoints.tournament.createSetup,
      errorMessage: "Não foi possível salvar o formato do torneio. Tente novamente.",
      onSuccess: () => {
        if (options?.onSuccess) options.onSuccess();
        router.push(paths.dashboard.tournaments.list);
      },
    });
  };

  const isUpdating = isUpdatingDraft || isSetPerAndLoc;
  const isCreating = isCreatingDraft || isCreatingFormat;

  const isLoading = isUpdating || isCreating;

  return {
    handleDraftStep,
    handleFormatStepSubmit,
    handlePeriodAndLocationStepSubmit,
    isLoading,
    isCreatingFormat,
  };
}
