import type { z as zod } from "zod";
import type { TournamentStatus } from "src/types/tournament"; // se existir

import type { TournamentDraftSchema } from "./schemas/tournament-info.schema";
import type { TournamentDatesSchema } from "./schemas/tournament-dates.schema";
import type { TournamentFormatSchema } from "./schemas/tournament-format.schema";
import type { useTournamentFormHandler } from "./hooks/use-tournament-form-handler";

// Tipagens brutas dos schemas
export type TournamentDraftSchemaType = zod.infer<typeof TournamentDraftSchema>;
export type TournamentFormatSchemaType = zod.infer<typeof TournamentFormatSchema>;
export type TournamentDatesSchemaType = zod.infer<typeof TournamentDatesSchema>;

// DTOs de envio
export type ITournamentFormatCreationDto = TournamentFormatSchemaType & {
  tournamentId: number;
};
export type ITournamentFinalizeDto = TournamentDatesSchemaType & {
  tournamentId: number;
};

// Respostas (pós envio de cada etapa)
export type ITournamentFormatCreationResponse = {
  tournamentId: number;
  status: TournamentStatus;
};

export type ITournamentFinalizeResponse = {
  tournamentId: number;
  status: TournamentStatus;
};

export type ReturnTypeOfUseTournamentFormHandler = ReturnType<typeof useTournamentFormHandler>;

export type StepSchemas = {
  0: TournamentDraftSchemaType;
  1: TournamentFormatSchemaType;
  2: TournamentDatesSchemaType;
};

export type TournamentStep = 0 | 1 | 2;
