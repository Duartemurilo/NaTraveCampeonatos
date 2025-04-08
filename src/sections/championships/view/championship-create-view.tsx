"use client";

import { paths } from "src/routes/paths";

import { DashboardContent } from "src/layouts/dashboard";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { ChampionshipNewEditForm } from "../form/championship-new-edit-form";

// ----------------------------------------------------------------------

export function ChampionshipCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Criar novo campeonato"
        links={[
          { name: "Campeonatos", href: paths.dashboard.championships.cards },
          { name: "Novo campeonato" },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ChampionshipNewEditForm />
    </DashboardContent>
  );
}
