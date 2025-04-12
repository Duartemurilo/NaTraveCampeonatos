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
  password: zod
    .string()
    .min(1, { message: "Por favor, informe a senha." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
      message:
        "A senha deve conter ao menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e um caractere especial.",
    }),
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
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
        message:
          "A senha deve conter ao menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e um caractere especial.",
      }),

    hasOrganization: zod.boolean().default(false),
    organizationType: zod.string().optional(),
    organizationName: zod.string().optional(),
  })
  .refine((data) => !data.hasOrganization || !!data.organizationType, {
    message: "Por favor, selecione o tipo de organização.",
    path: ["organizationType"],
  })
  .refine((data) => !data.hasOrganization || !!data.organizationName, {
    message: "Por favor, informe o nome da organização.",
    path: ["organizationName"],
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
    .min(1, { message: "Por favor, informe a nova senha." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
      message:
        "A nova senha deve conter ao menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e um caractere especial.",
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
    organizationType: data.hasOrganization ? data.organizationType : "",
    organizationName: data.hasOrganization ? data.organizationName : "",
  };
}
