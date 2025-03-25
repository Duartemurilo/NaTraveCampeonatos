"use client";

import { Box, styled, Typography } from "@mui/material";

export const HaveAnAccountLink = styled(Typography)`
  color: ${({ theme: { palette } }) => palette.primary.main};
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export const ChangePasswordTitle = styled(Typography)`
  white-space: nowrap;
`;

export const ChangePasswordDescription = styled(Typography)`
  white-space: nowrap;
`;

export const PasswordRequirementsContainer = styled(Box)`
  display: flex;
  align-items: center;
`;
