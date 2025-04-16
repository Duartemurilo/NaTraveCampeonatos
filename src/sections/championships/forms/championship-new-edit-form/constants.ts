import type { SelectOption } from "src/types/select";

import { GENDER } from "src/types/gender";
import { MatchDays } from "src/types/match-days";
import { ChampionshipFormat } from "src/types/championship-format";
import { ChampionshipModality } from "src/types/championship-modality";

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
  { label: "Masculino", value: GENDER.MALE },
  { label: "Feminino", value: GENDER.FEMALE },
  { label: "Misto", value: GENDER.MIXED },
];

export const CHAMPIONSHIP_MODALITY_OPTIONS = [
  { label: "Futebol Society", value: ChampionshipModality.SOCIETY },
  { label: "Fut7", value: ChampionshipModality.FUT7 },
  { label: "Futebol de Campo", value: ChampionshipModality.FIELD },
  { label: "Futsal", value: ChampionshipModality.FUTSAL },
  { label: "Futebol de Areia", value: ChampionshipModality.BEACH },
];

export const FORMAT_OPTIONS = [
  { label: "Pontos Corridos", value: ChampionshipFormat.ROUND_ROBIN },
  { label: "Mata-mata", value: ChampionshipFormat.KNOCKOUT },
  { label: "Grupos e Mata-Mata", value: ChampionshipFormat.GROUP_AND_KNOCKOUT },
  { label: "Pontos Corridos e Mata-Mata", value: ChampionshipFormat.ROUND_ROBIN_AND_KNOCKOUT },
];

export const TEAM_OPTIONS = [
  { label: "4", value: 4 },
  { label: "8", value: 8 },
  { label: "16", value: 16 },
  { label: "32", value: 32 },
];

export const QUALIFIED_OPTIONS = [
  { label: "2", value: 2 },
  { label: "4", value: 4 },
];

export const STEP_PARAM = "step";
