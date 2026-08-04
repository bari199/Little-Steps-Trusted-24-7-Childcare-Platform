import { useState } from "react";

import { ThemeContext } from "../components/home/ThemeContext";
import { light, dark } from "../components/home/theme";

import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ServicesSection from "../components/home/ServicesSection";
import HowItWorks from "../components/home/HowItWorks";
import FeaturedCenters from "../components/home/FeaturedCenters";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CTASection from "../components/home/CTASection";
import Footer from "../components/home/Footer";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const colors = isDark ? dark : light;

  const toggle = () => setIsDark((d) => !d);

  return (
    <ThemeContext.Provider
      value={{
        colors,
        dark: isDark,
        toggle,
      }}
    >
      <div
        className="min-h-screen"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: "background-color 0.3s ease",
        }}
      >
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}
        </style>

        <Navbar />

        <HeroSection />

        <AboutSection />

        <WhyChooseUs />

        <ServicesSection />

        <HowItWorks />

        <FeaturedCenters />

        <Testimonials />

        <FAQ />

        <CTASection />

        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
