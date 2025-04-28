"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { TournamentForm } from "../forms/tournament-form";

import type { TournamentStep } from "../forms/tournament-form/types";

export default function TournamentCreateView() {
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const idParam = searchParams.get("id");

  const tournamentId = idParam || "";
  const initialStep = Number(stepParam) || 0;

  return <TournamentForm tournamentId={tournamentId} currentStep={initialStep as TournamentStep} />;
}
