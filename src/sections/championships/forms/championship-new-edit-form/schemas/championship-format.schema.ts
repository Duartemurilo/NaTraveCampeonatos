import { z as zod } from "zod";

import { ChampionshipFormat } from "src/types/championship-format";

export const ChampionshipFormatSchema = zod.discriminatedUnion("championshipFormat", [
  zod.object({
    championshipFormat: zod.literal(ChampionshipFormat.ROUND_ROBIN, {
      errorMap: () => ({ message: "O formato Round Robin é obrigatório." }),
    }),
    formatConfig: zod.object({
      numberOfTeams: zod.number({
        required_error: "Informe o número de times para o Round Robin.",
        invalid_type_error: "O número de times deve ser um valor numérico.",
      }),
      hasHomeAndAway: zod.boolean({
        required_error: "Indique se há sistema de ida e volta para o Round Robin.",
        invalid_type_error: "O valor para ida e volta deve ser verdadeiro ou falso.",
      }),
    }),
  }),

  zod.object({
    championshipFormat: zod.literal(ChampionshipFormat.KNOCKOUT, {
      errorMap: () => ({ message: "O formato Knockout é obrigatório." }),
    }),
    formatConfig: zod.object({
      numberOfTeams: zod.number({
        required_error: "Informe o número de times para o Knockout.",
        invalid_type_error: "O número de times deve ser um valor numérico.",
      }),
      hasHomeAndAway: zod.boolean({
        required_error: "Indique se há sistema de ida e volta para o Knockout.",
        invalid_type_error: "O valor para ida e volta deve ser verdadeiro ou falso.",
      }),
    }),
  }),

  zod.object({
    championshipFormat: zod.literal(ChampionshipFormat.GROUP_AND_KNOCKOUT, {
      errorMap: () => ({ message: "O formato Grupo e Knockout é obrigatório." }),
    }),
    formatConfig: zod.object({
      numberOfTeams: zod.number({
        required_error: "Informe o número de times para o Grupo e Knockout.",
        invalid_type_error: "O número de times deve ser um valor numérico.",
      }),
      numberOfGroups: zod.number({
        required_error: "Informe o número de grupos.",
        invalid_type_error: "O número de grupos deve ser um valor numérico.",
      }),
      qualifiedPerGroup: zod.number({
        required_error: "Informe a quantidade de classificados por grupo.",
        invalid_type_error: "A quantidade de classificados deve ser um valor numérico.",
      }),
      hasHomeAndAwayGroup: zod
        .boolean({
          invalid_type_error: "O valor de ida e volta para grupos deve ser verdadeiro ou falso.",
        })
        .optional()
        .default(false),
      hasHomeAndAwayKnockout: zod
        .boolean({
          invalid_type_error: "O valor de ida e volta para knockout deve ser verdadeiro ou falso.",
        })
        .optional()
        .default(false),
    }),
  }),

  zod.object({
    championshipFormat: zod.literal(ChampionshipFormat.ROUND_ROBIN_AND_KNOCKOUT, {
      errorMap: () => ({ message: "O formato Round Robin e Knockout é obrigatório." }),
    }),
    formatConfig: zod.object({
      numberOfTeams: zod.number({
        required_error: "Informe o número de times para o Round Robin e Knockout.",
        invalid_type_error: "O número de times deve ser um valor numérico.",
      }),
      qualifiedToKnockout: zod.number({
        required_error: "Informe quantos times se classificam para a fase de knockout.",
        invalid_type_error: "A quantidade de classificados deve ser um valor numérico.",
      }),
      hasHomeAndAwayRoundRobin: zod
        .boolean({
          invalid_type_error:
            "O valor de ida e volta na fase round robin deve ser verdadeiro ou falso.",
        })
        .optional()
        .default(false),
      hasHomeAndAwayKnockout: zod
        .boolean({
          invalid_type_error:
            "O valor de ida e volta na fase knockout deve ser verdadeiro ou falso.",
        })
        .optional()
        .default(false),
    }),
  }),
]);
