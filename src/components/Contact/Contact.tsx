import { Box, Typography, useTheme } from "@mui/material";
import Section from "../UI/Section/Section";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

function ContactSection() {
  const theme = useTheme();

  return (
    <Section
      bgColor="#ffe066"
      id="contact"
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
        <span className="subheading">Contact</span>
        <h2 className="heading-secondary">Get in touch with us</h2>
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
        Whether you have a question about our services, pricing, or anything else, our team is ready
        to answer all your questions. We’re here to help you find the best wellness solutions
        tailored to your needs, so don’t hesitate to reach out.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "4.8rem",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            color: theme.palette.primary.main,
          }}
        >
          <PhoneIcon sx={{ fontSize: "3.2rem" }} />
          <Typography
            variant="h6"
            component="a"
            href="tel:+754-547-653"
            sx={{ color: theme.palette.primary.main, textDecoration: "none" }}
          >
            +754-547-653
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            color: theme.palette.primary.main,
          }}
        >
          <EmailIcon sx={{ fontSize: "3.2rem" }} />
          <Typography
            variant="h6"
            component="a"
            href="mailto:flow-support@bot.com"
            sx={{ color: theme.palette.primary.main, textDecoration: "none" }}
          >
            flow-support@bot.com
          </Typography>
        </Box>
      </Box>
    </Section>
  );
}

export default ContactSection;
