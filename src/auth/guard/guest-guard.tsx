"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import { useSearchParams } from "src/routes/hooks";

import { CONFIG } from "src/global-config";

import { SplashScreen } from "src/components/loading-screen";

type GuestGuardProps = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: GuestGuardProps) {
  const { isSignedIn, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || CONFIG.auth.redirectPath;

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = returnTo;
    }
  }, [isLoaded, isSignedIn, returnTo]);

  if (!isLoaded || isSignedIn) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
