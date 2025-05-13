"use client";

import { m } from "framer-motion";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/routes/components";

import { SimpleLayout } from "src/layouts/simple";
import { ServerErrorIllustration } from "src/assets/illustrations";

import { varBounce, MotionContainer } from "src/components/animate";

// ----------------------------------------------------------------------

export type Props = {
  showbutton?: boolean;
};

export function View500({ showbutton = true }: Props) {
  return (
    <SimpleLayout
      hideHeader
      slotProps={{
        content: { compact: true },
      }}
    >
      <Container component={MotionContainer}>
        <m.div variants={varBounce("in")}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Algo deu errado por aqui
          </Typography>
        </m.div>

        <m.div variants={varBounce("in")}>
          <Typography sx={{ color: "text.secondary" }}>
            Estamos enfrentando uma instabilidade no momento. <br />
            Mas não se preocupe, já estamos verificando isso!
          </Typography>
        </m.div>

        <m.div variants={varBounce("in")}>
          <ServerErrorIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        {showbutton && (
          <Button component={RouterLink} href="/" size="large" variant="contained">
            Voltar para a página inicial
          </Button>
        )}
      </Container>
    </SimpleLayout>
  );
}
