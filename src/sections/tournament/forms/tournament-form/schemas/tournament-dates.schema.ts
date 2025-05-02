import type { BrazilianState } from "@natrave/tournaments-service-types";

import { z as zod } from "zod";

export const TournamentPeriodAndLocationSchema = zod
  .object({
    initialDate: zod.string().min(1, { message: "Data de início é obrigatória" }),
    endDate: zod.string().min(1, { message: "Data de término é obrigatória" }),
    state: zod.custom<BrazilianState>().refine((val) => !!val, { message: "Estado é obrigatório" }),
    city: zod.string().min(1, { message: "Cidade é obrigatória" }),
    tournamentId: zod.number().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.initialDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    {
      message: "A data de término não pode ser anterior à data de início",
      path: ["endDate"],
    }
  );
