import type { Metadata } from "next";

import * as React from "react";

import { CONFIG } from "src/global-config";

import { ClerkVerifyEmailView } from "src/auth/view/auth/verifiy-email/clerk-verify-email";

export const metadata: Metadata = { title: `Cadastro | Clerk - ${CONFIG.appName}` };

export default function Page() {
  return <ClerkVerifyEmailView />;
}
