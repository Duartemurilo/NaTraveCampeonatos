import { z as zod } from "zod";

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Por favor, informe o e-mail." })
    .email({ message: "Informe um e-mail válido (ex: exemplo@dominio.com)." }),
  password: zod.string().min(1, { message: "Por favor, informe a senha." }),
});
