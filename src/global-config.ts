import { paths } from "src/routes/paths";

import packageJson from "../package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  brasilapiUrl: string;

  assetsDir: string;
  baseUrl: string;
  isStaticExport: boolean;
  auth: {
    method: "jwt" | "amplify" | "firebase" | "supabase" | "auth0" | "clerk";
    skip: boolean;
    redirectPath: string;
  };

  auth0: { clientId: string; domain: string; callbackUrl: string };
  supabase: { url: string; key: string };

  clerk: {
    signInUrl: string;
    signUpUrl: string;
    signInFallbackRedirectUrl: string;
    signUpFallbackRedirectUrl: string;
    publishableKey: string;
    secretKey: string;
  };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: "NaTrave Campeonatos",
  appVersion: packageJson.version,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? "",
  brasilapiUrl: process.env.NEXT_PUBLIC_BRASILAPI_URL ?? "",
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? "",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "",
  isStaticExport: JSON.parse(`${process.env.BUILD_STATIC_EXPORT}`),
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: "jwt",
    skip: false,
    redirectPath: paths.dashboard.tournaments.criar(0),
  },

  /**
   * Auth0
   */
  auth0: {
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? "",
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? "",
    callbackUrl: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL ?? "",
  },
  /**
   * Supabase
   */
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  },
  /**
   * Clerk
   */
  clerk: {
    signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "",
    signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "",
    signInFallbackRedirectUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL ?? "",
    signUpFallbackRedirectUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL ?? "",
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "",
    secretKey: process.env.CLERK_SECRET_KEY ?? "",
  },
};
