"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import { PasswordIcon } from "src/assets/icons";

import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";

import { FormHead } from "src/auth/components/form-head";
import { FormReturnLink } from "src/auth/components/form-return-link";

import { ResetPasswordStep1Schema, ResetPasswordStep2Schema } from "../form-data";

export function ClerkResetPasswordView() {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");
  const showPassword = useBoolean();

  const methodsStep1 = useForm({
    resolver: zodResolver(ResetPasswordStep1Schema),
    defaultValues: { email: "" },
  });

  const methodsStep2 = useForm({
    resolver: zodResolver(ResetPasswordStep2Schema),
    defaultValues: { password: "", code: "" },
  });

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
        router.push(paths.dashboard.championships.root);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Ocorreu um erro.");
    }
  }

  const renderStep1Form = () => (
    <Form methods={methodsStep1} onSubmit={methodsStep1.handleSubmit(requestReset)}>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
        <Field.Text
          autoFocus
          name="email"
          label="Endereço de email"
          placeholder="exemplo@gmail.com"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={methodsStep1.formState.isSubmitting}
          loadingIndicator="Enviando código..."
        >
          Enviar código de recuperação
        </LoadingButton>
      </Box>
    </Form>
  );

  const renderStep2Form = () => (
    <Form key="step2" methods={methodsStep2} onSubmit={methodsStep2.handleSubmit(resetPassword)}>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
        <Field.Text
          name="password"
          label="Nova senha"
          placeholder="8+ caracteres"
          type={showPassword.value ? "text" : "password"}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={showPassword.value ? "solar:eye-bold" : "solar:eye-closed-bold"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Field.Text
          name="code"
          label="Código de recuperação"
          placeholder="Digite o código enviado para seu email"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={methodsStep2.formState.isSubmitting}
          loadingIndicator={<CircularProgress />}
        >
          Redefinir senha
        </LoadingButton>
      </Box>
    </Form>
  );

  return (
    <>
      <FormHead
        icon={<PasswordIcon />}
        title="Esqueceu sua senha?"
        description="Digite o endereço de email associado à sua conta para receber um código de recuperação, depois use o código para redefinir sua senha."
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!successfulCreation ? renderStep1Form() : renderStep2Form()}
      <FormReturnLink href={paths.auth.clerk.signIn} />
    </>
  );
}
