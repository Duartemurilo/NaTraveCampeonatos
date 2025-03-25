"use client";

import type { FormLabelProps, FormControlProps, FormHelperTextProps } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

import { Checkbox, FormGroup, FormLabel, FormControl, FormControlLabel } from "@mui/material";

import { HelperText } from "./help-text";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  options: Option[];
  row?: boolean;
  slotProps?: {
    wrapper?: FormControlProps;
    formLabel?: FormLabelProps;
    helperText?: FormHelperTextProps;
  };
};

export function RHFSingleCheckboxGroup({
  name,
  label,
  options,
  helperText,
  row,
  slotProps,
}: Props) {
  const { control } = useFormContext();

  const formLabelSx = slotProps?.formLabel?.sx;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" {...slotProps?.wrapper}>
          {label && (
            <FormLabel
              component="legend"
              {...slotProps?.formLabel}
              sx={[
                { mb: 1, typography: "body2" },
                ...(Array.isArray(formLabelSx) ? formLabelSx : [formLabelSx ?? {}]),
              ]}
            >
              {label}
            </FormLabel>
          )}

          <FormGroup row={row}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                label={option.label}
                control={
                  <Checkbox
                    checked={field.value === option.value}
                    onChange={() => {
                      field.onChange(field.value === option.value ? undefined : option.value);
                    }}
                  />
                }
              />
            ))}
          </FormGroup>

          <HelperText
            {...slotProps?.helperText}
            disableGutters
            errorMessage={error?.message}
            helperText={helperText}
          />
        </FormControl>
      )}
    />
  );
}
