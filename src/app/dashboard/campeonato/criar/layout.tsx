import { CONFIG } from "src/global-config";
import { WizardLayout } from "src/layouts/wizard-layout";

import { AuthGuard } from "src/auth/guard";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <WizardLayout>{children}</WizardLayout>;
  }

  return (
    <AuthGuard>
      <WizardLayout>{children}</WizardLayout>
    </AuthGuard>
  );
}
