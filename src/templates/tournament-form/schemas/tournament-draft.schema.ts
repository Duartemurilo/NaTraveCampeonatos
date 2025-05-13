// schemas/tournament-draft.schema.ts
import { z as zod } from "zod";
import { TournamentGender, TournamentModality } from "@natrave/tournaments-service-types";

export const TournamentDraftSchema = zod.object({
  name: zod.string().min(1, { message: "Informe o nome do campeonato" }),
  gender: zod.nativeEnum(TournamentGender, {
    errorMap: () => ({ message: "Escolha o gênero do torneio" }),
  }),
  modality: zod.nativeEnum(TournamentModality, {
    errorMap: () => ({ message: "Selecione a modalidade do torneio" }),
  }),
});

export type TournamentDraftSchemaType = zod.infer<typeof TournamentDraftSchema>;
