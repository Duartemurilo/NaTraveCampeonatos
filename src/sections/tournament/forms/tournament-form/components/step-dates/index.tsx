import { useWatch, Controller } from "react-hook-form";

import Stack from "@mui/material/Stack";
import { useTheme, Typography, useMediaQuery } from "@mui/material";

import { useCities, useStates } from "src/hooks/brazil-addresses";

import { Field } from "src/components/hook-form";

export function StepDates() {
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"));

  const selectedState = useWatch({ name: "state" });

  const { states, isLoading: statesLoading } = useStates();
  const { cities, isLoading: citiesLoading } = useCities(selectedState);

  return (
    <Stack spacing={isMdOrSmaller ? 5 : 10} sx={{ pt: 0, pl: { xs: 0, lg: 7 } }}>
      <Typography
        variant="h2"
        mt={-2}
        textAlign={{ xs: "center", md: "center", lg: "left" }}
        py={{ xs: 2, md: 0 }}
      >
        <Typography component="span" variant="inherit" color="primary">
          Onde{" "}
        </Typography>
        e{" "}
        <Typography component="span" variant="inherit" color="primary">
          quando{" "}
        </Typography>
        será o campeonato?
      </Typography>

      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight="regular">
          <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
            Onde{" "}
          </Typography>
          serão realizados os jogos?
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Stack spacing={1.5} sx={{ flex: 1, maxWidth: { xs: "100%", md: "100%", lg: "20%" } }}>
            <Controller
              name="state"
              render={({ field }) => (
                <Field.Autocomplete
                  {...field}
                  value={states.find((option) => option.value === field.value) || null}
                  onChange={(_, newValue) => field.onChange(newValue?.value)}
                  options={states}
                  getOptionLabel={(option) => option.label}
                  noOptionsText={
                    statesLoading ? "Carregando estados..." : "Nenhum estado encontrado"
                  }
                />
              )}
            />
          </Stack>

          <Stack spacing={1.5} sx={{ flex: 2, maxWidth: { xs: "100%", md: "100%", lg: "40%" } }}>
            <Controller
              name="city"
              render={({ field }) => (
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
      </Stack>

      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight="regular">
          Qual será o{" "}
          <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
            período{" "}
          </Typography>
          do campeonato?
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Stack spacing={1.5} sx={{ flex: 1, maxWidth: { xs: "100%", md: "100%", lg: "20%" } }}>
            <Field.DatePicker name="startDate" />
          </Stack>

          <Stack spacing={1.5} sx={{ flex: 1, maxWidth: { xs: "100%", md: "100%", lg: "20%" } }}>
            <Field.DatePicker name="endDate" />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
