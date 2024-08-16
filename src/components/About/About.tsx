import { Box, Typography, useTheme } from "@mui/material";
import Section from "../UI/Section/Section";
import wellnessImage from "/wellness.jpg";
import spaImage from "/spa.jpg";
import fitnessImage from "/fitness.jpg";

function AboutSection() {
  const theme = useTheme();

  return (
    <Section
      bgColor="#ffe6bd"
      id="about"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "9.6rem 3.2rem",
        textAlign: "center",
        color: theme.palette.primary.main,
      }}
    >
      <div>
        <span className="subheading">About</span>
        <h2 className="heading-secondary">Flow offers variety of services</h2>
      </div>
      <Typography
        variant="body1"
        sx={{
          marginBottom: "2rem",
          lineHeight: 1.8,
          fontSize: "2rem",
          width: { xs: "100%", md: "70%" },
        }}
      >
        Welcome to FLOW, your ultimate destination for holistic wellness, fitness, and rejuvenation.
        We believe in harmonizing the mind, body, and spirit through personalized experiences that
        elevate your well-being.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.8,
          marginBottom: "4.8rem",
          fontSize: "2rem",
          width: { xs: "100%", md: "70%" },
        }}
      >
        Our mission is to empower individuals to lead healthier, happier lives. We offer a balanced
        approach to wellness, combining modern fitness techniques with luxurious spa treatments and
        wellness services tailored to your unique needs.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "3.2rem",
          justifyContent: "center",
          alignItems: "center",
          "& div": {
            width: "100%",
            maxWidth: "25rem",
            height: "25rem",
            overflow: "hidden",
            borderRadius: "8px",
          },
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          },
          "& div:hover img": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Box>
          <img src={spaImage} alt="SPA" />
        </Box>
        <Box>
          <img src={wellnessImage} alt="Wellness" />
        </Box>
        <Box>
          <img src={fitnessImage} alt="Fitness" />
        </Box>
      </Box>
    </Section>
  );
}

export default AboutSection;
