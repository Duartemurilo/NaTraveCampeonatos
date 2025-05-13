// src/components/StyledTournamentTabs.tsx

import { Tabs, styled } from "@mui/material";

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));
