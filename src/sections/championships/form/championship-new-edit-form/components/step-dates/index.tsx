import type { SelectOption } from "src/types/select";

import { useMemo } from "react";
import { useWatch, Controller } from "react-hook-form";

import Stack from "@mui/material/Stack";
import { Box, Chip, Typography } from "@mui/material";

import { useCities, useStates } from "src/hooks/brazil-addresses";

import { Field } from "src/components/hook-form";

import { MatchDays } from "src/types/match-days";

import { MATCH_DAYS_OPTIONS } from "../../constants";

export function StepDates() {
  const selectedState = useWatch({ name: "state" });
  const startDate = useWatch({ name: "startDate" });
  const endDate = useWatch({ name: "endDate" });

  const { states, isLoading: statesLoading } = useStates();
  const { cities, isLoading: citiesLoading } = useCities(selectedState);

  const filteredMatchDaysOptions: SelectOption<MatchDays>[] = useMemo(() => {
    if (!startDate || !endDate) return MATCH_DAYS_OPTIONS;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return MATCH_DAYS_OPTIONS;
    }

    const dayNames: MatchDays[] = [
      MatchDays.SUNDAY,
      MatchDays.MONDAY,
      MatchDays.TUESDAY,
      MatchDays.WEDNESDAY,
      MatchDays.THURSDAY,
      MatchDays.FRIDAY,
      MatchDays.SATURDAY,
    ];

    const daysSet = new Set<MatchDays>();
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      daysSet.add(dayNames[d.getDay()]);
    }

    return MATCH_DAYS_OPTIONS.filter((option) => daysSet.has(option.value));
  }, [startDate, endDate]);

  return (
    <Box>
      <Stack
        spacing={3}
        sx={{
          rowGap: 3,
          p: 3,
          columnGap: 2,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" },
        }}
      >
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Data de Início*</Typography>
          <Field.DatePicker name="startDate" />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Data de Término*</Typography>
          <Field.DatePicker name="endDate" />
        </Stack>

        <Stack spacing={1.5} sx={{ gridColumn: { sm: "span 2" } }}>
          <Typography variant="subtitle2">Dias com jogos</Typography>
          <Controller
            name="matchDays"
            render={({ field, fieldState }) => (
              <>
                <Field.Autocomplete
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={(_, selectedOptions: SelectOption<MatchDays>[]) => {
                    field.onChange(selectedOptions.map((option) => option.value));
                  }}
                  noOptionsText="Nenhum dia com jogos"
                  multiple
                  disableCloseOnSelect
                  options={filteredMatchDaysOptions}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value}
                  value={filteredMatchDaysOptions.filter((opt) => field.value?.includes(opt.value))}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                  renderTags={(selected, getTagProps) =>
                    selected.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option.value}
                        label={option.label}
                        size="small"
                        color="primary"
                        variant="soft"
                      />
                    ))
                  }
                />
                {fieldState.error && (
                  <Typography variant="caption" color="error">
                    {fieldState.error.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Hora de Início*</Typography>
          <Field.TimePicker name="startTime" />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Hora de Término*</Typography>
          <Field.TimePicker name="endTime" />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Estado*</Typography>
          <Controller
            name="state"
            render={({ field, fieldState }) => (
              <Field.Autocomplete
                {...field}
                value={states.find((option) => option.value === field.value) || null}
                onChange={(_, newValue) => field.onChange(newValue?.value)}
                options={states}
                getOptionLabel={(option) => option.label}
                noOptionsText={statesLoading ? "Carregando estados..." : "Nenhum estado encontrado"}
              />
            )}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cidade*</Typography>
          <Controller
            name="city"
            render={({ field, fieldState }) => (
              <Field.Autocomplete
                {...field}
                value={cities.find((option) => option.value === field.value) || null}
                onChange={(_, newValue) => field.onChange(newValue?.value)}
                options={cities}
                getOptionLabel={(option) => option.label}
                noOptionsText={
                  citiesLoading ? "Carregando cidades..." : "Nenhuma cidade encontrada"
                }
                disabled={!selectedState}
              />
            )}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
