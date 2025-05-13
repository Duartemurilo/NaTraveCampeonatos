import type { SxProps } from "@mui/material";

import { TournamentStatus } from "@natrave/tournaments-service-types";

export function getTournamentStatusDisplay(status: TournamentStatus): {
  label: string;
  color: "success" | "error" | "info" | "default" | "warning";
  sx?: SxProps;
} {
  switch (status) {
    case TournamentStatus.PUBLISHED:
      return { label: "Publicado", color: "success" };
    case TournamentStatus.DRAFT:
    case TournamentStatus.FORMAT_DRAFT:
    case TournamentStatus.CREATED:
      return {
        label: "Não publicado",
        color: "warning",
        sx: {
          color: "#fff",
        },
      };
    default:
      return { label: "Desconhecido", color: "info" };
  }
}
