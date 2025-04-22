import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

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

    const { organization_type, organization_name, ...rest } = data;
    const hasOrganization = Boolean(organization_name || organization_type);

    const unsafeMetadata = hasOrganization ? { organization_type, organization_name } : undefined;

    try {
      await signUp.create({
        emailAddress: rest.email,
        password: rest.password,
        firstName: rest.firstName,
        lastName: rest.lastName,
        phoneNumber: rest.phoneNumber,
        ...(unsafeMetadata && { unsafeMetadata }),
      });

      setRegisteredEmail(rest.email);
      setIsEmailSent(true);

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (error: any) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleResendEmail = async () => {
    try {
      if (!signUp) return;

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (error: any) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
    }
  };

  const verifyCode = async (code: string) => {
    try {
      if (!signUp || !setActive) return;

      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push(paths.dashboard.championships.criar(0));
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
    }
  };

  return {
    handleSignUp,
    handleResendEmail,
    verifyCode,
    errorMessage,
    isEmailSent,
    registeredEmail,
  };
}
