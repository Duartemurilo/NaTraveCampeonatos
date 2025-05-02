import { STEP_PARAM } from "../constants";

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
