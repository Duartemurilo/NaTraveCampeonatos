import type { Metadata } from "next";

import { CONFIG } from "src/global-config";

import { ClerkResetPasswordView } from "src/auth/view/clerk/reset-password/clerk-reset-password-view";

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Login - ${CONFIG.appName}` };

export default function Page() {
  return <ClerkResetPasswordView />;
}
