import { CONFIG } from "src/global-config";
import { ChampionshipLayout } from "src/layouts/championship-layout";

import { AuthGuard } from "src/auth/guard";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <ChampionshipLayout>{children}</ChampionshipLayout>;
  }

  return (
    <AuthGuard>
      <ChampionshipLayout>{children}</ChampionshipLayout>
    </AuthGuard>
  );
}
