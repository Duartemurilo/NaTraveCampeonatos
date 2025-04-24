import { z as zod } from "zod";

export const TournamentDatesSchema = zod
  .object({
    startDate: zod.string().min(1, { message: "Data de início é obrigatória" }),
    endDate: zod.string().min(1, { message: "Data de término é obrigatória" }),
    state: zod.string().min(1, { message: "Estado é obrigatório" }),
    city: zod.string().min(1, { message: "Cidade é obrigatória" }),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    {
      message: "A data de término não pode ser anterior à data de início",
      path: ["endDate"],
    }
  );
