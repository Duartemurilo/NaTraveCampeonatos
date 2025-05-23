import "src/global.css";

import type { Metadata, Viewport } from "next";

import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material/nextjs/v14-appRouter";

import { CONFIG } from "src/global-config";
import { primary } from "src/theme/core/palette";
import { LocalizationProvider } from "src/locales";
import { detectLanguage } from "src/locales/server";
import { themeConfig, ThemeProvider } from "src/theme";
import { I18nProvider } from "src/locales/i18n-provider";

import { Snackbar } from "src/components/snackbar";
import { ProgressBar } from "src/components/progress-bar";
import { MotionLazy } from "src/components/animate/motion-lazy";
import { detectSettings } from "src/components/settings/server";
import { ToastProvider } from "src/components/toast-context/context";
import { SettingsDrawer, defaultSettings, SettingsProvider } from "src/components/settings";

// ----------------------------------------------------------------------

const AuthProvider = ClerkProvider;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata: Metadata = {
  icons: [
    {
      rel: "icon",
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

// ----------------------------------------------------------------------

type RootLayoutProps = {
  children: React.ReactNode;
};

async function getAppConfig() {
  try {
    if (CONFIG.isStaticExport) {
      return {
        lang: "pt-BR",
        i18nLang: undefined,
        cookieSettings: undefined,
        dir: defaultSettings.direction,
      };
    } else {
      const [lang, settings] = await Promise.all([detectLanguage(), detectSettings()]);

      return {
        lang: lang ?? "pt-BR",
        i18nLang: lang ?? "pt-BR",
        cookieSettings: settings,
        dir: settings.direction,
      };
    }
  } catch (error) {
    // Fallback configuration if there's an error
    return {
      lang: "pt-BR",
      i18nLang: "pt-BR",
      cookieSettings: undefined,
      dir: defaultSettings.direction,
    };
  }
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const appConfig = await getAppConfig();

  return (
    <html lang={appConfig.lang} dir={appConfig.dir} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          defaultMode={themeConfig.defaultMode}
          modeStorageKey={themeConfig.modeStorageKey}
          attribute={themeConfig.cssVariables.colorSchemeSelector}
        />

        <I18nProvider lang={appConfig.i18nLang}>
          <AuthProvider localization={ptBR}>
            <SettingsProvider
              cookieSettings={appConfig.cookieSettings}
              defaultSettings={defaultSettings}
            >
              <LocalizationProvider>
                <AppRouterCacheProvider options={{ key: "css" }}>
                  <ThemeProvider
                    defaultMode={themeConfig.defaultMode}
                    modeStorageKey={themeConfig.modeStorageKey}
                  >
                    <MotionLazy>
                      <Snackbar />
                      <ProgressBar />
                      <SettingsDrawer defaultSettings={defaultSettings} />
                      <ToastProvider>{children}</ToastProvider>
                    </MotionLazy>
                  </ThemeProvider>
                </AppRouterCacheProvider>
              </LocalizationProvider>
            </SettingsProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}