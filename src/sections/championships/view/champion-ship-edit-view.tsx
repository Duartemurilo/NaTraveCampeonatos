"use client";

import type { IChampionship } from "src/types/championship";

import { paths } from "src/routes/paths";

import { useGetById } from "src/hooks/request/use-get-by-id";

import { DashboardContent } from "src/layouts/dashboard";

import { LoadingScreen } from "src/components/loading-screen";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { endpoints } from "src/auth/constants";

import { ChampionshipError } from "./championship-error";
import { ChampionshipNewEditForm } from "../form/championship-new-edit-form";

type Props = {
  championshipId: string;
};

export function ChampionshipEditView({ championshipId }: Props) {
  const { data, isLoading, error } = useGetById<IChampionship>({
    key: ["championship", championshipId],
    endpoint: endpoints.championship.get,
    id: championshipId,
  });

  const hasError = !!error && !isLoading;
  const showForm = !isLoading && !hasError;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Editar campeonato"
        backHref={paths.dashboard.championships.list}
        links={[
          { name: "Campeonatos", href: paths.dashboard.championships.root },
          { name: data?.championshipName ?? "-" },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {isLoading && <LoadingScreen />}
      {hasError && <ChampionshipError />}

      {showForm && <ChampionshipNewEditForm championsShip={data} />}
    </DashboardContent>
  );
}
