/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import Link from "next/link";
import * as React from "react";
import { useClerk } from "@clerk/nextjs";
import { isEmailLinkError, EmailLinkErrorCodeStatus } from "@clerk/nextjs/errors";

import { paths } from "src/routes/paths";

import { CONFIG } from "src/global-config";
import { EmailInboxIcon } from "src/assets/icons";

import { FormHead } from "./components/form-head";
import { FormReturnLink } from "./components/form-return-link";

// ----------------------------------------------------------------------

export function ClerkVerifyEmailView() {
  const [verificationStatus, setVerificationStatus] = React.useState("loading");

  const { handleEmailLinkVerification, loaded } = useClerk();

  async function verify() {
    try {
      await handleEmailLinkVerification({
        redirectUrl: `${CONFIG.baseUrl}${paths.dashboard.home.root}`,
      });

      setVerificationStatus("verified");
    } catch (err: any) {
      let status = "failed";

      if (isEmailLinkError(err)) {
        if (err.code === EmailLinkErrorCodeStatus.Expired) {
          status = "expired";
        } else if (err.code === EmailLinkErrorCodeStatus.ClientMismatch) {
          status = "client_mismatch";
        }
      }

      setVerificationStatus(status);
    }
  }

  React.useEffect(() => {
    if (!loaded) return;
    verify();
  }, [handleEmailLinkVerification, loaded]);

  // Mapeamento de status para mensagens
  const statusMessages: Record<string, { titulo: string; descricao: string; link?: string }> = {
    loading: { titulo: "Carregando...", descricao: "" },
    failed: {
      titulo: "Verifique seu e-mail",
      descricao: "A verificação do e-mail falhou. Tente novamente.",
      link: "/sign-up",
    },
    expired: {
      titulo: "Verifique seu e-mail",
      descricao: "O link de verificação expirou. Solicite um novo e-mail.",
      link: "/sign-up",
    },
    verified: {
      titulo: "E-mail verificado com sucesso!",
      descricao: "Seu e-mail foi confirmado. Agora você pode acessar sua conta.",
    },
    client_mismatch: {
      titulo: "Verificação inválida",
      descricao: "O link de verificação foi acessado em um dispositivo ou navegador diferente.",
      link: "/sign-up",
    },
  };

  const currentMessage = statusMessages[verificationStatus] || statusMessages["verified"];

  return (
    <>
      <FormHead
        icon={<EmailInboxIcon />}
        title={currentMessage.titulo}
        description={currentMessage.descricao}
      />

      {verificationStatus === "verified" ? (
        <FormReturnLink href={paths.auth.clerk.signIn} label="Retornar para o login" />
      ) : (
        currentMessage.link && (
          <div>
            <Link href={currentMessage.link}>Reenviar e-mail</Link>
          </div>
        )
      )}
    </>
  );
}
