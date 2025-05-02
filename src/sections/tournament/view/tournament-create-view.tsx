"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { TournamentForm } from "../forms/tournament-form";

import type { TournamentStep } from "../forms/tournament-form/types";

export default function TournamentCreateView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const stepParam = searchParams.get("step");
  const idParam = searchParams.get("id");

  useEffect(() => {
    if (!stepParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", "0");
      router.replace(`?${params.toString()}`);
    }
  }, [stepParam, searchParams, router]);

  const tournamentId = idParam || "";
  const initialStep = Number(stepParam) || 0;

  return <TournamentForm tournamentId={tournamentId} currentStep={initialStep as TournamentStep} />;
}
