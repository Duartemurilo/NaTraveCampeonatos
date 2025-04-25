import { z } from "zod";
import { TournamentFormat } from "@natrave/tournaments-service-types";

export const TournamentFormatSchema = z.discriminatedUnion("format", [
  // TODOS CONTRA TODOS
  z.object({
    format: z.literal(TournamentFormat.ROUND_ROBIN, {
      errorMap: () => ({ message: "Selecione o formato 'Todos contra todos' para continuar." }),
    }),
    teamCount: z.number({
      required_error: "Informe a quantidade de times no formato 'Todos contra todos'.",
      invalid_type_error: "O número de times deve ser um valor numérico.",
    }),
    initialPhaseMatchMode: z.boolean().nullable().default(null),
    knockoutMatchMode: z.boolean().nullable().default(null),
    numberOfGroups: z.number().nullable().default(null),
    teamsAdvancing: z.number().nullable().default(null),
  }),

  // ELIMINATÓRIO
  z.object({
    format: z.literal(TournamentFormat.KNOCKOUT, {
      errorMap: () => ({ message: "Selecione o formato 'Eliminatório' para continuar." }),
    }),
    teamCount: z.number({
      required_error: "Informe a quantidade de times no formato eliminatório.",
      invalid_type_error: "O número de times deve ser um valor numérico.",
    }),
    initialPhaseMatchMode: z.boolean().nullable().default(null),

    knockoutMatchMode: z.boolean().nullable().default(null),
    numberOfGroups: z.number().nullable().default(null),
    teamsAdvancing: z.number().nullable().default(null),
  }),

  // FASE DE GRUPOS + ELIMINATÓRIA
  z.object({
    format: z.literal(TournamentFormat.GROUPS_AND_KNOCKOUT, {
      errorMap: () => ({
        message: "Selecione o formato 'Fase de grupos + Eliminatória' para continuar.",
      }),
    }),
    teamCount: z.number({
      required_error: "Informe a quantidade de times no formato com grupos e eliminatória.",
      invalid_type_error: "O número de times deve ser um valor numérico.",
    }),
    initialPhaseMatchMode: z.boolean().nullable().default(null),

    knockoutMatchMode: z.boolean().nullable().default(null),
    numberOfGroups: z.number({
      required_error: "Informe o número de grupos da fase inicial.",
      invalid_type_error: "O número de grupos deve ser um valor numérico.",
    }),
    teamsAdvancing: z.number({
      required_error: "Informe quantos times avançam de cada grupo.",
      invalid_type_error: "Esse valor deve ser um número.",
    }),
  }),

  // TODOS CONTRA TODOS + ELIMINATÓRIA
  z.object({
    format: z.literal(TournamentFormat.ROUND_ROBIN_AND_KNOCKOUT, {
      errorMap: () => ({
        message: "Selecione o formato 'Todos contra todos + Eliminatória' para continuar.",
      }),
    }),
    teamCount: z.number({
      required_error: "Informe a quantidade de times para o formato combinado.",
      invalid_type_error: "O número de times deve ser um valor numérico.",
    }),
    initialPhaseMatchMode: z.boolean().nullable().default(null),
    knockoutMatchMode: z.boolean().nullable().default(null),
    numberOfGroups: z.number().nullable().default(null),
    teamsAdvancing: z.number({
      required_error: "Informe quantos times se classificam para a fase eliminatória.",
      invalid_type_error: "Esse valor deve ser um número.",
    }),
  }),
]);

export type TournamentFormatSchemaType = z.infer<typeof TournamentFormatSchema>;
