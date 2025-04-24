"use client";

import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/clerk-react";
import { useState, useTransition } from "react";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";

import { SignInSchema } from "../form-data";
import { defaultValues } from "../constants";
import { getErrorMessage } from "../../../utils";
import { FormHead } from "../../../components/form-head";

import type { SignInSchemaType } from "../form-data";

export function ClerkSignInView() {
  const router = useRouter();
  const showPassword = useBoolean();
  const { signIn, setActive } = useSignIn();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleNavigateToSignUp = () => {
    startTransition(() => router.push(paths.auth.clerk.signUp));
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (!signIn || !setActive) {
      console.error("Clerk não está devidamente inicializado.");
      return;
    }

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(paths.dashboard.tournaments.criar(0));
      } else {
        setErrorMessage("A autenticação requer etapas adicionais. Verifique seu e-mail ou 2FA.");
      }
    } catch (error: any) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
      <Field.Text
        name="email"
        label="Seu e-mail"
        placeholder="exemplo@gmail.com"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Box sx={{ gap: 1.5, display: "flex", flexDirection: "column" }}>
        <Link
          component={RouterLink}
          href={paths.auth.clerk.resetPassword}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: "flex-end" }}
        >
          Esqueci minha senha
        </Link>

        <Field.Text
          name="password"
          label="Senha"
          placeholder="Informe sua senha"
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
      </Box>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={<CircularProgress size={16} />}
      >
        Entrar
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Entre na sua conta"
        description={
          <>
            {`Ainda não tem uma conta? `}
            <Link
              component={RouterLink}
              onClick={(e) => {
                e.preventDefault();
                handleNavigateToSignUp();
              }}
              href={paths.auth.clerk.signUp}
              variant="subtitle2"
              color="secondary.main"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                opacity: isPending ? 0.5 : 1,
                pointerEvents: isPending ? "none" : "auto",
              }}
            >
              Cadastre-se
            </Link>
          </>
        }
        sx={{ textAlign: "center" }}
      />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>
    </>
  );
}
