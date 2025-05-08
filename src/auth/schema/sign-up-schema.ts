import { z as zod } from "zod";

import { schemaHelper } from "src/components/hook-form";

const isValidBRPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const local = digits.startsWith("55") ? digits.slice(2) : digits;

  return local.length === 11 && local[2] === "9";
};

export const SignUpSchema = zod
  .object({
    firstName: zod
      .string()
      .min(1, { message: "Por favor, informe o nome completo." })
      .refine((v) => v.trim().split(/\s+/).length >= 2, {
        message: "Informe nome e sobrenome.",
      }),

    phoneNumber: schemaHelper.phoneNumber({
      message: {
        invalid_type: "Por favor, informe um WhatsApp válido.",
        required: "Por favor, informe o WhatsApp.",
      },
      isValid: isValidBRPhone,
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
