"use client";

import { m } from "framer-motion";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

import { CONFIG } from "src/global-config";
import { MainSection } from "src/layouts/core";

import { varBounce } from "src/components/animate";

// ----------------------------------------------------------------------

export type Props = {
  showbutton?: boolean;
};

export function View500({ showbutton = true }: Props) {
  return (
    <MainSection>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "80vh",
        }}
      >
        <m.div style={{ marginBottom: "40px" }} variants={varBounce("in")}>
          <img src={`${CONFIG.assetsDir}/assets/illustrations/view-500.png`} height="350" />
        </m.div>

        <m.div variants={varBounce("in")}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Algo deu errado por aqui
          </Typography>
        </m.div>

        <m.div variants={varBounce("in")}>
          <Typography maxWidth={600} textAlign="center" sx={{ color: "text.secondary" }}>
            Estamos enfrentando uma instabilidade no momento. <br />
            Mas não se preocupe, já estamos verificando isso!
          </Typography>
        </m.div>

        {showbutton && (
          <Button
            component={RouterLink}
            href={paths.dashboard.tournaments.criar(0)}
            size="large"
            variant="contained"
          >
            Voltar para a página inicial
          </Button>
        )}
      </Box>
    </MainSection>
  );
}
