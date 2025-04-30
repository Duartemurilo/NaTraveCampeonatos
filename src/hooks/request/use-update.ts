import type { TRequestData } from "src/auth/http-client";
import type { RequestsProps } from "src/types/requests.types";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

import useToast from "src/components/toast-context/context/toast-context";

import httpRequest from "src/auth/http-client";
import { getErrorMessage } from "src/auth/utils";

import useLoading from "../use-loading";

import type { UseLoadingReturn } from "../use-loading";

export type UseUpdateReturn<TInput, TOutput = void> = {
  update: (
    props: { id: number | string; formData: TInput; endpoint: string } & RequestsProps
  ) => Promise<TOutput>;
  error: unknown;
} & UseLoadingReturn;

export function useUpdate<TInput extends TRequestData, TOutput = void>(): UseUpdateReturn<
  TInput,
  TOutput
> {
  const { isLoading, startLoading, endLoading, loadingIcon } = useLoading();
  const { showToast } = useToast();
  const { getToken } = useAuth();
  const [error, setError] = useState<unknown>(null);

  const update = async ({
    id,
    formData,
    endpoint,
    onSuccess,
    onError,
    successMessage = "",
  }: {
    id: number | string;
    formData: TInput;
    endpoint: string;
  } & RequestsProps): Promise<TOutput> => {
    startLoading();
    try {
      const token = await getToken();

      const config = {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      const endpointWithId = `${endpoint}/${id}`;
      const response = await httpRequest.put<TOutput>(endpointWithId, formData, config);

      if (onSuccess) onSuccess(response);
      if (successMessage) showToast({ text: successMessage, type: "success" });
      return response;
    } catch (err) {
      setError(err);
      const message = getErrorMessage(err);
      showToast({ text: message, type: "error" });
      if (onError) onError();
      throw err;
    } finally {
      endLoading();
    }
  };

  return { update, isLoading, error, startLoading, endLoading, loadingIcon };
}
