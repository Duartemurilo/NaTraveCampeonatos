import type { z as zod } from "zod";

import type { TournamentDraftSchema } from "./schemas/tournament-info.schema";
import type { TournamentFormatSchema } from "./schemas/tournament-format.schema";
import type { useTournamentFormHandler } from "./hooks/use-tournament-form-handler";
import type { TournamentPeriodAndLocationSchema } from "./schemas/tournament-dates.schema";

// Tipagens brutas dos schemas
export type TournamentDraftSchemaType = zod.infer<typeof TournamentDraftSchema>;
export type TournamentPeriodAndLocationSchemaType = zod.infer<
  typeof TournamentPeriodAndLocationSchema
>;
export type TournamentFormatSchemaType = zod.infer<typeof TournamentFormatSchema>;

export type ReturnTypeOfUseTournamentFormHandler = ReturnType<typeof useTournamentFormHandler>;

export type TournamentStep = 0 | 1 | 2;
