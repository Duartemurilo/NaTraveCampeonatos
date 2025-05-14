"use client";

import { m } from "framer-motion";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/routes/components";

import { CONFIG } from "src/global-config";
import { MainSection } from "src/layouts/core";
import { ChampionshipLayout } from "src/layouts/championship-layout";

import { varBounce } from "src/components/animate";

// ----------------------------------------------------------------------

export function NotFoundView() {
  return (
    <ChampionshipLayout>
      <MainSection>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",

            height: "85vh",
          }}
        >
          <m.div style={{ marginBottom: "40px" }} variants={varBounce("in")}>
            <img src={`${CONFIG.assetsDir}/assets/illustrations/not-found.png`} height="350" />
          </m.div>

          <m.div variants={varBounce("in")}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Desculpe, página não encontrada!
            </Typography>
          </m.div>

          <m.div variants={varBounce("in")}>
            <Typography maxWidth={600} textAlign="center" sx={{ color: "text.secondary" }}>
              Desculpe, não conseguimos encontrar a página que você está procurando. Talvez você
              tenha digitado a URL incorretamente?
            </Typography>
          </m.div>

          <Button sx={{ mt: 5 }} component={RouterLink} href="/" size="large" variant="contained">
            Voltar para a página inicial
          </Button>
        </Box>
      </MainSection>
    </ChampionshipLayout>
  );
}
