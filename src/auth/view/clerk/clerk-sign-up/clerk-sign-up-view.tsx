"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, InputAdornment, CircularProgress } from "@mui/material";

import { paths } from "src/routes/paths";

import { useSignUpLogic } from "src/hooks/auth/use-sign-up";

import {
  checkIfHasNumbers,
  checkIfHasLoweCase,
  checkIfHasUpperCase,
} from "src/utils/string-helpers";

import EmailInboxIcon from "src/assets/icons/email-inbox-icon";

import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";

import { isPasswordValid } from "src/auth/utils";
import { SignUpTerms } from "src/auth/components/sign-up-terms";
import { FormReturnLink } from "src/auth/components/form-return-link";
import PasswordRequirementsSection from "src/auth/components/password-requirements-section";

import { FormHead } from "../../../components/form-head";
import { SignUpSchema, normalizeSignUpData } from "../form-data";
import { ORGANIZATION_TYPE_OPTIONS, signUpdefaultValues as defaultValues } from "../constants";

export function ClerkSignUpView() {
  const { handleSignUp, handleResendEmail, errorMessage, isEmailSent, registeredEmail } =
    useSignUpLogic();
  const showPassword = useBoolean();
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const resolver = zodResolver(SignUpSchema);
  const methods = useForm({ resolver, defaultValues });
  const { handleSubmit, formState, watch } = methods;
  const { isSubmitting } = formState;

  const passwordValue = watch("password");
  const hasOrganizationValue = watch("hasOrganization");

  const onSubmit = handleSubmit(async (data) => {
    const normalizedData = normalizeSignUpData(data);
    await handleSignUp(normalizedData);
  });

  const [cooldown, setCooldown] = useState(0);

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
    setCooldown(30);
    await handleResendEmail();
  };

  if (isEmailSent) {
    return (
      <>
        <FormHead
          icon={<EmailInboxIcon fontSize="large" />}
          title="Confirme seu e-mail!"
          description={
            <>
              Enviamos um e-mail para <strong>{registeredEmail}</strong> com um link para você
              acessar o <strong>Central NaTrave!</strong>
            </>
          }
        />

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          disabled={cooldown > 0}
          onClick={onResendEmail}
        >
          {cooldown > 0 ? `Reenviar e-mail (${cooldown}s)` : "Reenviar e-mail"}
        </LoadingButton>

        <FormReturnLink href={paths.auth.clerk.signIn} label="Voltar para Login" />
      </>
    );
  }

  const renderForm = () => (
    <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
      <Field.Text
        name="firstName"
        label="Nome"
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
            name="organizationType"
            label="Tipo de organização"
            required
            slotProps={{ inputLabel: { shrink: true } }}
          >
            {ORGANIZATION_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ borderRadius: 1, mb: 0.5 }}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Text
            name="organizationName"
            label="Nome da organização"
            placeholder="Nome da sua organização"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </>
      )}

      <Field.Text
        name="password"
        label="Senha"
        placeholder="Informe sua senha"
        type={showPassword.value ? "text" : "password"}
        onBlur={() => {
          if (passwordValue) {
            setShowPasswordRequirements(true);
          }
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
          hasLowerCase={checkIfHasLoweCase(passwordValue)}
          hasUpperCase={checkIfHasUpperCase(passwordValue)}
          hasNumber={checkIfHasNumbers(passwordValue)}
          hasMinCharacters={passwordValue.length >= 8}
        />
      )}

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

  return (
    <>
      <FormHead
        title="Cadastre-se e crie seu campeonato"
        description={
          <>
            Já tem uma conta?{" "}
            <Link
              component="a"
              href={paths.auth.clerk.signIn}
              variant="subtitle2"
              color="secondary.main"
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

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <SignUpTerms />
    </>
  );
}
