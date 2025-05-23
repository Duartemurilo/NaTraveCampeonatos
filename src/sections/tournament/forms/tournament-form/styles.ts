import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Card, Stepper, Typography } from "@mui/material";

export const SidebarContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  alignItems: "center",

  width: "100%",
  position: "relative",
  padding: theme.spacing(10, 2, 10, 2),
  height: "100%",
  background: "linear-gradient(180deg, #FFFFFF 0%, #F2F2F2 100%)",
  border: "1px solid #F0F0F0",
  boxShadow: "0px 4px 16px rgba(255, 255, 255, 0.102)",
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const SidebarTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const SidebarSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  width: "100%",
  margin: theme.spacing(3, 0, 6, 0),

  [theme.breakpoints.up("md")]: {
    maxWidth: 250,
  },
}));

export const VerticalStepper = styled(Stepper)(({ theme }) => ({
  gap: 40,
}));

// -----------------------------------------------------------------------z

export const ContentWrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  height: "100%",
  flexDirection: "column",
  position: "relative",
  background: "linear-gradient(180deg, #FFFFFF 0%, #F2F2F2 100%)",
  border: "1px solid #F0F0F0",
  boxShadow: "0px 4px 16px rgba(255, 255, 255, 0.102)",
  padding: theme.spacing(10, 2, 10, 2),
}));
