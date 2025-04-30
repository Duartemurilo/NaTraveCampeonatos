import type { SWRConfiguration } from "swr";

import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";

import httpRequest from "src/auth/http-client";

interface UseGetProps<TData> {
  key: string | any[];
  endpoint: string;
  isPaused?: boolean;
  swrConfig?: SWRConfiguration;
  transformData?: (rawData: unknown) => TData;
}

interface UseGetReturn<TData> {
  data: TData | null;
  isLoading: boolean;
  error: any;
}

export function useGet<TData = unknown>({
  key,
  endpoint,
  isPaused = false,
  swrConfig,
  transformData,
}: UseGetProps<TData>): UseGetReturn<TData> {
  const { getToken } = useAuth();

  const fetcher = async (): Promise<TData> => {
    const token = await getToken();

    const config = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    const response = await httpRequest.get<unknown>(endpoint, config);

    if (transformData) {
      return transformData(response);
    }

    return response as TData;
  };

  const { data, error, isValidating } = useSWR<TData>(isPaused ? null : key, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    ...swrConfig,
  });

  return { data: data ?? null, error, isLoading: isValidating };
}
