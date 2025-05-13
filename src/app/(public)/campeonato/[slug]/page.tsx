import type { Metadata } from "next";

import { CONFIG } from "src/global-config";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Criar um novo campeonato - ${CONFIG.appName}`,
};

export default function Page() {
  return <h1>campeonato publicado</h1>;
}
