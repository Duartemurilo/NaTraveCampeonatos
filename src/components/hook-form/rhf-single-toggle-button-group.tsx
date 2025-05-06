"use client";

import type { ToggleButtonGroupProps } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
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
  border: `1px solid ${theme.palette.primary.main} !important`,
  color: theme.palette.text.primary,
  padding: theme.spacing(0.5, 2),
  width: "auto",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.main} !important`,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

type Option = {
  label: string;
  value: string;
};

type RHFSingleToggleButtonGroupProps = Omit<ToggleButtonGroupProps, "value" | "onChange"> & {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  options: Option[];
  column?: boolean;
};

export function RHFSingleToggleButtonGroup({
  name,
  label,
  helperText,
  options,
  sx,
  column = false,
  ...other
}: RHFSingleToggleButtonGroupProps) {
  const { control } = useFormContext();

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
            exclusive
            orientation={column ? "vertical" : "horizontal"}
            value={field.value || ""}
            onChange={(_, newValue) => {
              if (newValue !== null) field.onChange(newValue);
            }}
            sx={{
              display: "flex",
              flexWrap: column ? "nowrap" : "wrap",
              gap: 4,
              border: "none",
            }}
            {...other}
          >
            {options.map((option) => {
              const selected = field.value === option.value;
              return (
                <StyledToggleButton key={option.value} value={option.value}>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    {selected && <CheckIcon fontSize="small" sx={{ ml: column ? 0 : -1 }} />}
                    {option.label}
                  </Box>
                </StyledToggleButton>
              );
            })}
          </ToggleButtonGroup>

          {(!!helperText || error?.message) && (
            <FormHelperText error={!!error} sx={{ mt: 1 }}>
              {error?.message || helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
