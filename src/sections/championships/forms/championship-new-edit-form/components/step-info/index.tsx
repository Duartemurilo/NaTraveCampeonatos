import Stack from "@mui/material/Stack";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useTheme, Typography, useMediaQuery, InputAdornment } from "@mui/material";

import { Field } from "src/components/hook-form";

import { GENDER_OPTIONS, CHAMPIONSHIP_MODALITY_OPTIONS } from "../../constants";

export function StepInfo() {
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack spacing={isMdOrSmaller ? 5 : 10} sx={{ pt: 0, pl: { xs: 0, lg: 7 } }}>
      <Typography
        variant="h2"
        mt={-2}
        textAlign={{ xs: "center", md: "center", lg: "left" }}
        py={{ xs: 2, md: 0 }}
      >
        Vamos criar seu{" "}
        <Typography component="span" variant="inherit" color="primary">
          campeonato
        </Typography>
      </Typography>

      <Stack spacing={1.5} sx={{ gridColumn: { sm: "span 4" } }}>
        <Typography variant="subtitle1" fontWeight="regular">
          Qual é o{" "}
          <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
            nome{" "}
          </Typography>
          do seu campeonato?
        </Typography>
        <Field.Text
          name="championshipName"
          placeholder="Nome do Seu Campeonato"
          sx={{ maxWidth: { md: "none", lg: 450 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmojiEventsIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack spacing={1.5}>
        <Typography variant="subtitle1" fontWeight="regular">
          O campeonato é para participantes do{" "}
          <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
            gênero
          </Typography>
          :
        </Typography>

        <Field.SingleToggleButtonGroup
          name="gender"
          orientation={isMdOrSmaller ? "vertical" : "horizontal"}
          options={GENDER_OPTIONS}
        />
      </Stack>
      <Stack spacing={1.5}>
        <Typography variant="subtitle1" fontWeight="regular">
          A{" "}
          <Typography component="span" variant="inherit" color="dark" fontWeight="bold">
            modalidade{" "}
          </Typography>
          do campeonato é:{" "}
        </Typography>

        <Field.SingleToggleButtonGroup
          name="championshipModality"
          orientation={isMdOrSmaller ? "vertical" : "horizontal"}
          options={CHAMPIONSHIP_MODALITY_OPTIONS}
        />
      </Stack>
    </Stack>
  );
}
