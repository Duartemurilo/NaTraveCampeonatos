import type { Dayjs } from "dayjs";

import { forwardRef } from "react";

import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers/DatePicker";

type Props = DatePickerProps<Dayjs> & {
  minDate?: string;
};

export const DatePickerLimited = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <DatePicker {...props} referenceDate={props.minDate} ref={ref} />
));
