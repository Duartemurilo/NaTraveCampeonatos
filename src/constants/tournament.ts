import type { SelectOption } from "src/types/select";

import {
  TournamentFormat,
  TournamentGender,
  TournamentModality,
} from "@natrave/tournaments-service-types";

import { MatchDays } from "src/types/match-days";

export const MATCH_DAYS_OPTIONS: SelectOption<MatchDays>[] = [
  { label: "Segunda-feira", value: MatchDays.MONDAY },
  { label: "Terça-feira", value: MatchDays.TUESDAY },
  { label: "Quarta-feira", value: MatchDays.WEDNESDAY },
  { label: "Quinta-feira", value: MatchDays.THURSDAY },
  { label: "Sexta-feira", value: MatchDays.FRIDAY },
  { label: "Sábado", value: MatchDays.SATURDAY },
  { label: "Domingo", value: MatchDays.SUNDAY },
];

export const GENDER_OPTIONS = [
  { label: "Masculino", value: TournamentGender.MALE },
  { label: "Feminino", value: TournamentGender.FEMALE },
  { label: "Misto", value: TournamentGender.MIXED },
];

export const MODALITY_OPTIONS = [
  { label: "Futebol Society", value: TournamentModality.SOCIETY },
  { label: "Fut7", value: TournamentModality.FUT7 },
  { label: "Futebol de Campo", value: TournamentModality.ELEVEN_A_SIDE },
  { label: "Futsal", value: TournamentModality.FUTSAL },
  { label: "Futebol de Areia", value: TournamentModality.BEACH },
];

export const FORMAT_OPTIONS = [
  { label: "Pontos Corridos", value: TournamentFormat.ROUND_ROBIN },
  { label: "Mata-mata", value: TournamentFormat.KNOCKOUT },
  { label: "Grupos e Mata-Mata", value: TournamentFormat.GROUPS_AND_KNOCKOUT },
  { label: "Pontos Corridos e Mata-Mata", value: TournamentFormat.ROUND_ROBIN_AND_KNOCKOUT },
];

export const TEAM_OPTIONS = [
  { label: "2", value: 2 },
  { label: "4", value: 4 },
  { label: "8", value: 8 },
  { label: "16", value: 16 },
  { label: "32", value: 32 },
  { label: "64", value: 64 },
];

export const QUALIFIED_OPTIONS = [
  { label: "2", value: 2 },
  { label: "4", value: 4 },
];
