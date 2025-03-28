"use client";

import { useRouter } from "next/navigation";

import { Button } from "@mui/material";

import { paths } from "src/routes/paths";

import { CONFIG } from "src/global-config";

import { Iconify } from "src/components/iconify";
import { EmptyContent } from "src/components/empty-content";

export function ChampionshipError() {
  const router = useRouter();

  return (
    <EmptyContent
      filled
      imgUrl={`${CONFIG.assetsDir}/assets/illustrations/illustration-juiz.png`}
      title="Algo deu errado! "
      description="O VAR confirmou o problema. Parece que algo deu errado. Tente atualizar a página ou voltar ao menu principal."
      action={
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          onClick={() => router.push(paths.dashboard.championships.cards)}
          sx={{ mt: 3 }}
        >
          Voltar para lista
        </Button>
      }
      sx={{ py: 10 }}
    />
  );
}
