import type { Metadata } from "next";

import { CONFIG } from "src/global-config";

import { HomeAppView } from "src/sections/home/app/view";

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <HomeAppView />;
}
