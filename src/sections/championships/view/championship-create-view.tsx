"use client";

import type { IChampionship } from "src/types/championship";

import React from "react";
import { useSearchParams } from "next/navigation";

import { useGetById } from "src/hooks/request/use-get-by-id";

import { SplashScreen } from "src/components/loading-screen";

import { ChampionshipNewEditForm } from "../forms/championship-new-edit-form";

export default function ChampionshipCreateView({ initialStep }: { initialStep?: number }) {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const id = searchParams.get("id");

  const fetcher = useGetById<IChampionship>({
    key: ["championship", id],
    endpoint: "/championships",
    id: id || "",
    enabled: Boolean(id),
  });

  if (!id) {
    return <ChampionshipNewEditForm initialStep={Number(step) || initialStep} />;
  }

  const { data: championship, isLoading } = fetcher;
  if (isLoading) return <SplashScreen />;

  return (
    <ChampionshipNewEditForm
      championsShip={championship}
      initialStep={Number(step) || initialStep}
    />
  );
}
