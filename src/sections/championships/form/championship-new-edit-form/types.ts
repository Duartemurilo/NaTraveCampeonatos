import type { IChampionship, IChampionshipInput } from "src/types/championship";

export type ChampionshipNewEditFormProps = {
  championsShip?: IChampionship | null;
};

export interface ChampionshipFormData extends IChampionshipInput {}
