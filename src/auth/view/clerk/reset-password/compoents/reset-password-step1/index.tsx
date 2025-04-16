"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";

import { Form, Field } from "src/components/hook-form";

import { ResetPasswordStep1Schema } from "../../../form-data";

interface ResetPasswordStep1Props {
  onSubmit: (data: { email: string }) => Promise<void>;
}

export default function ResetPasswordStep1({ onSubmit }: ResetPasswordStep1Props) {
  const methods = useForm({
    resolver: zodResolver(ResetPasswordStep1Schema),
    defaultValues: { email: "" },
  });

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
        <Field.Text
          autoFocus
          name="email"
          label="Seu e-mail"
          placeholder="exemplo@gmail.com"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <LoadingButton
          fullWidth
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          loading={methods.formState.isSubmitting}
          loadingIndicator={<CircularProgress size={16} />}
        >
          Enviar código
        </LoadingButton>
      </Box>
    </Form>
  );
}
