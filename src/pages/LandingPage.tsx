import HeroSection from "../components/Hero/HeroSection";
import AboutSection from "../components/About/About";
import ContactSection from "../components/Contact/Contact";
import useTitle from "../hooks/useTitle";

function LandingPage() {
  useTitle("Flow - SPA and Fitness");

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

export default LandingPage;
