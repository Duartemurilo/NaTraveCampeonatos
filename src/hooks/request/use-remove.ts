import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

import useToast from "src/components/toast-context/context/toast-context";

import httpRequest from "src/auth/http-client";

import useLoading from "../use-loading";

import type { UseLoadingReturn } from "../use-loading";

export interface RemoveProps {
  endpoint: string;
  id: number | string;
  onSuccess?: () => void;
  onError?: () => void;
  successMessage?: string;
  errorMessage?: string;
}

export interface UseRemoveReturn extends UseLoadingReturn {
  remove: (props: RemoveProps) => Promise<void>;
  error: unknown;
}

export function useRemove(): UseRemoveReturn {
  const { isLoading, startLoading, endLoading, loadingIcon } = useLoading();
  const { showToast } = useToast();
  const { getToken } = useAuth();
  const [error, setError] = useState<unknown>(null);

  const remove = async ({
    endpoint,
    id,
    onSuccess,
    onError,
    successMessage = "",
    errorMessage = "",
  }: RemoveProps): Promise<void> => {
    startLoading();
    try {
      const token = await getToken();

      const config = {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      await httpRequest.delete(`${endpoint}/${id}`, config);
      if (onSuccess) onSuccess();
      if (successMessage) showToast({ text: successMessage, type: "success" });
    } catch (err) {
      setError(err);
      const message = errorMessage || "Erro ao remover item.";
      showToast({ text: message, type: "error" });
      if (onError) onError();
      throw err;
    } finally {
      endLoading();
    }
  };

  return {
    remove,
    isLoading,
    error,
    startLoading,
    endLoading,
    loadingIcon,
  };
}
