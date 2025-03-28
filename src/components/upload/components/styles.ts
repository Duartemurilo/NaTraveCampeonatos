import { styled } from "@mui/material";

export const PreviewRoot = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  position: "absolute",
  padding: theme.spacing(1),
  "& > img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
  },
}));
