import type { IChampionship } from "src/types/championship";

import { STEP_PARAM } from "../constants";
import { ChampionshipInfoSchema } from "../schemas/championship-info.schema";
import { ChampionshipDatesSchema } from "../schemas/championship-dates.schema";
import { ChampionshipFormatSchema } from "../schemas/championship-format.schema";
import {
  championshipInfoDefaultValues,
  championshipDatesDefaultValues,
  championshipFormatDefaultValues,
} from "../defaults/ championship-defaults";

export function getStepSchemaAndDefaults(step: number, championship?: IChampionship | null) {
  switch (step) {
    case 0:
      return {
        schema: ChampionshipInfoSchema,
        defaultValues: championship
          ? {
              championshipName: championship.championshipName,
              gender: championship.gender,
              championshipModality: championship.championshipModality,
            }
          : championshipInfoDefaultValues,
      };
    case 1:
      return {
        schema: ChampionshipFormatSchema,
        defaultValues:
          championship && championship.championshipFormat
            ? {
                championshipFormat: championship.championshipFormat,
                formatConfig: championship.formatConfig,
              }
            : championshipFormatDefaultValues,
      };
    case 2:
    default:
      return {
        schema: ChampionshipDatesSchema,
        defaultValues: championship
          ? {
              startDate: championship.startDate,
              endDate: championship.endDate,
              state: championship.state,
              city: championship.city,
            }
          : championshipDatesDefaultValues,
      };
  }
}

export const getRoute = (step: number, id?: string | null): string =>
  `?${STEP_PARAM}=${step}${id ? `&id=${id}` : ""}`;

export const createRedirectPath = (
  currentPath: string,
  query: { tab: string; id?: string }
): string => {
  const queryString = new URLSearchParams();
  queryString.set(STEP_PARAM, query.tab);
  if (query.id) queryString.set("id", query.id);
  return `${currentPath}?${queryString.toString()}`;
};
