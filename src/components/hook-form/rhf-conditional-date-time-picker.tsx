import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

import { DateTimePicker, MobileDateTimePicker } from "@mui/x-date-pickers";

import useBreakpoint from "src/hooks/use-breakpoint";

import { formatPatterns } from "src/utils/format-time";

type RHFConditionalDateTimePickerProps = {
  name: string;
  [key: string]: any;
};

export function RHFConditionalDateTimePicker({
  name,
  ...other
}: RHFConditionalDateTimePickerProps) {
  const { control } = useFormContext();
  const { isMobile } = useBreakpoint();
  const PickerComponent = isMobile ? MobileDateTimePicker : DateTimePicker;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ...restField } = field;

        return (
          <PickerComponent
            {...restField}
            value={value ? dayjs(value) : null}
            onChange={(newValue) => onChange(newValue ? newValue.format() : "")}
            format={formatPatterns.split.dateTime}
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
