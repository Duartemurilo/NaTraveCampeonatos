import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  TournamentGender,
  type ITournamentDraftFetchResponse,
} from "@natrave/tournaments-service-types";

import { MODALITY_OPTIONS } from "src/constants/tournament";
import { getTournamentStatusDisplay } from "src/layouts/championship-layout/helper";

export function useFormattedTournament(tournament: ITournamentDraftFetchResponse) {
  const statusDisplay = getTournamentStatusDisplay(tournament.status);

  const formattedInitialDate = tournament.initialDate
    ? format(new Date(tournament.initialDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : "Data não definida";

  const formattedEndDate = tournament.endDate
    ? format(new Date(tournament.endDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : "Data não definida";

  const modalityLabel =
    MODALITY_OPTIONS.find((opt) => opt.value === tournament.modality)?.label ||
    "Modalidade desconhecida";

  const genderLabel =
    {
      [TournamentGender.MALE]: "Masculino",
      [TournamentGender.FEMALE]: "Feminino",
      [TournamentGender.MIXED]: "Misto",
    }[tournament.gender] || "Gênero desconhecido";

  const formatLabel = "Pontos Corridos e Mata-Mata";

  return {
    statusDisplay,
    formattedInitialDate,
    formattedEndDate,
    modalityLabel,
    genderLabel,
    formatLabel,
  };
}
