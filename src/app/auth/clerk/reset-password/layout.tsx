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
          section: {
            title: "Recupere sua senha",
            subtitle:
              "Informe seu email para receber um código de recuperação e redefinir sua senha.",
          },
        }}
      >
        {children}
      </AuthSplitLayout>
    </GuestGuard>
  );
}
