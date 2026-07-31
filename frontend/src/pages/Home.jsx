import Navbar from "../components/common/Navbar";
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

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseUs />
        <ServicesSection />
        <HowItWorks />
        <FeaturedCenters />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
