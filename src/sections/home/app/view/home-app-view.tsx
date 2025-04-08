"use client";

import { useUser } from "@clerk/nextjs";

import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";

import { paths } from "src/routes/paths";

import { _appFeatured } from "src/_mock";
import { CONFIG } from "src/global-config";
import { DashboardContent } from "src/layouts/dashboard";

import { AppWelcome } from "../app-welcome";
import { AppFeatured } from "../app-featured";

export function HomeAppView() {
  const { isLoaded, user } = useUser();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <AppWelcome
            title={`Olá, ${isLoaded && user ? user.firstName : ""}!`}
            description="Crie e administre seu primeiro campeonato na nossa plataforma!"
            img={`${CONFIG.assetsDir}/logo/logo-full.svg`}
            action={
              <Button variant="contained" color="primary" href={paths.dashboard.championships.new}>
                Criar campeonato
              </Button>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppFeatured list={_appFeatured} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
