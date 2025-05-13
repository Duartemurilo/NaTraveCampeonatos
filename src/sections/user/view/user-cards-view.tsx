"use client";

import Button from "@mui/material/Button";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

import { _userCards } from "src/_mock";
import { DashboardContent } from "src/layouts/dashboard";

import { Iconify } from "src/components/iconify";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { UserCardList } from "../user-card-list";

// ----------------------------------------------------------------------

export function UserCardsView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="User cards"
        links={[
          { name: "Dashboard", href: paths.dashboard.tournaments.criar(0) },
          { name: "Cards" },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.tournaments.criar(0)}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Novo Campeonato
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserCardList users={_userCards} />
    </DashboardContent>
  );
}
