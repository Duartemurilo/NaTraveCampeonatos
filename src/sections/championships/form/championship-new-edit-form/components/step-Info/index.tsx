import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";

import { Field } from "src/components/hook-form";

export function StepInfo() {
  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Box>
        <Typography variant="h5"> Ficha do Campeonato</Typography>
        <Typography variant="subtitle1" fontWeight="light" sx={{ color: "text.secondary" }}>
          Diz aí: como vai ser esse campeonato?
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">Nome do campeonato*</Typography>
        <Field.Text name="championshipName" placeholder="Exemplo: Copa Pé de Rato" />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">Descrição do campeonato</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <ErrorIcon color="warning" fontSize="small" />
          <Typography variant="body2" color="warning.main">
            Explique aqui como será o campeonato. Essa informação será visível para os jogadores.
          </Typography>
        </Stack>

        <Field.Editor
          name="championshipDescription"
          placeholder="Inclua aqui as regras, formato do torneio, premiações..."
          sx={{ minHeight: 200 }}
        />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">Banner do campeonato</Typography>
        <Field.Upload
          name="championshipBanner"
          accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
          maxSize={3145728}
          helperText="Formatos suportados: JPG, PNG - Tamanho recomendado: 1200x600px"
        />
      </Stack>
    </Stack>
  );
}
