import { z as zod } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input/input";

import { schemaHelper } from "src/components/hook-form";

export type SignInSchemaType = zod.infer<typeof SignInSchema>;
export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Por favor, informe o e-mail." })
    .email({ message: "Informe um e-mail válido (ex: exemplo@dominio.com)." }),
  password: zod.string().min(1, { message: "Por favor, informe a senha." }),
});

export const SignUpSchema = zod
  .object({
    firstName: zod.string().min(1, { message: "Por favor, informe o nome." }),

    phoneNumber: schemaHelper.phoneNumber({
      message: {
        invalid_type: "Por favor, informe o Whatsapp.",
        required: "Por favor, informe o Whatsapp.",
      },
      isValid: isValidPhoneNumber,
    }),
    lastName: zod.string().optional(),
    email: zod
      .string()
      .min(1, { message: "Por favor, informe o e-mail." })
      .email({ message: "Informe um e-mail válido (ex: exemplo@dominio.com)." }),

    password: zod
      .string()
      .min(1, { message: "Por favor, informe a senha." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message:
          "A senha deve conter ao menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.",
      }),

    hasOrganization: zod.boolean().default(false),
    organization_type: zod.string().optional(),
    organization_name: zod.string().optional(),
  })
  .refine((data) => !data.hasOrganization || !!data.organization_type, {
    message: "Por favor, selecione o tipo de organização.",
    path: ["organization_type"],
  })
  .refine((data) => !data.hasOrganization || !!data.organization_name, {
    message: "Por favor, informe o nome da organização.",
    path: ["organization_name"],
  });

export const ResetPasswordStep1Schema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Por favor, informe o e-mail." })
    .email({ message: "Informe um e-mail válido (ex: exemplo@dominio.com)." }),
});

export const ResetPasswordStep2Schema = zod.object({
  password: zod
    .string()
    .min(1, { message: "Por favor, informe a senha." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
      message:
        "A senha deve conter ao menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.",
    }),
  code: zod.string().min(1, { message: "O código de recuperação é obrigatório." }),
});

export function normalizeSignUpData(data: SignUpSchemaType): SignUpSchemaType {
  const names = data.firstName.trim().split(" ");

  const firstName = names[0];
  const lastName = names.length > 1 ? names.slice(1).join(" ") : "";

  return {
    ...data,
    firstName,
    lastName,
    organization_type: data.hasOrganization ? data.organization_type : "",
    organization_name: data.hasOrganization ? data.organization_name : "",
  };
}
