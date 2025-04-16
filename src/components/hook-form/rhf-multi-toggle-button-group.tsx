"use client";

import type { ToggleButtonGroupProps } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

import {
  styled,
  FormLabel,
  FormControl,
  ToggleButton,
  FormHelperText,
  ToggleButtonGroup,
} from "@mui/material";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  borderColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

type Option = {
  label: string;
  value: string;
};

type RHFMultiToggleButtonGroupProps = Omit<ToggleButtonGroupProps, "value" | "onChange"> & {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  options: Option[];
};

export function RHFMultiToggleButtonGroup({
  name,
  label,
  helperText,
  options,
  sx,
  ...other
}: RHFMultiToggleButtonGroupProps) {
  const { control } = useFormContext();

  const handleToggle = (selectedValues: string[], value: string) => {
    if (selectedValues.includes(value)) {
      return selectedValues.filter((item) => item !== value);
    }
    return [...selectedValues, value];
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" sx={sx}>
          {label && (
            <FormLabel component="legend" sx={{ mb: 1 }}>
              {label}
            </FormLabel>
          )}

          <ToggleButtonGroup
            exclusive={false}
            value={field.value || []}
            onChange={(_, clickedValue) => {
              const newValue = handleToggle(field.value || [], clickedValue);
              field.onChange(newValue);
            }}
            {...other}
          >
            {options.map((option) => (
              <StyledToggleButton key={option.value} value={option.value}>
                {option.label}
              </StyledToggleButton>
            ))}
          </ToggleButtonGroup>

          {!!helperText || error?.message ? (
            <FormHelperText error={!!error} sx={{ mt: 1 }}>
              {error?.message || helperText}
            </FormHelperText>
          ) : null}
        </FormControl>
      )}
    />
  );
}
