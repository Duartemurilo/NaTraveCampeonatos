import type { Metadata } from "next";

import { CONFIG } from "src/global-config";

import { ClerkSignUpView } from "src/auth/view/clerk";

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Cadastro - ${CONFIG.appName}` };

export default function Page() {
  return <ClerkSignUpView />;
}
