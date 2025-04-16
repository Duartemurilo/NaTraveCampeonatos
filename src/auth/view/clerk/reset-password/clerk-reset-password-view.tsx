"use client";

import { useSignIn } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";

import Alert from "@mui/material/Alert";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import PasswordIcon from "src/assets/icons/password-icon";

import { FormHead } from "src/auth/components/form-head";
import { FormReturnLink } from "src/auth/components/form-return-link";

import ResetPasswordStep2 from "./compoents/reset-password-step2";
import ResetPasswordStep1 from "./compoents/reset-password-step1";

export function ClerkResetPasswordView() {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");

  const [cooldown, setCooldown] = useState(60);
  const [isCooldownInitialized, setIsCooldownInitialized] = useState(false);

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

  async function requestReset(data: { email: string }) {
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      });
      setSuccessfulCreation(true);
      setError("");
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Ocorreu um erro.");
    }
  }

  async function resetPassword(data: { password: string; code: string }) {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      });
      if (result?.status === "complete") {
        if (!setActive) {
          setError("Não foi possível ativar a sessão. Tente novamente.");
          return;
        }
        await setActive({ session: result.createdSessionId });
        router.push(paths.dashboard.home.root);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Ocorreu um erro.");
    }
  }

  async function handleResendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!signIn || !signIn.identifier) return;
    const emailAddressId = signIn.identifier;

    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: emailAddressId,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError("");
        setCooldown(60);
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage || "Ocorreu um erro ao reenviar o código.");
      });
  }

  return (
    <>
      <FormHead
        icon={<PasswordIcon />}
        title={!successfulCreation ? "Esqueceu sua senha?" : "Verifique seu e-mail!"}
        description={
          !successfulCreation ? (
            <>Vamos te enviar um código de verificação para você redefinir sua senha.</>
          ) : (
            <>
              Enviamos um código de verificação para <strong>{signIn?.identifier}</strong>.
            </>
          )
        }
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!successfulCreation ? (
        <ResetPasswordStep1 onSubmit={requestReset} />
      ) : (
        <ResetPasswordStep2
          onSubmit={resetPassword}
          onResendEmail={handleResendEmail}
          cooldown={cooldown}
        />
      )}

      <FormReturnLink href={paths.auth.clerk.signIn} label="Voltar" />
    </>
  );
}

export default ClerkResetPasswordView;
