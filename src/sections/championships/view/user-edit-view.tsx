"use client";

import type { IChampionship } from "src/types/championship";

import { paths } from "src/routes/paths";

import { DashboardContent } from "src/layouts/dashboard";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { ChampionshipNewEditForm } from "../form/championship-new-edit-form";

// ----------------------------------------------------------------------

type Props = {
  championsShip?: IChampionship;
};

export function ChampionshipEditView({ championsShip }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Editar"
        backHref={paths.dashboard.user.list}
        links={[
          { name: "Dashboard", href: paths.dashboard.championships.root },
          { name: "User", href: paths.dashboard.user.root },
          { name: championsShip?.championshipName },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ChampionshipNewEditForm championsShip={championsShip} />
    </DashboardContent>
  );
}
