"use client";

import type { ITournament } from "src/types/tournament";

import React from "react";
import { useSearchParams } from "next/navigation";

import { useGetById } from "src/hooks/request/use-get-by-id";

import { TournamentForm } from "../forms/tournament-form";

import type { TournamentStep } from "../forms/tournament-form/types";

export default function TournamentCreateView() {
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const idParam = searchParams.get("id");

  const tournamentId = idParam || "";
  const initialStep = Number(stepParam) || 0;

  const fetcher = useGetById<ITournament>({
    key: ["tournament", tournamentId],
    endpoint: "/tournaments",
    id: tournamentId,
    enabled: Boolean(tournamentId),
  });

  const { data: tournament } = fetcher;

  return (
    <TournamentForm
      tournament={tournament}
      currentStep={initialStep as TournamentStep}
      tournamentId={tournamentId}
    />
  );
}
