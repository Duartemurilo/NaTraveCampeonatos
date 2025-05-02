import type { useRouter } from "next/navigation";
import type {
  ITournamentDraftUpdateDto,
  ITournamentDraftCreationDto,
  ITournamentFormatCreationDto,
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
  const formatCreate = useCreate<ITournamentFormatCreationDto>();

  const { create: createDraft, isLoading: isCreatingDraft } = draftCreate;
  const { patch: updateDraft, isLoading: isUpdatingDraft } = draftUpdate;
  const { patch: setPeriodLocation, isLoading: isSetPerAndLoc } = periodAndLocationUpdate;
  const { create: createFormat, isLoading: isCreatingFormat } = formatCreate;

  const { mutate } = useMutate();

  const handleDraftStep = async (data: TournamentDraftSchemaType, tournamentId: string) => {
    if (tournamentId) {
      await updateDraft({
        formData: normalizeEditTournamentDraft(data, tournamentId),
        endpoint: endpoints.tournament.updateDraft,
        successMessage: "Informações atualizadas com sucesso!",
        errorMessage: "Erro ao atualizar as informações.",
        onSuccess: () => {
          mutate(SWR_KEYS.getTournamentDraft);
          router.push(getRoute(1, tournamentId));
        },
      });
    } else {
      await createDraft({
        formData: normalizeCreateTournamentDraft(data),
        endpoint: endpoints.tournament.createDraft,
        errorMessage: "Erro ao criar o rascunho do torneio.",
        onSuccess: (res: ITournamentDraftCreationResponse) => {
          router.push(getRoute(1, res.tournamentId.toString()));
        },
      });
    }
  };

  const handlePeriodAndLocationStepSubmit = async (
    data: TournamentPeriodAndLocationSchemaType,
    tournamentId: string,
    isEditing: boolean
  ) => {
    await setPeriodLocation({
      formData: normalizeUpdateTournamentPeriodAndLocation(data, tournamentId),
      endpoint: endpoints.tournament.setPeriodLocation,
      successMessage: isEditing ? "Torneio atualizado com sucesso!" : "",
      errorMessage: "Erro ao atualizar o torneio.",
      onSuccess: () => router.push(getRoute(2, tournamentId)),
    });
  };

  const handleFormatStepSubmit = async (data: TournamentFormatSchemaType, tournamentId: string) => {
    await createFormat({
      formData: normalizeTournamentFormatForCreate(data, tournamentId),
      endpoint: endpoints.tournament.createFormat,
      successMessage: "Torneio criado com sucesso!",
      errorMessage: "Erro ao criar o formato do torneio.",
      onSuccess: () => router.push(paths.dashboard.tournaments.list),
    });
  };

  const isUpdating = isUpdatingDraft || isSetPerAndLoc;
  const isCreating = isCreatingDraft || isCreatingFormat;

  const isLoading = isUpdating || isCreating;

  return { handleDraftStep, handleFormatStepSubmit, handlePeriodAndLocationStepSubmit, isLoading };
}
