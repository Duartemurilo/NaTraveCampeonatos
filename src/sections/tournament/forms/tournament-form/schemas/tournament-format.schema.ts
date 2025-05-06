// schemas/tournament-format.schema.ts
import { z } from "zod";
import { TournamentFormat } from "@natrave/tournaments-service-types";

export const TournamentFormatSchema = z.discriminatedUnion("format", [
  // Todos contra todos
  z.object({
    format: z.literal(TournamentFormat.ROUND_ROBIN, {
      errorMap: () => ({
        message: "Selecione o formato 'Todos contra todos'",
      }),
    }),
    teamCount: z.number({
      required_error: "Informe quantos times participarão",
      invalid_type_error: "O número de times deve ser um valor numérico",
    }),
    initialPhaseMatchMode: z.boolean().nullable().default(null),
    knockoutMatchMode: z.boolean().nullable().default(null),
    numberOfGroups: z.number().nullable().default(null),
    teamsAdvancing: z.number().nullable().default(null),
  }),

  // Eliminatório
  z.object({
    format: z.literal(TournamentFormat.KNOCKOUT, {
      errorMap: () => ({
        message: "Selecione o formato 'Eliminatório'",
      }),
    }),
    teamCount: z.number({
      required_error: "Informe quantos times participarão",
      invalid_type_error: "O número de times deve ser um valor numérico",
    }),
    initialPhaseMatchMode: z.boolean().nullable().default(null),
    knockoutMatchMode: z.boolean().nullable().default(null),
    numberOfGroups: z.number().nullable().default(null),
    teamsAdvancing: z.number().nullable().default(null),
  }),

  // Fase de Grupos + Eliminatória
  z.object({
    format: z.literal(TournamentFormat.GROUPS_AND_KNOCKOUT, {
      errorMap: () => ({
        message: "Selecione o formato 'Fase de grupos + Eliminatória'",
      }),
    }),
    teamCount: z.number({
      required_error: "Informe quantos times participarão",
      invalid_type_error: "O número de times deve ser um valor numérico",
    }),
    initialPhaseMatchMode: z.boolean().nullable().default(null),
    knockoutMatchMode: z.boolean().nullable().default(null),
    numberOfGroups: z.number({
      required_error: "Informe quantos grupos na fase inicial",
      invalid_type_error: "O número de grupos deve ser um valor numérico",
    }),
    teamsAdvancing: z.number({
      required_error: "Informe quantos times avançam de cada grupo",
      invalid_type_error: "O número de times avançando deve ser numérico",
    }),
  }),

  // Todos contra todos + Eliminatória
  z.object({
    format: z.literal(TournamentFormat.ROUND_ROBIN_AND_KNOCKOUT, {
      errorMap: () => ({
        message: "Selecione o formato 'Todos contra todos + Eliminatória'",
      }),
    }),
    teamCount: z.number({
      required_error: "Informe quantos times participarão",
      invalid_type_error: "O número de times deve ser um valor numérico",
    }),
    initialPhaseMatchMode: z.boolean().nullable().default(null),
    knockoutMatchMode: z.boolean().nullable().default(null),
    numberOfGroups: z.number().nullable().default(null),
    teamsAdvancing: z.number({
      required_error: "Informe quantos times se classificam para a fase eliminatória",
      invalid_type_error: "O número de times classificando deve ser numérico",
    }),
  }),
]);

export type TournamentFormatSchemaType = z.infer<typeof TournamentFormatSchema>;
