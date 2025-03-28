type ErrorWithResponse = {
  response?: {
    data?: {
      messages?: string[];
    };
  };
};

export function isErrorWithResponse(err: any): err is Error & ErrorWithResponse {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    "response" in err &&
    typeof err.response === "object"
  );
}

export const buildErrorMessage = (err: unknown, defaultMessage = "Erro ao executar ação") => {
  const messagesArray: string[] = isErrorWithResponse(err)
    ? err.response?.data?.messages || [err.message]
    : [defaultMessage];

  return messagesArray[0];
};
