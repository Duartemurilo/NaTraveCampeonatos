import type { GENDER } from "./gender";
import type { ChampionshipModality } from "./championship-modality";
import type { ChampionshipFormat, ChampionshipFormatConfig } from "./championship-format";

export type IChampionship = {
  id: string;
  rowDate: string;

  //Informações básicas
  championshipName: string;
  gender: GENDER;
  championshipModality: ChampionshipModality;

  //Formato do campeonato
  championshipFormat: ChampionshipFormat;
  formatConfig: ChampionshipFormatConfig;

  //Datas e localização
  startDate: string;
  endDate: string;
  state: string;
  city: string;
};
