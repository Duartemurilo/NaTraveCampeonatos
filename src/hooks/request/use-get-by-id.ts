import type { SWRConfiguration } from "swr";

import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";

import httpRequest from "src/auth/http-client";

export interface UseGetByIdProps<TData> {
  key: string | any[];
  endpoint: string;
  id: number | string;
  enabled?: boolean; // flag para habilitar/desabilitar a requisição; default: true
  swrConfig?: SWRConfiguration;
  transformData?: (rawData: unknown) => TData;
}

export interface UseGetByIdReturn<TData> {
  data: TData | null;
  isLoading: boolean;
  error: unknown;
}

export function useGetById<TData>({
  key,
  endpoint,
  id,
  enabled = true,
  swrConfig,
  transformData,
}: UseGetByIdProps<TData>): UseGetByIdReturn<TData> {
  const { getToken } = useAuth();

  const fetcher = async (): Promise<TData> => {
    const token = await getToken();
    const config = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    const response = await httpRequest.get<unknown>(`${endpoint}/${id}`, config);
    if (transformData) return transformData(response);
    return response as TData;
  };

  const { data, error, isValidating } = useSWR<TData>(enabled ? key : null, fetcher, {
    revalidateOnFocus: false,
    ...swrConfig,
  });

  return {
    data: data ?? null,
    isLoading: isValidating,
    error,
  };
}
