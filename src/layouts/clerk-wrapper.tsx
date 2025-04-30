"use client";

// ← ESSENCIAL: marca como Client Component

import type { ReactNode } from "react";

import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      localization={ptBR}
      // Opcionalmente, force a API se necessário:
      // frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
      // publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
}
