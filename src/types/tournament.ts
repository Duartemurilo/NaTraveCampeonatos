import type {
  TournamentFormat,
  TournamentGender,
  TournamentModality,
} from "@natrave/tournaments-service-types";

import type { TournamentFormatConfig } from "./tournament-format";

export type ITournament = {
  id: string;
  rowDate: string;

  //Informações básicas
  name: string;
  gender: TournamentGender;
  modality: TournamentModality;

  //Formato do campeonato
  format: TournamentFormat;
  formatConfig: TournamentFormatConfig;

  //Datas e localização
  startDate: string;
  endDate: string;
  state: string;
  city: string;
};

export enum TournamentStatus {
  DRAFT = "draft", // Torneio em rascunho, dados incompletos ou ainda em edição.
  FORMAT_DRAFT = "format_draft", // Torneio em rascunho, dados incompletos ou ainda em edição, mas com formato definido.
  CREATED = "created", // Torneio criado, porém não publicado para inscrições.
  PUBLISHED = "published", // Torneio publicado e disponível para inscrições.
}
