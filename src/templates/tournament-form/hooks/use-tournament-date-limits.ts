import type { Dayjs } from "dayjs";

import dayjs from "dayjs";
import { useMemo } from "react";

import { toStartOfDay } from "src/utils/date-utils";

export function useTournamentDateLimits(initialDate?: string | Dayjs) {
  const today = useMemo<Dayjs>(() => dayjs().startOf("day"), []);

  const minInitialDate = today;
  const minEndDate = initialDate ? toStartOfDay(initialDate) : today;

  return { minInitialDate, minEndDate };
}
