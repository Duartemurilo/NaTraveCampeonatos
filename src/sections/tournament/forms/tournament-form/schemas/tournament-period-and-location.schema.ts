import type { BrazilianState } from "@natrave/tournaments-service-types";

import { z as zod } from "zod";

// --- util para comparar só a parte "dia/mês/ano" -----------------------------
const toStartOfDay = (dateStr: string) => {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return d;
};
// ------------------------------------------------------------------------------

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
  // ⬇️ 1. início não pode ser antes de hoje
  .refine(
    (data) => {
      const today = toStartOfDay(new Date().toISOString());
      const initial = toStartOfDay(data.initialDate);
      return initial >= today;
    },
    {
      message: "A data de início não pode ser anterior à data atual.",
      path: ["initialDate"],
    }
  )
  // ⬇️ 2. término não pode ser antes do início
  .refine((data) => toStartOfDay(data.endDate) >= toStartOfDay(data.initialDate), {
    message: "Escolha uma data de término igual ou posterior à data de início",
    path: ["endDate"],
  });

export type TournamentPeriodAndLocationSchemaType = zod.infer<
  typeof TournamentPeriodAndLocationSchema
>;
