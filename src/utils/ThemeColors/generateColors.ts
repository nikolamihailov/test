import { Theme } from "@mui/material/styles";

function generateCssVariables(theme: Theme) {
  const root = document.documentElement;

  root.style.setProperty("--color-primary-main", theme.palette.primary.main);
  root.style.setProperty("--color-secondary-main", theme.palette.secondary.main);
}

export default generateCssVariables;
