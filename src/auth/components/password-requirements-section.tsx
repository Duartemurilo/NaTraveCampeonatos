import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";

import { CONFIG } from "src/global-config";

import { PasswordRequirementsContainer } from "./styles";

type Props = {
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasMinCharacters: boolean;
};

function PasswordRequirementsSection({
  hasLowerCase,
  hasUpperCase,
  hasNumber,
  hasMinCharacters,
}: Props) {
  const getIcon = (condition: boolean) =>
    `${CONFIG.assetsDir}/assets/icons/frames/${condition ? "check" : "block"}.svg`;

  return (
    <Grid size={12}>
      <Box sx={{ my: 1 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          Sua senha deve conter:
        </Typography>
      </Box>

      <PasswordRequirementsContainer sx={{ my: 1 }}>
        <img src={getIcon(hasMinCharacters)} alt="" width={15} height={15} />
        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1.5 }}>
          Pelo menos 8 caracteres
        </Typography>
      </PasswordRequirementsContainer>

      <PasswordRequirementsContainer sx={{ my: 1 }}>
        <img src={getIcon(hasUpperCase)} alt="" width={15} height={15} />
        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1.5 }}>
          Letras maiúsculas
        </Typography>
      </PasswordRequirementsContainer>

      <PasswordRequirementsContainer sx={{ my: 1 }}>
        <img src={getIcon(hasLowerCase)} alt="" width={15} height={15} />
        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1.5 }}>
          Letras minúsculas
        </Typography>
      </PasswordRequirementsContainer>

      <PasswordRequirementsContainer sx={{ my: 1 }}>
        <img src={getIcon(hasNumber)} alt="" width={15} height={15} />
        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1.5 }}>
          Pelo menos um número
        </Typography>
      </PasswordRequirementsContainer>
    </Grid>
  );
}

export default PasswordRequirementsSection;
