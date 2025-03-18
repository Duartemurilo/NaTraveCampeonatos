import { z as zod } from "zod";

export type SignInSchemaType = zod.infer<typeof SignInSchema>;
export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "O email é obrigatório!" })
    .email({ message: "O email deve ser um endereço de email válido!" }),
  password: zod
    .string()
    .min(1, { message: "A senha é obrigatória!" })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres!" }),
});

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: "Nome é obrigatório!" }),
  lastName: zod.string().min(1, { message: "Sobrenome é obrigatório!" }),
  email: zod
    .string()
    .min(1, { message: "Email é obrigatório!" })
    .email({ message: "Email deve ser válido!" }),

  password: zod
    .string()
    .min(1, { message: "Senha é obrigatória!" })
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres!" }),
});

export const ResetPasswordStep1Schema = zod.object({
  email: zod
    .string()
    .min(1, { message: "O email é obrigatório!" })
    .email({ message: "O email deve ser um endereço válido!" }),
});

export const ResetPasswordStep2Schema = zod.object({
  password: zod.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres!" }),
  code: zod.string().min(1, { message: "O código de recuperação é obrigatório!" }),
});
