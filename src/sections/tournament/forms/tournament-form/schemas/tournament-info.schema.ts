import { z as zod } from "zod";
import { TournamentGender, TournamentModality } from "@natrave/tournaments-service-types";

export const TournamentDraftSchema = zod.object({
  name: zod.string().min(1, { message: "Nome do campeonato é obrigatório" }),
  gender: zod.nativeEnum(TournamentGender, {
    errorMap: () => ({ message: "Por favor, informe o gênero." }),
  }),
  modality: zod.nativeEnum(TournamentModality, {
    errorMap: () => ({ message: "Modalidade é obrigatória." }),
  }),
});
