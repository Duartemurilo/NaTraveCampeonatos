import type { BrazilianState } from "@natrave/tournaments-service-types";

import { z as zod } from "zod";

export const TournamentPeriodAndLocationSchema = zod
  .object({
    initialDate: zod.string().nonempty({ message: "Selecione a data de início" }),
    endDate: zod.string().nonempty({ message: "Selecione a data de término" }),
    state: zod
      .custom<BrazilianState>()
      .refine((val) => !!val, { message: "Escolha o estado do torneio" }),
    city: zod.string().min(1, { message: "Informe a cidade do torneio" }),
    tournamentId: zod.number().optional(),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.initialDate), {
    message: "Escolha uma data de término igual ou posterior à data de início",
    path: ["endDate"],
  });

export type TournamentPeriodAndLocationSchemaType = zod.infer<
  typeof TournamentPeriodAndLocationSchema
>;
