"use client";

import { AuthCenteredLayout } from "src/layouts/auth-centered";

import { GuestGuard } from "src/auth/guard";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  /*   useForceLightMode(); */

  return (
    <GuestGuard isSignUp>
      <AuthCenteredLayout ignoreHeader>{children}</AuthCenteredLayout>
    </GuestGuard>
  );
}
