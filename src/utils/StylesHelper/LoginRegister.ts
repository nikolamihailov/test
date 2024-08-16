import { Theme } from "@mui/material";

export const sectionStyles = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4.8rem 0.8rem",
};

export const boxSX = (theme: Theme, isRegister: boolean) => ({
  width: {
    xs: "100%",
    sm: isRegister ? "80vw" : "40rem",
    md: isRegister ? "80rem" : "unset",
  },
  margin: "auto",
  padding: 4,
  marginTop: "4.8rem",
  border: "1px solid #ccc",
  borderRadius: "1rem",
  boxShadow: "0 0 16px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
  bgcolor: theme.palette.secondary.main,
});
