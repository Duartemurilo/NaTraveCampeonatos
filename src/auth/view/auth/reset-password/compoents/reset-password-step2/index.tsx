"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import LoadingButton from "@mui/lab/LoadingButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Stack,
  useTheme,
  Typography,
  IconButton,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";

import {
  checkIfHasNumbers,
  checkIfHasLoweCase,
  checkIfHasUpperCase,
} from "src/utils/string-helpers";

import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";

import { isPasswordValid } from "src/auth/utils";
import { ResetPasswordStep2Schema } from "src/auth/schema/reset-password-schema";
import PasswordRequirementsSection from "src/auth/components/password-requirements-section";

interface Props {
  onSubmit: (data: { password: string; code: string }) => Promise<void>;
  onResendEmail(e: React.FormEvent): Promise<void>;
  cooldown: number;
}

function ResetPasswordStep2({ onSubmit, onResendEmail, cooldown }: Props) {
  const methods = useForm({
    resolver: zodResolver(ResetPasswordStep2Schema),
    defaultValues: { password: "", code: "" },
  });

  const showPassword = useBoolean();

  const { watch, formState } = methods;
  const passwordValue = watch("password");

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
        <Stack spacing={1.5}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Digite o{" "}
            <Typography component="span" variant="inherit" fontWeight="bold">
              código de verificação{" "}
            </Typography>
          </Typography>

          <Field.Code
            name="code"
            gap={mdUp ? 1 : 0.4}
            autoFocus
            slotProps={{
              textfield: {
                variant: "outlined",
                style: { width: "53px", height: "54px" },
              },
            }}
          />
        </Stack>

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

        <PasswordRequirementsSection
          hasLowerCase={checkIfHasLoweCase(passwordValue)}
          hasUpperCase={checkIfHasUpperCase(passwordValue)}
          hasNumber={checkIfHasNumbers(passwordValue)}
          hasMinCharacters={passwordValue.length >= 8}
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
            color: cooldown > 0 ? "text.secondary " : "text.primary",
          }}
        >
          <RefreshIcon sx={{ fontSize: 16 }} />
          Reenviar e-mail com código {cooldown > 0 ? `(${cooldown}s)` : ""}
        </Link>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="primary"
          variant="contained"
          loading={formState.isSubmitting}
          loadingIndicator={<CircularProgress size={16} />}
          disabled={!isPasswordValid(passwordValue)}
        >
          Redefinir senha
        </LoadingButton>
      </Box>
    </Form>
  );
}

export default ResetPasswordStep2;
