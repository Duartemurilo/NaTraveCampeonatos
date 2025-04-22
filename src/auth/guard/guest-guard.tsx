"use client";

import { useUser } from "@clerk/clerk-react";
import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { CONFIG } from "src/global-config";

import { SplashScreen } from "src/components/loading-screen";

type GuestGuardProps = {
  children: React.ReactNode;
  isSignUp?: boolean; // 👈 novo parâmetro
};

export function GuestGuard({ children, isSignUp = false }: GuestGuardProps) {
  const { isSignedIn, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [canRedirect, setCanRedirect] = useState(!isSignUp);
  const hasRedirected = useRef(false);

  const returnTo = searchParams.get("returnTo") || CONFIG.auth.redirectPath;

  useEffect(() => {
    if (isSignUp) {
      const timer = setTimeout(() => {
        setCanRedirect(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isSignUp]);

  useEffect(() => {
    if (isLoaded && isSignedIn && canRedirect && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace(returnTo);
    }
  }, [isLoaded, isSignedIn, canRedirect, returnTo, router]);

  if (!isLoaded || isSignedIn) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
