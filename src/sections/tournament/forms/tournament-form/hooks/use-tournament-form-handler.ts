import type { useRouter } from "next/navigation";
import type {
  ITournamentDraftUpdateDto,
  ITournamentDraftCreationDto,
  ITournamentDraftUpdateResponse,
  ITournamentDraftCreationResponse,
} from "@natrave/tournaments-service-types";

import { paths } from "src/routes/paths";

import { useCreate } from "src/hooks/request/use-create";
import { useUpdate } from "src/hooks/request/use-update";

import { endpoints } from "src/auth/constants";

import { getRoute } from "../routes/tournament-routes";
import {
  normalizeTournamentDates,
  normalizeTournamentFormat,
  normalizeEditTournamentDraft,
  normalizeCreateTournamentDraft,
} from "../normalizers/tournament-normalizers";

import type {
  ITournamentFinalizeDto,
  TournamentDraftSchemaType,
  TournamentDatesSchemaType,
  TournamentFormatSchemaType,
  ITournamentFinalizeResponse,
  ITournamentFormatCreationDto,
  ITournamentFormatCreationResponse,
} from "../types";

export function useTournamentFormHandler(router: ReturnType<typeof useRouter>) {
  //Draft ------------------------------------------------------------------
  const { create: createDraft, isLoading: isCreatingDraft } = useCreate<
    ITournamentDraftCreationDto,
    ITournamentDraftCreationResponse
  >();
  const { update: updateDraft, isLoading: isUpdatingDraft } = useUpdate<
    ITournamentDraftUpdateDto,
    ITournamentDraftUpdateResponse
  >();

  //Format ------------------------------------------------------------------

  const { create: createFormat, isLoading: isCreatingFormat } = useCreate<
    ITournamentFormatCreationDto,
    ITournamentFormatCreationResponse
  >();
  const { update: updateFormat, isLoading: isUpdatingFormat } = useUpdate<
    ITournamentFormatCreationDto,
    ITournamentFormatCreationResponse
  >();

  //Finalize ------------------------------------------------------------------

  const { create: finalizeTournament, isLoading: isFinalizing } = useCreate<
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

  const handleFormatStepSubmit = async (
    data: TournamentFormatSchemaType,
    tournamentId: string,
    isEditing: boolean
  ) => {
    console.log(isEditing);
    if (isEditing) {
      await updateFormat({
        id: tournamentId,
        formData: normalizeTournamentFormat(data, tournamentId),
        endpoint: endpoints.tournament.updateFormat,
        successMessage: "Formato do torneio atualizado com sucesso!",
        errorMessage: "Erro ao atualizar o formato do torneio.",
        onSuccess: () => router.push(getRoute(2, tournamentId)),
      });
    } else {
      console.log(normalizeTournamentFormat(data, tournamentId));
      await createFormat({
        formData: normalizeTournamentFormat(data, tournamentId),
        endpoint: endpoints.tournament.createFormat,
        successMessage: "Formato do torneio criado com sucesso!",
        errorMessage: "Erro ao criar o formato do torneio.",
        onSuccess: () => router.push(getRoute(2, tournamentId)),
      });
    }
  };

  const handleDatesStepSubmit = async (data: TournamentDatesSchemaType, tournamentId: string) => {
    if (!tournamentId) return;
    await finalizeTournament({
      formData: normalizeTournamentDates(data, tournamentId),
      endpoint: endpoints.tournament.finalize,
      successMessage: "Torneio criado com sucesso!",
      errorMessage: "Erro ao finalizar o torneio.",
      onSuccess: () => router.push(paths.dashboard.tournaments.list),
    });
  };

  const isLoading =
    isCreatingDraft || isUpdatingDraft || isCreatingFormat || isUpdatingFormat || isFinalizing;

  return { handleDraftStep, handleFormatStepSubmit, handleDatesStepSubmit, isLoading };
}
