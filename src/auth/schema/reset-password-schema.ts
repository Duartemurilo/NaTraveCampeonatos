import { z as zod } from "zod";

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
