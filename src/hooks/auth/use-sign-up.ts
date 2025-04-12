// No arquivo do hook useSignUpLogic.ts
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import { CONFIG } from "src/global-config";

import { getErrorMessage } from "src/auth/utils";

export function useSignUpLogic() {
  const router = useRouter();
  const { signUp, setActive } = useSignUp();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

  const handleSignUp = async (data: any) => {
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
        phoneNumber: data.phoneNumber,
        unsafeMetadata: {
          hasOrganization: data.hasOrganization,
          organizationType: data.organizationType,
          organizationName: data.organizationName,
        },
      });

      setRegisteredEmail(data.email);
      setIsEmailSent(true);

      const emailLinkFlow = signUp.createEmailLinkFlow();
      const result = await emailLinkFlow.startEmailLinkFlow({
        redirectUrl: `${CONFIG.baseUrl}${paths.auth.clerk.verifyEmail}`,
      });

      await setActive({ session: result.createdSessionId });
      router.push(paths.dashboard.home.root);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleResendEmail = async () => {
    try {
      if (!signUp) return;
      const emailLinkFlow = signUp.createEmailLinkFlow();
      await emailLinkFlow.startEmailLinkFlow({
        redirectUrl: `${CONFIG.baseUrl}${paths.auth.clerk.verifyEmail}`,
      });
    } catch (error: any) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
    }
  };

  return { handleSignUp, handleResendEmail, errorMessage, isEmailSent, registeredEmail };
}
