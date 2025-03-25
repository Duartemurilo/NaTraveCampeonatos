import Grid from "@mui/material/Grid2";
import { Box, Badge, Typography } from "@mui/material";

import { PasswordRequirementsContainer } from "./styles";

type Props = {
  hasSpecialCharacter: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasMinCharacters: boolean;
};

function PasswordRequirementsSection({
  hasSpecialCharacter,
  hasLowerCase,
  hasUpperCase,
  hasNumber,
  hasMinCharacters,
}: Props) {
  return (
    <Grid size={12}>
      <Box sx={{ my: 1 }}>
        <Typography variant="h6">Requisitos de senha</Typography>
        <Typography variant="subtitle2" fontWeight="light">
          Siga estes requisitos para ter uma senha forte
        </Typography>
      </Box>

      <PasswordRequirementsContainer>
        <Badge color={hasSpecialCharacter ? "success" : "warning"} variant="dot" />
        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1.5 }}>
          Deve conter pelo menos 1 caractere especial (@, $, !, %, *, ?, &)
        </Typography>
      </PasswordRequirementsContainer>

      <PasswordRequirementsContainer>
        <Badge color={hasLowerCase ? "success" : "warning"} variant="dot" />
        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1.5 }}>
          Deve conter pelo menos 1 caractere minúsculo
        </Typography>
      </PasswordRequirementsContainer>

      <PasswordRequirementsContainer>
        <Badge color={hasUpperCase ? "success" : "warning"} variant="dot" />
        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1.5 }}>
          Deve conter pelo menos 1 caractere maiúsculo
        </Typography>
      </PasswordRequirementsContainer>

      <PasswordRequirementsContainer>
        <Badge color={hasNumber ? "success" : "warning"} variant="dot" />
        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1.5 }}>
          Deve conter pelo menos 1 caractere numérico
        </Typography>
      </PasswordRequirementsContainer>

      <PasswordRequirementsContainer>
        <Badge color={hasMinCharacters ? "success" : "warning"} variant="dot" />
        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1.5 }}>
          Deve conter no mínimo 8 caracteres
        </Typography>
      </PasswordRequirementsContainer>
    </Grid>
  );
}

export default PasswordRequirementsSection;
