import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import {
  OrganizationType,
  type IRegisterOrganizationDto,
  type IRegisterOrganizationResponse,
} from "@natrave/auth-service-types";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import { useCreate } from "src/hooks/request/use-create";

import { endpoints } from "src/lib/axios";

import { getErrorMessage } from "src/auth/utils";

export function useSignUpLogic() {
  const router = useRouter();
  const { signUp, setActive } = useSignUp();
  const { create } = useCreate<IRegisterOrganizationDto, IRegisterOrganizationResponse>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

  const handleSignUp = async (data: any) => {
    if (!signUp || !setActive) return;

    const { organization_type, organization_name, ...rest } = data;
    const hasOrganization = Boolean(data.hasOrganization);

    try {
      const registerPayload: IRegisterOrganizationDto = {
        organization: {
          name: organization_name || rest.firstName + " " + rest.lastName,
          email: rest.email,
          phone: rest.phoneNumber,
          type: organization_type || OrganizationType.FACILITY,
          isActualOrganization: hasOrganization,
        },
        user: {
          firstName: rest.firstName,
          lastName: rest.lastName,
          email: rest.email,
          phone: rest.phoneNumber,
        },
      };

      const response = await create({
        endpoint: endpoints.auth.organizationRegister,
        formData: registerPayload,
      });

      const { userId } = response;

      await signUp.create({
        emailAddress: rest.email,
        password: rest.password,
        firstName: rest.firstName,
        lastName: rest.lastName,
        phoneNumber: rest.phoneNumber,

        unsafeMetadata: {
          internalId: userId,
          ...(hasOrganization && {
            organization_type,
            organization_name,
          }),
        },
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
        router.push(paths.dashboard.tournaments.criar(0));
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
