"use client";

import type { ITournamentDraftFetchResponse } from "@natrave/tournaments-service-types";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import { Tab, Stack } from "@mui/material";

import { useGetById } from "src/hooks/request/use-get-by-id";

import { endpoints } from "src/lib/axios";
import { MainSection } from "src/layouts/core";
import { SWR_KEYS } from "src/constants/swr-keys";

import { Label } from "src/components/label";
import { LoadingScreen } from "src/components/loading-screen";
import { navSectionClasses } from "src/components/nav-section";

import { View500 } from "src/sections/error";

import { StyledTabs } from "./styled";
import { TournamentTabValue } from "./types";
import GeneralInformationTab from "./tabs/general-information-tab";
import { TOURNAMENT_TABS, TOURNAMENT_TAB_PARAM } from "./constants";

import type { TournamentTab, TournamentTabItem } from "./types";

type Props = {
  tournamentId: string;
  initialTab: TournamentTab;
};

export default function TournamentDetailsView({ tournamentId, initialTab }: Props) {
  const pathname = usePathname();
  const [tab, setTab] = useState<TournamentTab>(initialTab);

  const {
    data: tournament,
    isLoading,
    error,
  } = useGetById<ITournamentDraftFetchResponse>({
    key: [SWR_KEYS.getTournamentDraft, tournamentId],
    endpoint: endpoints.tournament.getDraft,
    id: tournamentId,
    enabled: Boolean(tournamentId),
    swrConfig: {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
    },
  });

  const handleChange = (_: React.SyntheticEvent, newTab: TournamentTab) => {
    setTab(newTab);
    const url = `${pathname}?${TOURNAMENT_TAB_PARAM}=${newTab}`;
    window.history.replaceState(null, "", url);
  };

  const renderIcon = (icon: React.ReactElement) =>
    React.cloneElement(icon, {
      className: navSectionClasses.item.icon,
    });

  const renderTabContent = (t: TournamentTabItem) => {
    const content = (
      <Stack direction="row" alignItems="center" spacing={1}>
        {renderIcon(t.icon)}
        {t.label}
      </Stack>
    );

    if (t.value === tab) {
      return (
        <Label color="success" variant="soft" sx={{ py: 2, px: 1, borderRadius: 1 }}>
          {renderIcon(t.icon)}
          {t.label}
        </Label>
      );
    }

    return content;
  };

  const showLoadingScreen = isLoading && !tournament;
  const showErrorScreen = !!error;
  const showContent = !showLoadingScreen && !showErrorScreen;

  return (
    <MainSection>
      {showLoadingScreen && <LoadingScreen />}
      {showErrorScreen && <View500 showbutton={false} />}

      {showContent && (
        <>
          <Box sx={{ px: 2, mb: 3 }}>
            <StyledTabs value={tab} onChange={handleChange}>
              {TOURNAMENT_TABS.map((t) => (
                <Tab key={t.value} value={t.value} label={renderTabContent(t)} />
              ))}
            </StyledTabs>
          </Box>

          <Box sx={{ px: 2 }}>
            {tab === TournamentTabValue.GERAL && tournament && (
              <GeneralInformationTab tournament={tournament} />
            )}
            {tab === TournamentTabValue.CONFIGURACOES && <div>Conteúdo da aba Configurações</div>}
            {tab === TournamentTabValue.PARTIDAS && <div>Conteúdo da aba Partidas</div>}
            {tab === TournamentTabValue.TIMES && <div>Conteúdo da aba Times</div>}
            {tab === TournamentTabValue.CLASSIFICACAO && <div>Conteúdo da aba Classificação</div>}
          </Box>
        </>
      )}
    </MainSection>
  );
}
