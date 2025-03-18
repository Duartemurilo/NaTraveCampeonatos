import { AuthSplitLayout } from "src/layouts/auth-split";

import { GuestGuard } from "src/auth/guard";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthSplitLayout
        authSplitSection
        slotProps={{
          section: { title: "Crie sua conta", subtitle: "Faça o cadastro para continuar" },
        }}
      >
        {children}
      </AuthSplitLayout>
    </GuestGuard>
  );
}
