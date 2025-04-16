import { z as zod } from "zod";

import { GENDER } from "src/types/gender";
import { ChampionshipModality } from "src/types/championship-modality";

export const ChampionshipInfoSchema = zod.object({
  championshipName: zod.string().min(1, { message: "Nome do campeonato é obrigatório" }),
  gender: zod.nativeEnum(GENDER, { errorMap: () => ({ message: "Por favor, informe o gênero." }) }),
  championshipModality: zod.nativeEnum(ChampionshipModality, {
    errorMap: () => ({ message: "Modalidade é obrigatória." }),
  }),
});
