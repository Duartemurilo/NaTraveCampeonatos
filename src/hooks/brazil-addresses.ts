import useSWR from "swr";
import { useMemo } from "react";

import { CONFIG } from "src/global-config";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export type StateOption = {
  label: string;
  value: string;
};

export type CityOption = {
  label: string;
  value: string;
};

export function useStates() {
  const url = `${CONFIG.brasilapiUrl}/api/ibge/uf/v1`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  const states: StateOption[] = useMemo(
    () =>
      data?.map((state: any) => ({
        label: state.nome,
        value: state.sigla,
      })) || [],
    [data]
  );

  return { states, isLoading, error };
}

export function useCities(selectedState?: string) {
  const url = selectedState
    ? `${CONFIG.brasilapiUrl}/api/ibge/municipios/v1/${selectedState}`
    : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  const cities: CityOption[] = useMemo(
    () =>
      data?.map((city: any) => ({
        label: city.nome,
        value: city.nome,
      })) || [],
    [data]
  );

  return { cities, isLoading, error };
}
