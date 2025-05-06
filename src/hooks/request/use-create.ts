import type { TRequestData } from "src/auth/http-client";
import type { RequestsProps } from "src/types/requests.types";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

import useToast from "src/components/toast-context/context/toast-context";

import httpRequest from "src/auth/http-client";
import { getErrorMessage } from "src/auth/utils";

import useLoading from "../use-loading";

import type { UseLoadingReturn } from "../use-loading";

export type UseCreateReturn<TInput, TOutput = void> = {
  create: (props: { formData: TInput } & RequestsProps) => Promise<TOutput>;
  error: unknown;
} & UseLoadingReturn;

export function useCreate<TInput extends TRequestData, TOutput = void>(): UseCreateReturn<
  TInput,
  TOutput
> {
  const { isLoading, startLoading, endLoading, loadingIcon } = useLoading();
  const { showToast } = useToast();
  const { getToken } = useAuth();
  const [error, setError] = useState<unknown>(null);

  const create = async ({
    formData,
    endpoint,
    onSuccess,
    onError,
    successMessage = "",
  }: { formData: TInput } & RequestsProps): Promise<TOutput> => {
    startLoading();
    try {
      const token = await getToken();

      const config = {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      const response = await httpRequest.post<TOutput>(endpoint, formData, config);
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

  return { create, isLoading, error, startLoading, endLoading, loadingIcon };
}
