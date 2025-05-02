"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTheme, useMediaQuery, CircularProgress } from "@mui/material";

import { useSignUpLogic } from "src/auth/hooks/use-sign-up";

import EmailInboxIcon from "src/assets/icons/email-inbox-icon";

import { Form, Field } from "src/components/hook-form";

import { FormHead } from "../../../../../components/form-head";

type VerificationFormData = { code: string };

export type Props = {
  registeredEmail: string;
};

export function EmailVerificationView({ registeredEmail }: Props) {
  const { verifyCode, handleResendEmail } = useSignUpLogic();
  const methods = useForm<VerificationFormData>({ defaultValues: { code: "" } });
  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;
  const [cooldown, setCooldown] = useState(0);
  const [isCooldownInitialized, setIsCooldownInitialized] = useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (!isCooldownInitialized) {
      setCooldown(60);
      setIsCooldownInitialized(true);
    }
  }, [isCooldownInitialized]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const onResendEmail = async () => {
    setCooldown(60);
    await handleResendEmail();
  };

  return (
    <>
      <FormHead
        icon={<EmailInboxIcon fontSize="large" />}
        title="Verifique seu email!"
        description={
          <>
            Enviamos um código de verificação para <strong>{registeredEmail}</strong>.
          </>
        }
      />
      <Form methods={methods} onSubmit={handleSubmit(async (data) => await verifyCode(data.code))}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }} fontWeight="regular">
            Digite o{" "}
            <Typography component="span" variant="inherit" fontWeight="bold">
              código{" "}
            </Typography>
            para confirmar seu cadastro:
          </Typography>
          <Field.Code
            name="code"
            gap={mdUp ? 1 : 0.4}
            autoFocus
            slotProps={{
              textfield: { variant: "outlined", style: { width: "53px", height: "54px" } },
            }}
          />
          <Link
            color="inherit"
            variant="body2"
            fontWeight="regular"
            onClick={cooldown > 0 ? undefined : onResendEmail}
            sx={{
              my: 2,
              gap: 0.5,
              mx: "auto",
              alignItems: "center",
              display: "inline-flex",
              cursor: cooldown > 0 ? "not-allowed" : "pointer",
              opacity: cooldown > 0 ? 0.5 : 1,
              pointerEvents: cooldown > 0 ? "none" : "auto",
              color: "text.secondary",
            }}
          >
            <RefreshIcon sx={{ fontSize: 16 }} />
            Reenviar e-mail com código {cooldown > 0 ? `(${cooldown}s)` : ""}
          </Link>
          <LoadingButton
            fullWidth
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator={<CircularProgress size={16} />}
          >
            Confirmar Cadastro
          </LoadingButton>
        </Box>
      </Form>
    </>
  );
}
