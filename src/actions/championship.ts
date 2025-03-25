import type { SWRConfiguration } from "swr";
import type { PaginatedResponse } from "src/types/requests.types";
import type { IChampionship, IChampionshipInput } from "src/types/championship";

import { useMemo } from "react";
import useSWR, { mutate } from "swr";

import axios, { fetcher, endpoints } from "src/lib/axios";

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------
// Hook para obter a lista de campeonatos (paginada)
// ----------------------------------------------------------------------
export function useGetChampionships() {
  const url = endpoints.championship.list;

  const { data, isLoading, error, isValidating } = useSWR<PaginatedResponse<IChampionship>>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      championships: data?.items || [],
      totalCount: data?.totalCount || 0,
      pageNumber: data?.pageNumber || 1,
      pageSize: data?.pageSize || 10,
      hasNextPage: data?.hasNextPage || false,
      hasPreviousPage: data?.hasPreviousPage || false,
      championshipsLoading: isLoading,
      championshipsError: error,
      championshipsValidating: isValidating,
      championshipsEmpty: !isLoading && !(data?.items?.length ?? 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Hook para obter os detalhes de um campeonato específico
// ----------------------------------------------------------------------
type ChampionshipDetailResponse = {
  item: IChampionship;
};

export function useGetChampionship(id: string) {
  const url = id ? [endpoints.championship.details, { params: { id } }] : "";
  const { data, isLoading, error, isValidating } = useSWR<ChampionshipDetailResponse>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      championship: data?.item,
      championshipLoading: isLoading,
      championshipError: error,
      championshipValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Função para criar um novo campeonato
// ----------------------------------------------------------------------
export async function createChampionship(championshipInput: IChampionshipInput) {
  const url = endpoints.championship.create;
  const payload = { championshipInput };

  const res = await axios.post(url, payload);
  const newChampionship: IChampionship = res.data.item;

  // Atualiza o cache local com o novo campeonato, garantindo todos os campos obrigatórios
  mutate(
    endpoints.championship.list,
    (currentData?: PaginatedResponse<IChampionship>) => {
      if (currentData) {
        return {
          ...currentData,
          totalCount: currentData.totalCount + 1,
          items: [...currentData.items, newChampionship],
        };
      }
      return {
        totalCount: 1,
        pageNumber: 1,
        pageSize: 10,
        hasNextPage: false,
        hasPreviousPage: false,
        items: [newChampionship],
      };
    },
    false
  );

  return res.data;
}

// ----------------------------------------------------------------------
// Função para atualizar um campeonato existente
// ----------------------------------------------------------------------
export async function updateChampionship(
  championshipInput: Partial<IChampionshipInput> & { id: string }
) {
  const url = endpoints.championship.update;
  const payload = { championshipInput };

  const res = await axios.put(url, payload);
  const updatedChampionship: IChampionship = res.data.item;

  mutate(
    endpoints.championship.list,
    (currentData?: PaginatedResponse<IChampionship>) => {
      if (currentData) {
        const updatedItems = currentData.items.map((champ: { id: string }) =>
          champ.id === updatedChampionship.id ? updatedChampionship : champ
        );
        return { ...currentData, items: updatedItems };
      }
      return {
        totalCount: 1,
        pageNumber: 1,
        pageSize: 10,
        hasNextPage: false,
        hasPreviousPage: false,
        items: [updatedChampionship],
      };
    },
    false
  );

  return res.data;
}

// ----------------------------------------------------------------------
// Função para deletar um campeonato (opcional)
// ----------------------------------------------------------------------
export async function deleteChampionship(championshipId: string) {
  const url = endpoints.championship.delete;
  const payload = { championshipId };

  const res = await axios.delete(url, { data: payload });

  // Atualiza o cache local removendo o campeonato deletado
  mutate(
    endpoints.championship.list,
    (currentData?: PaginatedResponse<IChampionship>) => {
      if (currentData) {
        const filteredItems = currentData.items.filter(
          (champ: { id: string }) => champ.id !== championshipId
        );
        return {
          ...currentData,
          totalCount: currentData.totalCount - 1,
          items: filteredItems,
        };
      }
      return {
        totalCount: 0,
        pageNumber: 1,
        pageSize: 10,
        hasNextPage: false,
        hasPreviousPage: false,
        items: [],
      };
    },
    false
  );

  return res.data;
}
