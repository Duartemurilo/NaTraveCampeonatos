import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Card, Stepper, Typography } from "@mui/material";

export const CardContainer = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<ContentWrapperProps>(({ theme, isLoading }) => ({
  display: "flex",

  flex: "1  auto",
  flexDirection: "column",
  height: "100%",
  position: "relative",
  background: "linear-gradient(180deg, #FFFFFF 0%, #F2F2F2 100%)",
  border: "1px solid #F0F0F0",
  boxShadow: "0px 4px 16px rgba(255, 255, 255, 0.102)",
  padding: theme.spacing(8, 3),

  ...(isLoading && {
    justifyContent: "center",
  }),
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
  gap: 30,
}));

// -----------------------------------------------------------------------z

type ContentWrapperProps = {
  isLoading?: boolean;
};

export const ContentWrapper = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<ContentWrapperProps>(({ theme, isLoading }) => ({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  minHeight: 0,
  position: "relative",
  background: "linear-gradient(180deg, #FFFFFF 0%, #F2F2F2 100%)",
  border: "1px solid #F0F0F0",
  boxShadow: "0px 4px 16px rgba(255, 255, 255, 0.102)",
  padding: theme.spacing(8, 3, 8, 3),

  ...(isLoading && {
    justifyContent: "center",
  }),
}));
