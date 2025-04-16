import type { z as zod } from "zod";
import type { IChampionship } from "src/types/championship";

import type { ChampionshipInfoSchema } from "./schemas/championship-info.schema";
import type { ChampionshipDatesSchema } from "./schemas/championship-dates.schema";
import type { ChampionshipFormatSchema } from "./schemas/championship-format.schema";

export type Props = {
  initialStep?: number;
  championsShip?: IChampionship | null;
};

export type ChampionshipFormData =
  | ChampionshipInfoSchemaType
  | ChampionshipDatesSchemaType
  | ChampionshipFormatSchemaType;

export type ChampionshipInfoSchemaType = zod.infer<typeof ChampionshipInfoSchema>;
export type ChampionshipFormatSchemaType = zod.infer<typeof ChampionshipFormatSchema>;
export type ChampionshipDatesSchemaType = zod.infer<typeof ChampionshipDatesSchema>;

export type ChampionshipInfoData = ChampionshipInfoSchemaType & { id?: string; status?: string };
export type ChampionshipFormatData = ChampionshipFormatSchemaType & {
  id?: string;
  status?: string;
};
export type ChampionshipDatesData = ChampionshipDatesSchemaType & { id?: string; status?: string };

export type ChampionshipPayload =
  | ChampionshipInfoSchemaType
  | ChampionshipFormatSchemaType
  | ChampionshipDatesSchemaType;

export type ChampionshipResponse =
  | ChampionshipInfoData
  | ChampionshipFormatData
  | ChampionshipDatesData;
