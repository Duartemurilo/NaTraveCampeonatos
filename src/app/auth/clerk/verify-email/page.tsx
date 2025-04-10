import type { Metadata } from "next";

import * as React from "react";

import { CONFIG } from "src/global-config";

import { ClerkVerifyView } from "src/auth/view/clerk/verifiy-email/clerk-verify-email";

export const metadata: Metadata = { title: `Cadastro | Clerk - ${CONFIG.appName}` };

export default function Page() {
  return <ClerkVerifyView />;
}
