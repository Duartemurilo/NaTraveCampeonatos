import type { useRouter } from "next/navigation";
import type {
  ITournamentDraftUpdateDto,
  ITournamentDraftCreationDto,
  ITournamentFormatCreationDto,
  ITournamentDraftUpdateResponse,
  ITournamentDraftCreationResponse,
} from "@natrave/tournaments-service-types";

import { paths } from "src/routes/paths";

import { usePatch } from "src/hooks/request/use-patch";
import { useCreate } from "src/hooks/request/use-create";

import { endpoints } from "src/lib/axios";

import { getRoute } from "../routes/tournament-routes";
import {
  normalizeTournamentDates,
  normalizeEditTournamentDraft,
  normalizeCreateTournamentDraft,
  normalizeTournamentFormatForCreate,
} from "../normalizers/tournament-normalizers";

import type {
  ITournamentFinalizeDto,
  TournamentDraftSchemaType,
  TournamentDatesSchemaType,
  TournamentFormatSchemaType,
  ITournamentFinalizeResponse,
} from "../types";

export function useTournamentFormHandler(router: ReturnType<typeof useRouter>) {
  const { create: createDraft, isLoading: isCreatingDraft } = useCreate<
    ITournamentDraftCreationDto,
    ITournamentDraftCreationResponse
  >();
  const { patch: updateDraft, isLoading: isUpdatingDraft } = usePatch<
    ITournamentDraftUpdateDto,
    ITournamentDraftUpdateResponse
  >();

  const { create: createFormat, isLoading: isCreatingFormat } = useCreate<
    ITournamentFormatCreationDto,
    void
  >();

  const { create: finalizeTournament, isLoading: isCreatingFinalizing } = useCreate<
    ITournamentFinalizeDto,
    ITournamentFinalizeResponse
  >();
  const { patch: updateFinalizeTournament, isLoading: isUpdatingFinalize } = usePatch<
    ITournamentFinalizeDto,
    ITournamentFinalizeResponse
  >();

  const handleDraftStep = async (data: TournamentDraftSchemaType, tournamentId: string) => {
    if (tournamentId) {
      await updateDraft({
        id: tournamentId,
        formData: normalizeEditTournamentDraft(data, tournamentId),
        endpoint: endpoints.tournament.updateDraft,
        successMessage: "Informações atualizadas com sucesso!",
        errorMessage: "Erro ao atualizar as informações.",
        onSuccess: () => router.push(getRoute(1, tournamentId)),
      });
    } else {
      await createDraft({
        formData: normalizeCreateTournamentDraft(data),
        endpoint: endpoints.tournament.createDraft,
        successMessage: "Rascunho do torneio criado com sucesso!",
        errorMessage: "Erro ao criar o rascunho do torneio.",
        onSuccess: (res: ITournamentDraftCreationResponse) => {
          router.push(getRoute(2, res.tournamentId.toString()));
        },
      });
    }
  };

  const handleDatesStepSubmit = async (
    data: TournamentDatesSchemaType,
    tournamentId: string,
    isEditing: boolean
  ) => {
    if (isEditing) {
      await updateFinalizeTournament({
        id: tournamentId,
        formData: normalizeTournamentDates(data, tournamentId),
        endpoint: endpoints.tournament.updateFinalize,
        successMessage: "Torneio atualizado com sucesso!",
        errorMessage: "Erro ao atualizar o torneio.",
        onSuccess: () => router.push(getRoute(2, tournamentId)),
      });
    } else {
      await finalizeTournament({
        formData: normalizeTournamentDates(data, tournamentId),
        endpoint: endpoints.tournament.createFinalize,
        successMessage: "Torneio criado com sucesso!",
        errorMessage: "Erro ao finalizar o torneio.",
        onSuccess: () => router.push(getRoute(2, tournamentId)),
      });
    }
  };

  const handleFormatStepSubmit = async (data: TournamentFormatSchemaType, tournamentId: string) => {
    await createFormat({
      formData: normalizeTournamentFormatForCreate(data, tournamentId),
      endpoint: endpoints.tournament.createFormat,
      successMessage: "Formato do torneio criado com sucesso!",
      errorMessage: "Erro ao criar o formato do torneio.",
      onSuccess: () => router.push(paths.dashboard.tournaments.list),
    });
  };

  const isUpdating = isUpdatingDraft || isUpdatingFinalize;
  const isCreating = isCreatingDraft || isCreatingFormat || isCreatingFinalizing;

  const isLoading = isUpdating || isCreating;

  return { handleDraftStep, handleFormatStepSubmit, handleDatesStepSubmit, isLoading };
}
