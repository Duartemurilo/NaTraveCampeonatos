"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import { paths } from "src/routes/paths";
import { useRouter, usePathname } from "src/routes/hooks";

import { useForceDarkMode } from "src/hooks/use-force-dark-mode";

import { SplashScreen } from "src/components/loading-screen";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  useForceDarkMode();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      const queryString = new URLSearchParams({ returnTo: pathname }).toString();
      const signUpPath = paths.auth.clerk.signUp;
      const redirectPath = `${signUpPath}?${queryString}`;
      router.replace(redirectPath);
    }
  }, [isLoaded, isSignedIn, pathname, router]);

  if (!isLoaded || !isSignedIn) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
