import type { Metadata } from "next";

import { CONFIG } from "src/global-config";

import { ClerkSignInView } from "src/auth/view/auth";

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Login - ${CONFIG.appName}` };

export default function Page() {
  return <ClerkSignInView />;
}
