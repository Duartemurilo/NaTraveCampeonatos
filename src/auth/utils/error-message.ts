// ----------------------------------------------------------------------

import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

import {
  checkIfHasNumbers,
  checkIfHasLoweCase,
  checkIfHasUpperCase,
} from "src/utils/string-helpers";

import { clerkErrorCodeTranslations } from "./clerk-error-translations";

export function isPasswordValid(password: string): boolean {
  return (
    password.length >= 8 &&
    checkIfHasLoweCase(password) &&
    checkIfHasUpperCase(password) &&
    checkIfHasNumbers(password)
  );
}

export function getErrorMessage(error: unknown): string {
  if (isClerkAPIResponseError(error)) {
    const { code, message, longMessage } = error.errors?.[0] || {};

    if (code && clerkErrorCodeTranslations[code]) {
      return clerkErrorCodeTranslations[code];
    }

    if (message && clerkErrorCodeTranslations[message]) {
      return clerkErrorCodeTranslations[message];
    }

    return longMessage || message || "Ocorreu um erro inesperado.";
  }

  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  return "Ocorreu um erro inesperado.";
}
