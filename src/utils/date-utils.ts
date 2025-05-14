import type { Dayjs } from "dayjs";

import dayjs from "dayjs";

export function toStartOfDay(date: string | Date | Dayjs): Dayjs {
  return dayjs(date).startOf("day");
}
