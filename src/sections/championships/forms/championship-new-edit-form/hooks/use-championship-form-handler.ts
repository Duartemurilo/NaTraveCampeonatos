import type { useRouter } from "next/navigation";

import { paths } from "src/routes/paths";

import { useCreate } from "src/hooks/request/use-create";
import { useUpdate } from "src/hooks/request/use-update";

import { endpoints } from "src/auth/constants";

import { getRoute } from "../routes/championship-routes";
import {
  normalizeChampionshipDates,
  normalizeChampionshipFormat,
  normalizeEditChampionshipInfo,
  normalizeCreateChampionshipInfo,
} from "../normalizers/championship-normalizers";

import type {
  ChampionshipPayload,
  ChampionshipResponse,
  ChampionshipInfoSchemaType,
  ChampionshipDatesSchemaType,
  ChampionshipFormatSchemaType,
} from "../types";

export function useChampionshipFormHandler(router: ReturnType<typeof useRouter>) {
  const { create, isLoading: isCreating } = useCreate<ChampionshipPayload, ChampionshipResponse>();
  const { update, isLoading: isUpdating } = useUpdate<ChampionshipPayload, ChampionshipResponse>();

  const handleInfoStepSubmit = async (
    data: ChampionshipInfoSchemaType,
    championshipId: string | null
  ) => {
    if (championshipId) {
      await update({
        id: championshipId,
        formData: normalizeEditChampionshipInfo(data),
        endpoint: endpoints.championship.updateDraft,
        successMessage: "Informações atualizadas com sucesso!",
        errorMessage: "Erro ao atualizar as informações.",
        onSuccess: () => router.push(getRoute(1, championshipId)),
      });
    } else {
      const res = await create({
        formData: normalizeCreateChampionshipInfo(data),
        endpoint: endpoints.championship.createDraft,
        successMessage: "Rascunho do campeonato criado com sucesso!",
        errorMessage: "Erro ao criar o rascunho do campeonato.",
      });
      router.push(getRoute(1, res.id));
    }
  };

  const handleFormatStepSubmit = async (
    data: ChampionshipFormatSchemaType,
    championshipId: string | null
  ) => {
    if (championshipId) {
      await update({
        id: championshipId,
        formData: normalizeChampionshipFormat(data, championshipId),
        endpoint: endpoints.championship.updateFormat,
        successMessage: "Formato atualizado com sucesso!",
        errorMessage: "Erro ao atualizar o formato.",
        onSuccess: () => router.push(getRoute(2, championshipId)),
      });
    } else {
      await create({
        formData: normalizeChampionshipFormat(data, championshipId),
        endpoint: endpoints.championship.createFormat,
        successMessage: "Formato do campeonato criado com sucesso!",
        errorMessage: "Erro ao criar o formato do campeonato.",
        onSuccess: () => router.push(getRoute(1, championshipId)),
      });
    }
  };

  const handleDatesStepSubmit = async (
    data: ChampionshipDatesSchemaType,
    championshipId: string
  ) => {
    if (championshipId) {
      await update({
        id: championshipId,
        formData: normalizeChampionshipDates(data, championshipId),
        endpoint: endpoints.championship.finalize,
        successMessage: "Campeonato criado com sucesso!",
        errorMessage: "Erro ao finalizar o campeonato.",
        onSuccess: () => router.push(paths.dashboard.home.root),
      });
    }
  };

  const isLoading = isCreating || isUpdating;

  return { handleInfoStepSubmit, handleFormatStepSubmit, handleDatesStepSubmit, isLoading };
}
