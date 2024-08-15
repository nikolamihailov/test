import { useTheme } from "@mui/material";
import Section from "../components/UI/Section/Section";
import errorImg from "/sad.png";
import useTitle from "../hooks/useTitle";

function ErrorPage() {
  const theme = useTheme();

  useTitle("Error Page | Flow - SPA and Fitness");

  return (
    <Section
      bgColor="#ffe066"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.primary.main,
        height: "100%",
      }}
    >
      <h1 className="heading-primary">Error happened!</h1>
      <img src={errorImg} alt="sad face" style={{ width: "30rem" }} />
    </Section>
  );
}

export default ErrorPage;
