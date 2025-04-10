"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/clerk-react";
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

import { FormDivider } from "src/auth/components/form-divider";
import { FormSocials } from "src/auth/components/form-socials";

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

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const signInWithGoogle = async () => {
    if (!signIn) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/callback",
        redirectUrlComplete: paths.dashboard.home.root,
      });
    } catch (err) {
      console.error(err);
    }
  };

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
        router.push(paths.dashboard.home.root);
      } else {
        setErrorMessage("A autenticação requer etapas adicionais. Verifique seu email ou 2FA.");
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
        label="Endereço de email"
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
          Esqueceu a senha?
        </Link>

        <Field.Text
          name="password"
          label="Senha"
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
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
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
            {`Não tem uma conta? `}
            <Link component={RouterLink} href={paths.auth.clerk.signUp} variant="subtitle2">
              Cadastre-se
            </Link>
          </>
        }
        sx={{ textAlign: { xs: "center", md: "left" } }}
      />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormDivider />

      <FormSocials signInWithGoogle={() => signInWithGoogle()} />
    </>
  );
}
