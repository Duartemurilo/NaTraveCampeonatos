import type { z as zod } from "zod";

import type { SignInSchema } from "../schema/sign-in-schema";
import type { SignUpSchema } from "../schema/sign-up-schema";

export type SignInSchemaType = zod.infer<typeof SignInSchema>;
export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;
