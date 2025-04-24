import { CONFIG } from "src/global-config";
import { DashboardOrganizerLayout } from "src/layouts/organizer-dashboard";

import { AuthGuard } from "src/auth/guard";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <DashboardOrganizerLayout>{children}</DashboardOrganizerLayout>;
  }

  return (
    <AuthGuard>
      <DashboardOrganizerLayout>{children}</DashboardOrganizerLayout>
    </AuthGuard>
  );
}
