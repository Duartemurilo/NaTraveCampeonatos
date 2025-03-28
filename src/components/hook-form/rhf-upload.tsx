import type { TextFieldProps } from "@mui/material/TextField";
import type { AutocompleteProps } from "@mui/material/Autocomplete";

// RHFUpload.tsx
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";

import { Upload, UploadBox, UploadAvatar } from "../upload";

export type AutocompleteBaseProps = Omit<
  AutocompleteProps<any, boolean, boolean, boolean>,
  "renderInput"
>;
export type RHFAutocompleteProps = AutocompleteBaseProps & {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  slotProps?: AutocompleteBaseProps["slotProps"] & {
    textfield?: TextFieldProps;
  };
};

export function RHFAutocomplete({
  name,
  label,
  slotProps,
  helperText,
  placeholder,
  ...other
}: RHFAutocompleteProps) {
  const { control, setValue } = useFormContext();
  const { textfield, ...otherSlotProps } = slotProps ?? {};
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          id={`rhf-autocomplete-${name}`}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              {...params}
              {...textfield}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error?.message ?? helperText}
              slotProps={{
                ...textfield?.slotProps,
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: "new-password",
                  ...textfield?.slotProps?.htmlInput,
                },
              }}
            />
          )}
          {...other}
          {...otherSlotProps}
        />
      )}
    />
  );
}

export function RHFUploadAvatar({
  name,
  slotProps,
  ...other
}: { name: string; slotProps?: { wrapper?: any } } & any) {
  const { control, setValue } = useFormContext();
  return (
    <Box {...slotProps?.wrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <UploadAvatar
              value={field.value}
              error={!!error}
              onDrop={(acceptedFiles: File[]) => {
                const value = acceptedFiles[0];
                setValue(name, value, { shouldValidate: true });
              }}
              {...other}
            />
            <FormHelperText error={!!error} sx={{ textAlign: "center" }}>
              {error?.message}
            </FormHelperText>
          </>
        )}
      />
    </Box>
  );
}

export function RHFUploadBox({ name, ...other }: { name: string } & any) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox value={field.value} error={!!error} {...other} />
      )}
    />
  );
}

export function RHFUpload({
  name,
  multiple,
  helperText,
  ...other
}: { name: string; multiple?: boolean; helperText?: string } & any) {
  const { control, setValue } = useFormContext();
  const handleDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const mapped = acceptedFiles.map(
        (file) => new File([file], file.name, { type: file.type, lastModified: file.lastModified })
      );
      const newValue = multiple
        ? [
            ...(Array.isArray(control._formValues[name]) ? control._formValues[name] : []),
            ...mapped,
          ]
        : mapped[0];
      setValue(name, newValue, { shouldValidate: true });
    },
    [multiple, name, setValue, control]
  );
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const uploadProps = {
          multiple,
          accept: { "image/*": [] },
          error: !!error,
          helperText: error?.message ?? helperText,
          onDrop: handleDrop,
          value: field.value,
          ...other,
        };
        return <Upload {...uploadProps} />;
      }}
    />
  );
}
