// ----------------------------------------------------------------------

import {
  checkIfHasNumbers,
  checkIfHasLoweCase,
  checkIfHasUpperCase,
} from "src/utils/string-helpers";

export function isPasswordValid(password: string): boolean {
  return (
    password.length >= 8 &&
    checkIfHasLoweCase(password) &&
    checkIfHasUpperCase(password) &&
    checkIfHasNumbers(password)
  );
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message || error.name || "An error occurred";
  }

  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object" && error !== null) {
    const errorMessage = (error as { message?: string }).message;
    if (typeof errorMessage === "string") {
      return errorMessage;
    }
  }

  return `Unknown error: ${error}`;
}
