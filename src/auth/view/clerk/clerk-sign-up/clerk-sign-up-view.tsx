"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/clerk-react";
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

import {
  checkIfHasNumbers,
  checkIfHasLoweCase,
  checkIfHasUpperCase,
  checkIfHasSpecialCharacters,
} from "src/utils/string-helpers";

import { CONFIG } from "src/global-config";

import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";

import { FormDivider } from "src/auth/components/form-divider";
import { FormSocials } from "src/auth/components/form-socials";
import PasswordRequirementsSection from "src/auth/components/password-requirements-section";

import { SignUpSchema } from "../form-data";
import { getErrorMessage } from "../../../utils";
import { signUpdefaultValues } from "../constants";
import { FormHead } from "../../../components/form-head";
import { SignUpTerms } from "../../../components/sign-up-terms";

import type { SignUpSchemaType } from "../form-data";

export function ClerkSignUpView() {
  const router = useRouter();
  const showPassword = useBoolean();
  const { signUp, setActive } = useSignUp();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: signUpdefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const passwordValue = watch("password");

  const isPasswordValid =
    passwordValue &&
    passwordValue.length >= 8 &&
    checkIfHasSpecialCharacters(passwordValue) &&
    checkIfHasLoweCase(passwordValue) &&
    checkIfHasUpperCase(passwordValue) &&
    checkIfHasNumbers(passwordValue);

  const signUpWithGoogle = async () => {
    if (!signUp) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/callback",
        redirectUrlComplete: paths.dashboard.home.root,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const signUpWithApple = async () => {
    if (!signUp) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_apple",
        redirectUrl: "/auth/callback",
        redirectUrlComplete: paths.dashboard.home.root,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!signUp || !setActive) {
      console.error("Clerk não está devidamente inicializado.");
      return;
    }
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      setInfoMessage(
        "Um email de verificação foi enviado para o seu endereço. Por favor, verifique sua caixa de entrada e clique no link para confirmar seu cadastro."
      );

      const emailLinkFlow = signUp.createEmailLinkFlow();
      const result = await emailLinkFlow.startEmailLinkFlow({
        redirectUrl: `${CONFIG.baseUrl}${paths.auth.clerk.verifyEmail}`,
      });

      if (result.verifications.emailAddress?.verifiedFromTheSameClient()) {
        await setActive({ session: result.createdSessionId });
        router.push(paths.dashboard.home.root);
      } else {
        setInfoMessage(
          "Um email de verificação foi enviado para o seu endereço. Por favor, verifique sua caixa de entrada e clique no link para confirmar seu cadastro."
        );
      }
    } catch (error: any) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 3, sm: 2 },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Field.Text name="firstName" label="Nome" slotProps={{ inputLabel: { shrink: true } }} />
        <Field.Text
          name="lastName"
          label="Sobrenome"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>
      <Field.Text
        name="email"
        label="Endereço de email"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Field.Text
        name="password"
        label="Senha"
        placeholder="8+ caracteres"
        type={showPassword.value ? "text" : "password"}
        onBlur={() => {
          if (passwordValue) setShowPasswordRequirements(true);
        }}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      {showPasswordRequirements && passwordValue && (
        <PasswordRequirementsSection
          hasSpecialCharacter={checkIfHasSpecialCharacters(passwordValue)}
          hasLowerCase={checkIfHasLoweCase(passwordValue)}
          hasUpperCase={checkIfHasUpperCase(passwordValue)}
          hasNumber={checkIfHasNumbers(passwordValue)}
          hasMinCharacters={passwordValue.length >= 8}
        />
      )}
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={<CircularProgress size={16} />}
        disabled={!isPasswordValid} // Desabilita o botão caso a senha não seja válida
      >
        Criar conta
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Comece gratuitamente"
        description={
          <>
            Já possui uma conta?{" "}
            <Link component={RouterLink} href={paths.auth.clerk.signIn} variant="subtitle2">
              Entrar
            </Link>
          </>
        }
        sx={{ textAlign: { xs: "center", md: "left" } }}
      />

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      {infoMessage && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {infoMessage}
        </Alert>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormDivider />

      <FormSocials
        signInWithGoogle={() => signUpWithGoogle()}
        signInWithApple={() => signUpWithApple()}
      />
      <SignUpTerms />
    </>
  );
}
