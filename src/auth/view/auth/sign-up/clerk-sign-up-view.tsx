"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, InputAdornment, CircularProgress } from "@mui/material";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

import { useSignUpLogic } from "src/hooks/auth/use-sign-up";

import {
  checkIfHasNumbers,
  checkIfHasLoweCase,
  checkIfHasUpperCase,
} from "src/utils/string-helpers";

import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";

import { isPasswordValid } from "src/auth/utils";
import { SignUpTerms } from "src/auth/components/sign-up-terms";
import PasswordRequirementsSection from "src/auth/components/password-requirements-section";

import { FormHead } from "../../../components/form-head";
import { SignUpSchema, normalizeSignUpData } from "../form-data";
import { EmailVerificationView } from "./components/email-code-verification-view";
import { ORGANIZATION_TYPE_OPTIONS, signUpdefaultValues as defaultValues } from "../constants";

type SignUpFormData = typeof defaultValues;

export function ClerkSignUpView() {
  const router = useRouter();

  const signUpMethods = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const { handleSubmit, formState, watch } = signUpMethods;
  const { isSubmitting } = formState;
  const { handleSignUp, errorMessage, isEmailSent, registeredEmail } = useSignUpLogic();
  const showPassword = useBoolean();
  const passwordValue = watch("password");
  const hasOrganizationValue = watch("hasOrganization");
  const email = watch("email");
  const [isPending, startTransition] = useTransition();

  const handleNavigateToSignUp = () => {
    startTransition(() => router.push(paths.auth.clerk.signIn));
  };

  const onSignUpSubmit = handleSubmit(async (data) => {
    const normalizedData = normalizeSignUpData(data);
    await handleSignUp(normalizedData);
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
      <Field.Text
        name="firstName"
        label="Nome completo"
        placeholder="Seu nome completo"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Field.Phone name="phoneNumber" label="WhatsApp" placeholder="(99) 99999-9999" country="BR" />
      <Field.Text
        name="email"
        label="E-mail"
        placeholder="exemplo@gmail.com"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Field.Switch
        name="hasOrganization"
        labelPlacement="end"
        label="Faço parte de uma organização"
      />

      {hasOrganizationValue && (
        <>
          <Field.Select
            name="organization_type"
            label="Tipo de organização"
            slotProps={{ inputLabel: { shrink: true } }}
          >
            {ORGANIZATION_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ borderRadius: 1, mb: 0.5 }}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>
          <Field.Text
            name="organization_name"
            label="Nome da organização"
            placeholder="Nome da sua organização"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </>
      )}

      <Box sx={{ mt: hasOrganizationValue ? 2 : 0 }}>
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

        <Box sx={{ mt: 2 }}>
          <PasswordRequirementsSection
            hasLowerCase={checkIfHasLoweCase(passwordValue)}
            hasUpperCase={checkIfHasUpperCase(passwordValue)}
            hasNumber={checkIfHasNumbers(passwordValue)}
            hasMinCharacters={passwordValue.length >= 8}
          />
        </Box>
      </Box>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={<CircularProgress size={16} />}
        disabled={!isPasswordValid(passwordValue)}
      >
        Criar conta
      </LoadingButton>
    </Box>
  );

  if (isEmailSent) return <EmailVerificationView registeredEmail={registeredEmail || email} />;

  return (
    <>
      <FormHead
        title="Cadastre-se e crie seu campeonato"
        description={
          <>
            Já tem uma conta?{" "}
            <Link
              component={RouterLink}
              onClick={(e) => {
                e.preventDefault();
                handleNavigateToSignUp();
              }}
              href={paths.auth.clerk.signIn}
              variant="subtitle2"
              color="secondary.main"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                opacity: isPending ? 0.5 : 1,
                pointerEvents: isPending ? "none" : "auto",
              }}
            >
              Entrar
            </Link>
          </>
        }
      />

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={signUpMethods} onSubmit={onSignUpSubmit}>
        {renderForm()}
      </Form>

      <SignUpTerms />
    </>
  );
}
