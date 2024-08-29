import { Box, Typography, useTheme } from "@mui/material";
import Section from "../../UI/Section/Section";
import Button from "../../UI/Button/Button";
import { welcomeSection } from "../../../utils/StylesHelper/Section";
import { callToActionBtns } from "../../../utils/StylesHelper/WelcomeBack";

function WelcomeBack() {
  const theme = useTheme();

  return (
    <Section bgColor={theme.palette.secondary.dark} id="welcome-back" style={welcomeSection(theme)}>
      <Typography variant="h4" sx={{ fontSize: "4rem" }}>
        Welcome back, Koleto!
      </Typography>
      <Typography
        variant="body1"
        color={theme.palette.primary.light}
        sx={{ fontSize: "2rem", fontWeight: "500" }}
      >
        Ready for your next wellness journey? Let’s get started.
      </Typography>
      <Box sx={callToActionBtns}>
        <Button
          bgColor={theme.palette.primary.main}
          color={theme.palette.secondary.main}
          el="link"
          hoverBgColor={theme.palette.secondary.main}
          hoverColor="#000"
          href="/services"
        >
          Explore Services
        </Button>
        <Button
          bgColor={theme.palette.primary.light}
          color={theme.palette.secondary.main}
          el="link"
          hoverBgColor={theme.palette.secondary.main}
          hoverColor="#000"
          href="/appointments"
        >
          Make Appointment
        </Button>
      </Box>
    </Section>
  );
}

export default WelcomeBack;
