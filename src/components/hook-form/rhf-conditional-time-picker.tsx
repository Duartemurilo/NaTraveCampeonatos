import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

import { TimePicker, MobileTimePicker } from "@mui/x-date-pickers";

import useBreakpoint from "src/hooks/use-breakpoint";

// If you prefer "hh:mm a" (12-hour format) instead of "HH:mm", adjust as needed.
const TIME_FORMAT = "HH:mm";

type RHFConditionalTimePickerProps = {
  name: string;
  [key: string]: any; // So you can pass extra props if desired
};

export function RHFConditionalTimePicker({ name, ...other }: RHFConditionalTimePickerProps) {
  const { control } = useFormContext();
  const { isMobile } = useBreakpoint();
  const PickerComponent = isMobile ? MobileTimePicker : TimePicker;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // Extract `onChange` + `value` so we can override them safely
        const { onChange, value, ...restField } = field;

        return (
          <PickerComponent
            {...restField}
            // Parse the value with dayjs. If it's blank or undefined, use null
            value={value ? dayjs(value, TIME_FORMAT) : null}
            // Format back to "HH:mm" (or your preferred time format)
            onChange={(newValue) => onChange(newValue ? newValue.format(TIME_FORMAT) : "")}
            // This ensures only hour/minute is shown in the pickers
            format={TIME_FORMAT}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
            {...other}
          />
        );
      }}
    />
  );
}
